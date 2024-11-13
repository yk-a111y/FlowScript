import { create } from 'zustand';
import { nanoid } from 'nanoid';
import defu from 'defu';
import firstWorkflows from '@/utils/firstWorkflows';
import { tasks } from '@/utils/shared';
import { IWorkflow } from '@/dashboard/type';

interface WorkflowStoreState {
  workflows: Record<string, unknown>; // Adjust the type as needed
  loadData: () => void;
  getWorkflows: () => IWorkflow[];
  getWorkflowById: (id: string) => IWorkflow;
  setWorkflows: (newWorkflows: IWorkflow[]) => void;
}

let isFirstTime: boolean = true;

export const useWorkflowStore = create<WorkflowStoreState>((set, get) => ({
  workflows: {},
  loadData: () => {
    // const { workflows, isFirstTime } = await browser.storage.local.get([
    //   'workflows',
    //   'isFirstTime',
    // ]);

    let localWorkflows: IWorkflow[] = [];
    if (isFirstTime) {
      localWorkflows = firstWorkflows.map((workflow) => {
        return defaultWorkflows(workflow);
      });
      isFirstTime = false;

      set({
        workflows: convertWorkflowsToObject(localWorkflows),
      });
    }
  },
  // getter
  getWorkflows: () => Object.values(get().workflows) as IWorkflow[],
  getWorkflowById: (id: string) => get().workflows[id] as IWorkflow,
  // setter
  setWorkflows: (newWorkflows: IWorkflow[]) =>
    set({ workflows: convertWorkflowsToObject(newWorkflows) }), // Setter for workflows
}));

const convertWorkflowsToObject = (workflows: IWorkflow[]) => {
  if (Array.isArray(workflows)) {
    return workflows.reduce((acc, workflow) => {
      if (workflow.id !== undefined) {
        acc[workflow.id] = workflow;
      }
      return acc;
    }, {} as Record<string, IWorkflow>);
  }

  return workflows;
};

// Default Workflow Format
interface DefaultWorkflowOptions {
  duplicateId?: string;
}
const defaultWorkflows = (
  data: IWorkflow,
  options: DefaultWorkflowOptions = {}
) => {
  let workflowData: IWorkflow = {
    id: nanoid(),
    name: '',
    icon: 'riGlobalLine',
    folderId: null,
    content: null,
    connectedTable: null,
    drawflow: {
      edges: [],
      zoom: 1.3,
      nodes: [
        {
          position: {
            x: 100,
            y: window.innerHeight / 2,
          },
          id: nanoid(),
          label: 'trigger',
          data: tasks.trigger.data,
          type: tasks.trigger.component,
        },
      ],
    },
    table: [],
    dataColumns: [],
    description: '',
    trigger: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isDisabled: false,
    settings: {
      publicId: '',
      blockDelay: 0,
      saveLog: true,
      debugMode: false,
      restartTimes: 3,
      notification: true,
      execContext: 'popup',
      reuseLastState: false,
      inputAutocomplete: true,
      onError: 'stop-workflow',
      executedBlockOnWeb: false,
      insertDefaultColumn: false,
      defaultColumnName: 'column',
    },
    // TODO version: browser.runtime.getManifest().version,
    version: '1.28.17',
    globalData: '{\n\t"key": "value"\n}',
  };

  if (data) {
    if (options.duplicateId && data.id) {
      delete workflowData.id;
    }

    if (data.drawflow?.nodes?.length > 0) {
      workflowData.drawflow.nodes = [];
    }

    workflowData = defu(data, workflowData);
  }

  return workflowData;
};
