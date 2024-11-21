import { categories } from '@/utils/shared';
import { getBlocks } from '@/utils/getSharedData';
import WorkflowBlockList from './WorkflowBlockList';
import { useMemo } from 'react';

const WorkflowDetailsCard = () => {
  const copyBlocks = getBlocks();
  delete copyBlocks['block-package'];
  console.log('🚀 ~ WorkflowDetailsCard ~ copyBlocks:', copyBlocks);
  const blocksArr = Object.entries(copyBlocks).map(([key, block]) => {
    // const localeKey = `workflow.blocks.${key}.name`;
    return {
      ...block,
      id: key,
      name: block.name,
    };
  });
  console.log('🚀 ~ blocksArr ~ blocksArr:', blocksArr);
  const blocks = useMemo(() => {
    return blocksArr.reduce((arr, block) => {
      (arr[block.category] = arr[block.category] || []).push(block);
      return arr;
    }, {});
  }, [blocksArr]);
  console.log('🚀 ~ blocks ~ blocks:', blocks);

  return (
    <>
      <div className="detail-card mb-2 mt-1 flex items-start px-4"></div>
      <div className="scroll relative overflow-auto bg-scroll px-4">
        {Object.entries(blocks).map(([category, blockList]) => {
          return (
            <WorkflowBlockList
              key={category}
              category={categories[category]}
              blockList={blockList}
            />
          );
        })}
      </div>
    </>
  );
};

export default WorkflowDetailsCard;
