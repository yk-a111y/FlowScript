import { nanoid } from 'nanoid';
import browser from 'webextension-polyfill';
import { IWorkflow } from '@/dashboard/type';
import { getBlocks } from '@/utils/getSharedData';

class WorkflowEngine {
  public workflow: IWorkflow;
  private id: string;
  private triggerBlockId: string;
  private blocks;
  private connectionsMap;
  private isMV2: boolean;

  constructor(workflow: IWorkflow, { options }) {
    this.id = nanoid();
    this.isMV2 = browser.runtime.getManifest().manifest_version === 2;

    this.workflow = workflow;

    this.triggerBlockId = null;

    this.blocks = {};
    this.connectionsMap = {};
  }

  async init() {
    try {
      if (this.workflow.isDisabled) return;
      // if (!this.states) {
      //   console.error(`"${this.workflow.name}" workflow doesn't have states`);
      //   this.destroy('error');
      //   return;
      // }

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

      let columns = Array.isArray(workflowTable)
        ? workflowTable
        : Object.values(workflowTable);

      columns.forEach(({ name, type, id }) => {
        const columnId = id || name;

        this.rowData[name] = null;

        this.columnsId[name] = columnId;
        if (!this.columns[columnId])
          this.columns[columnId] = { index: 0, name, type };
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default WorkflowEngine;
