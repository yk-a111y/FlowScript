import { useWorkflowStore } from '@/store/workflow';
import WorkflowsLocalCard from './WorkflowsLocalCard';

const WorkflowsLocal = () => {
  const { getWorkflows } = useWorkflowStore();
  const workflows = getWorkflows();
  return (
    <div className="workflows-container">
      {workflows.map((workflow) => (
        <WorkflowsLocalCard key={workflow.name} workflow={workflow} />
      ))}
    </div>
  );
};

export default WorkflowsLocal;
