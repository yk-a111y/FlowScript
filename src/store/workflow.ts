import { create } from 'zustand';
import firstWorkflows from '@/utils/firstWorkflows';

interface WorkflowStoreState {
  workflows: Record<string, unknown>; // Adjust the type as needed
  loadData: () => void;
}

export const useWorkflowStore = create<WorkflowStoreState>((set) => ({
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
}));
