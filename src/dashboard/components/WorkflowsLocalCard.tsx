import { useNavigate } from 'react-router-dom';
import UiCard from '@/components/ui/UiCard';
import UiIcon from '@/components/ui/UiIcon';
import { IWorkflow } from '../type';

interface WorkflowsLocalCardProps {
  workflow: IWorkflow;
  onExecute: () => void;
}

const WorkflowsLocalCard = ({
  workflow,
  onExecute,
}: WorkflowsLocalCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="local-workflow cursor-default select-none ring-accent">
      <UiCard className="group flex flex-col hover:ring-2 hover:ring-accent dark:hover:ring-gray-200">
        <div className="mb-4 flex items-center">
          <span className="bg-box-transparent rounded-lg p-2">
            {workflow.icon ? (
              <UiIcon name={workflow.icon} />
            ) : (
              <UiIcon name="FaInfoCircle" />
            )}
          </span>
          <button
            v-if="!workflow.isDisabled"
            className="invisible group-hover:visible"
            onClick={onExecute}
          >
            <UiIcon name="RiPlayLine" />
          </button>
        </div>
        {/* workflow info */}
        <div
          className="workflow-info flex-1 cursor-pointer"
          onClick={() => navigate(`/workflow/${workflow.id}`)}
        >
          <p className="line-clamp font-semibold leading-tight">
            {workflow.name}
          </p>
          {workflow.description && (
            <p className="line-clamp mb-1 leading-tight text-gray-600 dark:text-gray-200">
              {workflow.description}
            </p>
          )}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-200">
          <p className="flex-1">{workflow.date}</p>
        </div>
      </UiCard>
    </div>
  );
};

export default WorkflowsLocalCard;
