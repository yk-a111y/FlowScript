import { create } from 'zustand';

export const useEditingBlockStore = create<EditingBlockStoreState>(
  (set, get) => ({
    editingBlock: {},
  })
);
