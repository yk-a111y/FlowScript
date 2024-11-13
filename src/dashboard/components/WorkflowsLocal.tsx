import { useWorkflowStore } from '@/store/workflow';
import WorkflowsLocalCard from './WorkflowsLocalCard';

const WorkflowsLocal = () => {
  const { getWorkflows } = useWorkflowStore();
  const workflows = getWorkflows();
  console.log('🚀 ~ WorkflowsLocal ~ workflows:', workflows);
  return (
    <div className="workflows-container">
      {workflows.map((workflow) => (
        <WorkflowsLocalCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};

export default WorkflowsLocal;
