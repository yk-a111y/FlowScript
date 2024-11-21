import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowInstance, ReactFlowProvider } from '@xyflow/react';
import { useWorkflowStore } from '@/store/workflow';
import WorkflowDetailsCard from './WorkflowDetailsCard';
import WorkflowEditor from '../components/WorkflowEditor';

const WorkflowDetail = () => {
  // 从路由参数中获取workflowId
  const { id: workflowId = '' } = useParams<{ id: string }>();
  const { getWorkflowById } = useWorkflowStore();
  const workflow = getWorkflowById(workflowId);
  // console.log('🚀 ~ WorkflowDetail ~ workflow:', workflow);

  // const [editor, setEditor] = useState<ReactFlowInstance>();

  const editorData = useMemo(() => {
    return workflow.drawflow;
  }, [workflow]);
  console.log('🚀 ~ editorData ~ editorData:', editorData);

  const onEditorInit = (instance: ReactFlowInstance) => {
    console.log('🚀 ~ onEditorInit ~ instance:', instance);
    // setEditor(instance);
  };

  return (
    <div
      className="workflow-detail flex"
      style={{ height: 'calc(100vh - 40px)' }}
    >
      {/* 左侧Block区 */}
      <div className="workflow-left-block-area hidden md:flex w-80 flex-col border-l border-gray-100 bg-white py-6 dark:border-gray-700 dark:border-opacity-50 dark:bg-gray-800">
        <WorkflowDetailsCard />
      </div>
      {/* 编辑区 */}
      <div
        className="workflow-right-flow-area"
        style={{ height: '100vh', width: '100vw' }}
      >
        <ReactFlowProvider>
          <WorkflowEditor editorData={editorData} onInit={onEditorInit} />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default WorkflowDetail;
