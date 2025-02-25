import { useState } from 'react';
import TransitionExpand from '@/components/ui/TransitionExpand';
import UiExpand from '@/components/ui/UiExpand';
import UiIcon from '@/components/ui/UiIcon';

const WorkflowBlockList = (props) => {
  console.log('🚀 ~ WorkflowBlockList ~ props:', props);
  const { category, blockList } = props;
  const [showBlock, setShowBlock] = useState(true);

  const blockListHeader = () => {
    return (
      <>
        <span className={`h-3 w-3 rounded-full ${category.color}`}></span>
        <p className="ml-2 flex-1 capitalize">{category.name}</p>
        <UiIcon name={showBlock ? 'RiSubtractLine' : 'RiAddLine'} size={20} />
      </>
    );
  };

  return (
    <>
      <UiExpand
        headerClass="flex items-center py-2 focus:ring-0 w-full text-left text-gray-600 dark:text-gray-200"
        header={blockListHeader()}
        handleToggle={() => setShowBlock(!showBlock)}
        show={showBlock}
      >
        <div className="mb-4 grid grid-cols-2 gap-2">
          <TransitionExpand show={showBlock}>
            {blockList.map((block, index) => {
              return (
                <div
                  key={index}
                  title={block.name}
                  draggable
                  className="bg-input group relative cursor-move select-none rounded-lg p-4 transition"
                  onDragStart={(event) =>
                    event.dataTransfer.setData('block', JSON.stringify(block))
                  }
                >
                  <div className="invisible absolute right-2 top-2 flex items-center text-gray-600 group-hover:visible dark:text-gray-300">
                    tips
                  </div>
                  <UiIcon name={block.icon} className="mb-2"></UiIcon>
                  <p className="text-overflow capitalize leading-tight">
                    {block.name}
                  </p>
                </div>
              );
            })}
          </TransitionExpand>
        </div>
      </UiExpand>
    </>
  );
};

export default WorkflowBlockList;
