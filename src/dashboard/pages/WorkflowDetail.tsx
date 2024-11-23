import defu from 'defu';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Node, ReactFlowInstance, ReactFlowProvider } from '@xyflow/react';
import { useWorkflowStore } from '@/store/workflow';
import { getBlocks } from '@/utils/getSharedData';
import WorkflowDetailsCard from '../components/WorkflowDetailsCard';
import WorkflowEditor from '../components/WorkflowEditor';
import WorkflowEditBlock from '../components/WorkflowEditBlock';

const WorkflowDetail = () => {
  // 从路由参数中获取workflowId
  const { id: workflowId = '' } = useParams<{ id: string }>();
  const { getWorkflowById } = useWorkflowStore();
  const workflow = getWorkflowById(workflowId);
  // console.log('🚀 ~ WorkflowDetail ~ workflow:', workflow);
  const blocks = getBlocks();

  const [editor, setEditor] = useState<ReactFlowInstance>();
  const [showSidebar, setShowSidebar] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editingBlock, setEditingBlock] = useState();

  const editorData = useMemo(() => {
    return workflow.drawflow;
  }, [workflow]);
  console.log('🚀 ~ editorData ~ editorData:', editorData);

  const onEditorInit = (instance: ReactFlowInstance) => {
    console.log('🚀 ~ onEditorInit ~ instance:', instance);
    setEditor(instance);
  };

  // 初始化block编辑区
  const initEditBlock = (node: Node) => {
    const block = blocks[node.data.label as keyof typeof blocks];
    console.log('🚀 ~ initEditBlock ~ block:', block);
    const { editComponent, data: blockDefData, name } = block;
    console.log('🚀 ~ initEditBlock ~ editComponent:', editComponent);
    const blockData = defu(node.data, blockDefData);
    console.log('🚀 ~ initEditBlock ~ blockData:', blockData);

    setEditingBlock({
      ...blockData,
      editComponent,
      name,
    });

    console.log('🚀 ~ initEditBlock ~ editingBlock:', editingBlock);

    setShowSidebar(true);
    setEditing(true);
  };

  const closeEditingCard = () => {
    setEditing(false);
  };

  return (
    <div
      className="workflow-detail flex"
      style={{ height: 'calc(100vh - 40px)' }}
    >
      {/* 左侧Block区 */}
      {showSidebar && (
        <div className="workflow-left-block-area hidden md:flex w-80 flex-col border-l border-gray-100 bg-white py-6 dark:border-gray-700 dark:border-opacity-50 dark:bg-gray-800">
          {editing ? (
            <WorkflowEditBlock
              editingBlock={editingBlock}
              close={closeEditingCard}
            />
          ) : (
            <WorkflowDetailsCard />
          )}
        </div>
      )}
      {/* 编辑区 */}
      <div
        className="workflow-right-flow-area"
        style={{ height: '100vh', width: '100vw' }}
      >
        <ReactFlowProvider>
          <WorkflowEditor
            editorData={editorData}
            onInit={onEditorInit}
            onEdit={initEditBlock}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default WorkflowDetail;
