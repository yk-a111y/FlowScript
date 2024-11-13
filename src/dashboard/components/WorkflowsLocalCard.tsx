import { useNavigate } from 'react-router-dom';
import UiCard from '@/components/ui/UiCard';
import { FaInfoCircle } from 'react-icons/fa';
import { RiPlayLine, RiGlobalLine } from 'react-icons/ri';
import { IWorkflow } from '../type';

interface WorkflowsLocalCardProps {
  workflow: IWorkflow;
}

const WorkflowsLocalCard = ({ workflow }: WorkflowsLocalCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="local-workflow cursor-default select-none ring-accent">
      <UiCard className="group flex flex-col hover:ring-2 hover:ring-accent dark:hover:ring-gray-200">
        <div className="mb-4 flex items-center">
          <span className="bg-box-transparent rounded-lg p-2">
            {workflow.icon ? (
              <RiGlobalLine size={24} />
            ) : (
              <FaInfoCircle size={24} />
            )}
          </span>
          <button
            v-if="!workflow.isDisabled"
            className="invisible group-hover:visible"
          >
            <RiPlayLine size={24} />
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
