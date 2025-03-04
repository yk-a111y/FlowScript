import { PropsWithChildren, useCallback, useState } from 'react';
import { Edge, Node, useReactFlow } from '@xyflow/react';
import { useEditingBlockStore } from '@/store/editingBlock';
import { useIsEditingStore } from '@/store/workflow';
import UiIcon from '../ui/UiIcon';
import UiCard from '../ui/UiCard';

interface BlockBaseProps extends PropsWithChildren {
  id?: string;
  blockData?: Node;
}

const BlockBase = ({ id, blockData, children }: BlockBaseProps) => {
  const { setEditingBlock } = useEditingBlockStore();
  const { setIsEditing } = useIsEditingStore();
  const { setNodes, setEdges } = useReactFlow();
  const [isCopied, setIsCopied] = useState(false);

  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.stopPropagation();
  };

  const insertToClipboard = () => {
    navigator.clipboard.writeText(blockData?.id || '');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 600);
  };

  const onDeleteBlock = useCallback(() => {
    setNodes((nodes: Node[]) => nodes.filter((node) => node.id !== id));
    setEdges((edges: Edge[]) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  }, [id, setNodes, setEdges]);

  const onEditBlock = () => {
    // label -> blockData
    // console.log('edit block', id, blockData);
    if (blockData) {
      setEditingBlock(blockData);
      setIsEditing(true);
    }
  };

  const onRunWorkflow = () => {
    console.log('run workflow', id, blockData);
  };

  return (
    <div className="block-base relative w-48" onDoubleClick={onDoubleClick}>
      <div
        className="block-menu-container absolute top-0 w-full hidden"
        style={{ transform: 'translateY(-100%)' }}
      >
        {/* insertToClipboard for Block id  */}
        <div className="pointer-events-none bg-input mb-1 w-1/2 rounded-md">
          <p
            title="Block id (click to copy)"
            className="block-menu px-1 pointer-events-auto text-overflow inline-block dark:text-gray-300"
            style={{ maxWidth: '96px', marginBottom: 0 }}
            onClick={insertToClipboard}
          >
            {isCopied ? '✅ Copied' : blockData?.id}
          </p>
        </div>
        {/* Block Menu */}
        <div className="block-menu inline-flex items-center bg-input rounded-md dark:text-gray-300">
          <button title="Delete block" onClick={onDeleteBlock}>
            <UiIcon name="RiDeleteBinLine" size={18} />
          </button>
          <button title="Edit block" onClick={onEditBlock}>
            <UiIcon name="RiPencilLine" size={18} />
          </button>
          <button title="Block settings">
            <UiIcon name="RiSettings3Line" size={18} />
          </button>
          <button title="Run workflow from here" onClick={onRunWorkflow}>
            <UiIcon name="RiPlayLine" size={18} />
          </button>
        </div>
      </div>
      <UiCard className="block-base__content relative z-10">{children}</UiCard>
    </div>
  );
};

export default BlockBase;
