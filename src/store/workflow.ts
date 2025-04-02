import { create } from 'zustand';
import { nanoid } from 'nanoid';
import defu from 'defu';
import deepmerge from 'lodash.merge';
import browser from 'webextension-polyfill';
import firstWorkflows from '@/utils/firstWorkflows';
import { tasks } from '@/utils/shared';
import { IWorkflow } from '@/dashboard/type';

// TODO: optimize local storage

// *workflowStore
export interface WorkflowStoreState {
  workflows: Record<string, unknown>; // Adjust the type as needed
  getWorkflows: () => IWorkflow[];
  getWorkflowById: (id: string) => IWorkflow;
  setWorkflows: (newWorkflows: IWorkflow[]) => void;
  loadData: () => void;
  updateWorkflow: (
    id: string,
    data: IWorkflow,
    deep: boolean
  ) => Promise<IWorkflow>;
  insert: (
    data: IWorkflow | IWorkflow[],
    options?: DefaultWorkflowOptions
  ) => Promise<Record<string, IWorkflow>>;
}
export const useWorkflowStore = create<WorkflowStoreState>((set, get) => ({
  workflows: {},
  isFirstTime: false,
  retrieved: false,
  // getter
  getWorkflows: (): IWorkflow[] => {
    const workflows = get().workflows || {};
    return Object.values(workflows);
  },
  getWorkflowById: (id: string): IWorkflow => {
    const workflows = get().workflows || {};
    const workflow = workflows[id];

    return workflow;
  },
  // setter
  setWorkflows: (newWorkflows: IWorkflow[]) =>
    set({ workflows: convertWorkflowsToObject(newWorkflows) }),
  // actions
  loadData: async () => {
    const { workflows, isFirstFromStorage } = await browser.storage.local.get([
      'workflows',
      'isFirstFromStorage',
    ]);
    console.log('🚀 ~ loadData: ~ workflows:', workflows, isFirstFromStorage);

    let localWorkflows = workflows || {};

    // get default workflow at first time
    if (isFirstFromStorage === undefined || isFirstFromStorage) {
      localWorkflows = firstWorkflows.map((workflow) => {
        return defaultWorkflows(workflow as IWorkflow);
      });
      await browser.storage.local.set({
        isFirstFromStorage: false,
        workflows: localWorkflows,
      });
    }

    set({
      workflows: convertWorkflowsToObject(localWorkflows),
      isFirstTime: isFirstFromStorage,
      retrieved: true,
    });
  },
  updateWorkflow: async (
    id: string,
    data: IWorkflow,
    deep: boolean = false
  ) => {
    const currentWorkflow = get().getWorkflowById(id);
    if (!currentWorkflow) return null;

    const updatedWorkflows = {};
    const updateData = { ...data, updatedAt: Date.now() };

    const workflowUpdater = (id: string) => {
      if (deep) {
        get().workflows[id] = deepmerge(currentWorkflow, updateData);
      } else {
        Object.assign(currentWorkflow, updateData);
      }

      currentWorkflow.updatedAt = Date.now();
      updatedWorkflows[id] = currentWorkflow;

      if (!('isDisabled' in data)) return;
      // if (data.isDisabled) {
      //   cleanWorkflowTriggers(workflowId);
      // } else {
      //   const triggerBlock = this.workflows[workflowId].drawflow.nodes?.find(
      //     (node) => node.label === 'trigger'
      //   );
      //   if (triggerBlock) {
      //     registerWorkflowTrigger(id, triggerBlock);
      //   }
      // }
    };

    workflowUpdater(id);
    await browser.storage.local.set({ workflows: updatedWorkflows });

    return updatedWorkflows;
  },
  insert: async (
    data: IWorkflow | IWorkflow[],
    options: DefaultWorkflowOptions = {}
  ) => {
    const insertedWorkflows = {};
    const currentWorkflows = get().getWorkflows();

    if (Array.isArray(data)) {
      data.forEach((item: IWorkflow) => {
        if (!options.duplicateId) {
          delete item.id;
        }

        const workflow = defaultWorkflows(item, options);
        currentWorkflows[workflow.id] = workflow;
        insertedWorkflows[workflow.id] = workflow;
      });
    } else {
      if (!options.duplicateId) {
        delete data.id;
      }

      const workflow = defaultWorkflows(data, options);
      currentWorkflows[workflow.id] = workflow;
      insertedWorkflows[workflow.id] = workflow;
    }

    const w = Object.values(currentWorkflows).reduce((acc, workflow) => {
      console.log('🚀 ~ workflows:Object.values ~ workflow:', workflow);
      return {
        ...acc,
        [workflow.id]: workflow,
      };
    }, {});

    await browser.storage.local.set({
      workflows: w,
    });

    return insertedWorkflows;
  },
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
  duplicateId?: boolean;
}
const defaultWorkflows: (
  data: IWorkflow,
  options?: DefaultWorkflowOptions
) => IWorkflow = (data, options = {}) => {
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
    version: browser.runtime.getManifest().version,
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

// *isEditingStore
interface IsEditingStoreState {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  getIsEditing: () => boolean;
}
export const useIsEditingStore = create<IsEditingStoreState>((set, get) => ({
  isEditing: false,
  setIsEditing: (isEditing: boolean) => set({ isEditing }),
  getIsEditing: () => get().isEditing,
}));
