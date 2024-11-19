import { Handle, Position } from '@xyflow/react';
import BlockBase from './BlockBase';
import useEditorBlock from '@/hooks/useEditorBlock';
import UiIcon from '../ui/UiIcon';
import { IBlockPropsData } from './types';

interface BlockBasicProps {
  id: string;
  type?: string;
  data: IBlockPropsData;
}

const BlockBasic = (props: BlockBasicProps) => {
  // console.log('🚀 ~ BlockBasic ~ props:', props);
  const { id, data } = props;
  const block = useEditorBlock(data.label);
  // console.log('🚀 ~ BlockBasic ~ block:', block);
  return (
    <BlockBase>
      {data.label !== 'trigger' && (
        <Handle id={`${id}-input-1`} type="target" position={Position.Left} />
      )}
      <div className="flex items-center">
        <span
          className={`mr-2 inline-block rounded-lg p-2 dark:text-black ${
            data.disableBlock ? 'bg-box-transparent' : block.category?.color
          }`}
        >
          <UiIcon name={block.detail?.icon as string} />
        </span>
        <div className="flex-1 overflow-hidden">
          <p className="text-overflow whitespace-nowrap font-semibold leading-tight">
            {block.detail?.name as string}
          </p>
          <p className="text-overflow leading-tight text-gray-600 dark:text-gray-200">
            {data?.description}
          </p>
        </div>
      </div>
      <Handle id={`${id}-output-1`} type="source" position={Position.Right} />
    </BlockBase>
  );
};

export default BlockBasic;
