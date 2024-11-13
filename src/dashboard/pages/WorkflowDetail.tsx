import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import WorkflowDetailsCard from './WorkflowDetailsCard';
import WorkflowEditor from '../components/WorkflowEditor';
import { useWorkflowStore } from '@/store/workflow';

const WorkflowDetail = () => {
  // 从路由参数中获取workflowId
  const { id: workflowId } = useParams();
  const { getWorkflowById } = useWorkflowStore();
  const workflow = getWorkflowById(workflowId as string);
  console.log('🚀 ~ WorkflowDetail ~ workflow:', workflow);
  const editorData = useMemo(() => {
    return workflow.drawflow;
  }, [workflow]);
  console.log('🚀 ~ editorData ~ editorData:', editorData);
  return (
    <div>
      {/* 左侧Block区 */}
      <WorkflowDetailsCard />
      {/* 编辑区 */}
      <div
        className="flow-container"
        style={{ height: '100vh', width: '100vw' }}
      >
        <WorkflowEditor editorData={editorData} />
      </div>
    </div>
  );
};

export default WorkflowDetail;
