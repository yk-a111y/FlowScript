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
    <div className="flex">
      {/* 左侧Block区 */}
      <WorkflowDetailsCard />
      {/* 编辑区 */}
      <div
        className="flow-container"
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
