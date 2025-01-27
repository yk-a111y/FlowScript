import dayjs from 'dayjs';
import UiCard from '@/components/ui/UiCard';
import UiIcon from '@/components/ui/UiIcon';
import { IWorkflow } from '@/dashboard/type';

interface PopupWorkflowProps {
  workflow: IWorkflow;
  onExecute: () => void;
}

const PopupWorkflow = ({ workflow, onExecute }: PopupWorkflowProps) => {
  return (
    <UiCard className="flex w-full items-center space-x-2 hover:ring-2 hover:ring-gray-900">
      <div className="workflow-info text-overflow flex-1 cursor-pointer">
        <p className="text-overflow leading-tight">{workflow.name}</p>
        <p className="leading-tight text-gray-500">
          {dayjs(workflow.createdAt).format('MMM DD, YYYY')}
        </p>
      </div>
      <button title="Execute" onClick={onExecute}>
        <UiIcon name="RiPlayLine" />
      </button>
    </UiCard>
  );
};

export default PopupWorkflow;
