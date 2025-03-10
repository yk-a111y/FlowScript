import browser from 'webextension-polyfill';
import { IWorkflow } from '@/types/workflow';
import { WorkflowStoreState } from '@/store/workflow';
import {
  parseJSON,
  fileSaver,
  openFilePicker,
  findTriggerBlock,
} from './helper';
import { registerWorkflowTrigger } from './workflowTrigger';

export const importWorkflow = (store: WorkflowStoreState, attrs = {}) => {
  return new Promise((resolve, reject) => {
    openFilePicker(['application/json'], attrs)
      .then((files) => {
        files.forEach((file) => {
          const reader = new FileReader();

          const handleOnLoadReader = ({ target }) => {
            const workflow = JSON.parse(target.result);
            console.log('🚀 ~ handleOnLoadReader ~ workflow:', workflow);

            workflow.table = workflow.table || workflow.dataColumns;
            delete workflow.dataColumns;

            if (typeof workflow.drawflow === 'string') {
              workflow.drawflow = parseJSON(workflow.drawflow, {});
            }

            store
              .insert({
                ...workflow,
                createdAt: Date.now(),
              })
              .then((res) => {
                Object.values(res).forEach((item) => {
                  const triggerBlock = findTriggerBlock(item.drawflow);
                  registerWorkflowTrigger(item.id, triggerBlock);
                });
                resolve(res);
              });
          };

          reader.onload = handleOnLoadReader;
          reader.readAsText(file);
        });
      })
      .catch(reject);
  });
};

const defaultValue = {
  name: '',
  icon: '',
  table: [],
  settings: {},
  globalData: '',
  dataColumns: [],
  description: '',
  drawflow: { nodes: [], edges: [] },
  version: browser.runtime.getManifest().version,
};

const convertWorkflow = (workflow: IWorkflow, additionalKeys = []) => {
  if (!workflow) return null;

  const keys = [
    'name',
    'icon',
    'table',
    'version',
    'drawflow',
    'settings',
    'globalData',
    'description',
    ...additionalKeys,
  ];

  const content = {
    extVersion: browser.runtime.getManifest().version,
  };

  keys.forEach((key) => {
    content[key] = workflow[key] ?? defaultValue[key];
  });

  return content;
};

const findIncludedWorkflows = (
  { drawflow }: IWorkflow,
  store: WorkflowStoreState,
  maxDepth = 3,
  workflows = {}
) => {
  if (maxDepth === 0) return workflows;

  const flow = parseJSON(drawflow, drawflow);
  const blocks = flow?.drawflow?.Home.data ?? flow.nodes ?? null;
  console.log('🚀 ~ blocks:', blocks);
  if (!blocks) return workflows;

  const checkWorkflow = (type: string, workflowId: string) => {
    if (type !== 'execute-workflow' || workflows[workflowId]) return;

    const workflow = store.getWorkflowById(workflowId);
    if (workflow) {
      workflows[workflowId] = convertWorkflow(workflow);
      findIncludedWorkflows(workflow, store, maxDepth - 1, workflows);
    }
  };

  if (flow.nodes) {
    flow.nodes.forEach((node) => {
      checkWorkflow(node.label, node.data.workflowId);
    });
  } else {
    Object.values(blocks).forEach((block) => {
      checkWorkflow(block?.label as string, block?.data?.workflowId as string);
    });
  }

  return workflows;
};

export const exportWorkflow = (
  workflow: IWorkflow,
  workflowStore: WorkflowStoreState
) => {
  if (workflow.isProtected) return;

  const includedWorkflows = findIncludedWorkflows(workflow, workflowStore);
  const content = convertWorkflow(workflow);

  content.includedWorkflows = includedWorkflows;

  const blob = new Blob([JSON.stringify(content)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);

  fileSaver(`${workflow.name}.automation.json`, url, true);
};
