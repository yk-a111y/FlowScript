import { useWorkflowStore } from '@/store/workflow';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Workflows = () => {
  const navigate = useNavigate();
  const { workflows } = useWorkflowStore();

  useEffect(() => {
    console.log('🚀 ~ Workflows ~ workflows:', workflows);
  });

  const navigateToWorkflow = () => {
    navigate('workflow/123');
  };
  return (
    <div className="flex">
      workflow
      <button onClick={navigateToWorkflow}>点击跳转工作流</button>
    </div>
  );
};

export default Workflows;
