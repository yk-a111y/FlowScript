import { create } from 'zustand';
import firstWorkflows from '@/utils/firstWorkflows';

interface WorkflowStoreState {
  workflows: Record<string, unknown>; // Adjust the type as needed
  loadData: () => void;
  getWorkflows: () => Record<string, unknown>[];
}

export const useWorkflowStore = create<WorkflowStoreState>((set, get) => ({
  workflows: {},
  loadData: () => {
    // const { workflows, isFirstTime } = await browser.storage.local.get([
    //   'workflows',
    //   'isFirstTime',
    // ]);
    set({
      workflows: {
        ...firstWorkflows,
      },
    });
  },
  // getter
  getWorkflows: () =>
    Object.values(get().workflows) as Record<string, unknown>[],
  // setter
  setWorkflows: (newWorkflows: Record<string, unknown>) =>
    set({ workflows: newWorkflows }), // Setter for workflows
}));
