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
    <UiCard className="group relative min-h-40 py-4 px-6 rounded-lg border border-gray-200 bg-white hover:shadow-lg hover:border-black transition-all duration-300 cursor-pointer">
      <div
        className="flex flex-col gap-3"
        onClick={() => {
          navigate(`/workflow/${workflow.id}`);
        }}
      >
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
            onClick={(e) => {
              e.stopPropagation();
              onExecute();
            }}
          >
            <UiIcon name="RiPlayLine" />
          </button>
        </div>
        {/* workflow info */}
        <div className="workflow-info flex-1 cursor-pointer">
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
      </div>
    </UiCard>
  );
};

export default WorkflowsLocalCard;
