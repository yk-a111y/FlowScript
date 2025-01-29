import { nanoid } from 'nanoid';
import browser from 'webextension-polyfill';
import { IWorkflow } from '@/dashboard/type';
import { getBlocks } from '@/utils/getSharedData';
import { parseJSON, isObject } from '@/utils/helper';

class WorkflowEngine {
  private id: string;
  private states;
  private options;
  private isMV2: boolean;

  private workflow: IWorkflow;
  private blocks;
  private blocksHandler;

  private triggerBlockId: string;
  private connectionsMap;
  private rowData;
  private columns;
  private columnsId;

  private referenceData;

  private logsLimit: number;
  private startedTimestamp: number;

  constructor(workflow: IWorkflow, { options, states, blocksHandler }) {
    this.id = nanoid();
    this.states = states;
    this.isMV2 = browser.runtime.getManifest().manifest_version === 2;

    this.workflow = workflow;
    this.blocks = {};
    this.blocksHandler = blocksHandler;

    this.triggerBlockId = null;
    this.connectionsMap = {};
    this.rowData = {};
    this.columns = {};
    this.columnsId = {};

    let { globalData } = workflow;
    let variables = {};
    if (options && options?.data) {
      globalData = options.data.globalData || globalData;
      variables = isObject(options.data.variables)
        ? options?.data.variables
        : {};

      options.data = { globalData, variables };
    }

    this.options = options;
    this.referenceData = {
      variables,
      table: [],
      secrets: {},
      loopData: {},
      workflow: {},
      googleSheets: {},
      globalData: parseJSON(globalData, globalData),
    };

    this.logsLimit = 1001;
  }

  async init() {
    try {
      console.log('🚀 ~ WorkflowEngine ~ init ~ this.workflow:', this.workflow);
      if (this.workflow.isDisabled) return;
      if (!this.states) {
        console.error(`"${this.workflow.name}" workflow doesn't have states`);
        // this.destroy('error');
        return;
      }

      // check if workflow has blocks
      const { nodes, edges } = this.workflow.drawflow;
      if (!nodes || nodes.length === 0) {
        console.error(`${this.workflow.name} doesn't have blocks`);
        return;
      }

      // check trigger block
      const triggerBlock = nodes.find((node) => {
        // if (this.options?.blockId) return node.id === this.options.blockId;
        return node.label === 'trigger';
      });
      if (!triggerBlock) {
        console.error(`${this.workflow.name} doesn't have a trigger block`);
        return;
      }

      // build blocks & connections map
      const blocks = getBlocks();
      this.triggerBlockId = triggerBlock.id;

      this.blocks = nodes.reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
      }, {});

      this.connectionsMap = edges.reduce(
        (acc, { sourceHandle, target, targetHandle }) => {
          if (!acc[sourceHandle]) acc[sourceHandle] = new Map();
          acc[sourceHandle].set(target, {
            id: target,
            targetHandle,
            sourceHandle,
          });

          return acc;
        },
        {}
      );
      console.log(
        '🚀 ~ WorkflowEngine ~ init ~ this.connectionsMap:',
        this.connectionsMap
      );

      const workflowTable =
        this.workflow.table || this.workflow.dataColumns || [];

      const columns = Array.isArray(workflowTable)
        ? workflowTable
        : Object.values(workflowTable);

      columns.forEach(({ name, type, id }) => {
        const columnId = id || name;

        this.rowData[name] = null;

        this.columnsId[name] = columnId;
        if (!this.columns[columnId])
          this.columns[columnId] = { index: 0, name, type };
      });

      // if (BROWSER_TYPE !== 'chrome') {
      //   this.workflow.settings.debugMode = false;
      // } else if (this.workflow.settings.debugMode) {
      //   chrome.debugger.onEvent.addListener(this.onDebugEvent);
      // }

      if (
        this.workflow.settings.reuseLastState &&
        !this.workflow.connectedTable
      ) {
        const lastStateKey = `state:${this.workflow.id}`;
        const value = await browser.storage.local.get(lastStateKey);
        const lastState = value[lastStateKey];

        if (lastState) {
          Object.assign(this.columns, lastState.columns);
          Object.assign(this.referenceData, lastState.referenceData);
        }
      }

      const { settings: userSettings } = await browser.storage.local.get(
        'settings'
      );
      this.logsLimit = userSettings?.logsLimit || 1001;

      this.workflow.table = columns;
      this.startedTimestamp = Date.now();

      // this.states.on('stop', this.onWorkflowStopped);
      // this.states.on('resume', this.onResumeExecution);
    } catch (error) {
      console.log(error);
    }
  }
}

export default WorkflowEngine;
