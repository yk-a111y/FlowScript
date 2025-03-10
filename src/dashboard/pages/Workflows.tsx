import UiButton from '@/components/ui/UiButton';
import WorkflowsLocal from '../components/WorkflowsLocal';
import UiInput from '@/components/ui/UiInput';
import { useWorkflowStore } from '@/store/workflow';
import { importWorkflow } from '@/utils/workflowData';
import UiPopover from '@/components/ui/UiPopover';
import UiIcon from '@/components/ui/UiIcon';
import UiList from '@/components/ui/UiList';
import UiListItem from '@/components/ui/UiListItem';

const Workflows = () => {
  const workflowStore = useWorkflowStore();
  const functions = [
    {
      label: 'Import Workflow',
      value: 'import',
      action: () => importWorkflow(workflowStore, { multiple: true }),
    },
    {
      label: 'Record Workflow',
      value: 'record',
    },
    {
      label: 'Add Hosted Workflow',
      value: 'hosted',
    },
  ];
  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold capitalize">Workflows</h1>
      {/* Header */}
      <div className="flex mt-10">
        {/* new-workflow  */}
        <div className="flex items-center mr-10">
          <UiButton
            className="h-11 w-60 rounded-r-none border-r font-semibold"
            variant="accent"
          >
            New Workflow
          </UiButton>
          <UiPopover
            renderTrigger={() => (
              <UiButton className="rounded-l-none h-11" variant="accent">
                <UiIcon name="RiArrowDownSLine" />
              </UiButton>
            )}
          >
            <UiList className="pointer-cursor">
              {functions.map((item) => (
                <UiListItem className="cursor-pointer" key={item.value}>
                  {item.label}
                </UiListItem>
              ))}
            </UiList>
          </UiPopover>
        </div>
        {/* search */}
        <div className="relative flex-1 max-w-md">
          <UiInput
            placeholder="Search... (⌘+f)"
            prependIcon="RiSearchLine"
            className="h-12 bg-white border-gray-200 focus:border-black focus:ring-1 focus:ring-black transition-all duration-200"
          />
        </div>
      </div>
      {/* Content */}
      <div className="flex items-start mt-8">
        <WorkflowsLocal />
      </div>
    </div>
  );
};

export default Workflows;
