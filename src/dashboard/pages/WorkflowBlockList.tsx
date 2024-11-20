import { getBlocks } from '@/utils/getSharedData';

const WorkflowBlockList = () => {
  const blocksDetail = getBlocks();
  const blocksArr = Object.entries(blocksDetail).map(([key, block]) => {
    // const localeKey = `workflow.blocks.${key}.name`;
    return {
      ...block,
      id: key,
      name: block.name,
    };
  });
  // console.log('🚀 ~ blocksArr ~ blocksArr:', blocksArr);
  return (
    <div className="edit-block mb-4 grid grid-cols-2 gap-2">
      {blocksArr.map((block) => {
        return (
          <div
            key={block.id}
            draggable
            className="bg-input group relative cursor-move select-none rounded-lg p-4 transition"
            onDragStart={(event) =>
              event.dataTransfer.setData('block', JSON.stringify(block))
            }
          >
            <p className="text-overflow capitalize leading-tight">
              {block.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default WorkflowBlockList;
