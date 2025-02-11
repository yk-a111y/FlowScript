import { useWorkflowStore } from '@/store/workflow';
import WorkflowsLocalCard from './WorkflowsLocalCard';
import { executeWorkflow } from '@/workflowEngine';

const WorkflowsLocal = () => {
  const { getWorkflows } = useWorkflowStore();
  const workflows = getWorkflows();
  console.log('🚀 ~ WorkflowsLocal ~ workflows:', workflows);

  return (
    <div className="workflows-container w-full">
      {workflows.map((workflow) => (
        <WorkflowsLocalCard
          key={workflow.id}
          workflow={workflow}
          onExecute={() => executeWorkflow(workflow)}
        />
      ))}
    </div>
  );
};

export default WorkflowsLocal;
