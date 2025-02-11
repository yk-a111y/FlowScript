import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';
import WorkflowsLocal from '../components/WorkflowsLocal';
import UiInput from '@/components/ui/UiInput';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/UiSelect';
import UiSelect from '@/components/ui/UiSelect';

const Workflows = () => {
  const functions = [
    {
      label: 'Import Workflow',
      value: 'import',
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
          <UiSelect>
            <SelectTrigger
              className="bg-accent h-[2.875rem] px-4 py-2 flex-1 rounded-l-none text-white hover:bg-gray-700"
              hasIcon
            >
              <UiIcon name="RiArrowLeftSLine" rotate={-90} />
            </SelectTrigger>
            <SelectContent className="p-4 font-serif">
              {functions.map((func) => {
                return (
                  <SelectItem showIndicator={false} value={func.value}>
                    {func.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </UiSelect>
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
