import UiIcon from '@/components/ui/UiIcon';
import { lazy, Suspense } from 'react';

interface WorkflowEditBlockProps {
  editingBlock: any;
  close: () => void;
}

const WorkflowEditBlock = ({ editingBlock, close }: WorkflowEditBlockProps) => {
  console.log('🚀 ~ WorkflowEditBlock ~ editingBlock:', editingBlock);

  // import edit components dynamically
  const editComponents = import.meta.glob('./edit/*.tsx');
  const components = Object.keys(editComponents).reduce((acc, key) => {
    const name = key.replace('./edit/', '').replace('.tsx', '');
    acc[name] = editComponents[key];
    return acc;
  }, {});

  const getEditComp = () => {
    const editComp = editingBlock.editComponent;
    if (typeof editComp === 'object') {
      return editComp;
    }
    const Component = lazy(components[editComp]);

    return (
      <Suspense fallback={<div>加载中...</div>}>
        <Component compData={editingBlock} />
      </Suspense>
    );
  };

  return (
    <div
      id="workflow-edit-block"
      className="scroll h-full overflow-auto px-4 pb-1"
    >
      <div className="sticky top-0 z-20 mb-2 flex items-center space-x-2 bg-white pb-4 dark:bg-gray-800">
        <button onClick={close}>
          <UiIcon name="RiArrowLeftLine" />
        </button>
        <p>{editingBlock.name}</p>
        <div className="grow"></div>
      </div>
      {getEditComp()}
    </div>
  );
};

export default WorkflowEditBlock;
