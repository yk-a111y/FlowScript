import defu from 'defu';
import { create } from 'zustand';
import { getBlocks } from '@/utils/getSharedData';
import { Node } from '@xyflow/react';

const blocks = getBlocks();

// *editingBlockStore
interface EditingBlockStoreState {
  editingBlock: any;
  setEditingBlock: (node: Node) => void;
}
export const useEditingBlockStore = create<EditingBlockStoreState>(
  (set, get) => ({
    editingBlock: {},
    setEditingBlock: (node: Node) => {
      const block = blocks[node.data.label as keyof typeof blocks];
      const blockData = defu(node, block);
      set({ editingBlock: { ...blockData } });
    },
  })
);
