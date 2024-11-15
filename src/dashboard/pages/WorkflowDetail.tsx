import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowInstance, ReactFlowProvider } from '@xyflow/react';
import { useWorkflowStore } from '@/store/workflow';
import WorkflowDetailsCard from './WorkflowDetailsCard';
import WorkflowEditor from '../components/WorkflowEditor';

const WorkflowDetail = () => {
  // 从路由参数中获取workflowId
  const { id: workflowId } = useParams();
  const { getWorkflowById } = useWorkflowStore();
  const workflow = getWorkflowById(workflowId as string);
  console.log('🚀 ~ WorkflowDetail ~ workflow:', workflow);

  const [editor, setEditor] = useState<ReactFlowInstance>();

  const editorData = useMemo(() => {
    return workflow.drawflow;
  }, [workflow]);
  console.log('🚀 ~ editorData ~ editorData:', editorData);

  const onEditorInit = (instance: ReactFlowInstance) => {
    setEditor(instance);
    // console.log('🚀 ~ onEditorInit ~ editorData:', instance);
    // instance.updateEdge(onEdgesChange);
    // instance.updateNode(onNodesChange);
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
          <WorkflowEditor
            editorData={editorData}
            workflowId={workflowId}
            onInit={onEditorInit}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default WorkflowDetail;
