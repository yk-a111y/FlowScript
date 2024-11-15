import { getBlocks } from '@/utils/getSharedData.js';
import { categories } from '@/utils/shared.js';
import { IBlockData } from '@/components/block/types';

const useEditorBlock = (label: string): IBlockData => {
  const blocks = getBlocks();
  const detail = blocks[label as keyof typeof blocks];
  const category = categories[detail.category as keyof typeof categories];

  return {
    category,
    detail,
  };
};

export default useEditorBlock;
