import { useEffect } from 'react';
import BackgroundUtils from '@/background/backgroundUtils';
import { useWorkflowStore } from '@/store/workflow';
import UiInput from '@/components/ui/UiInput';
import UiSelect, {
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/UiSelect';
import PopupWorkflow from '../components/PopupWorkflow';
import { IWorkflow } from '@/types/workflow';

const PopupHome = () => {
  const { getWorkflows, loadData } = useWorkflowStore();

  useEffect(() => {
    loadData();
  }, []);

  const executeWorkflow = async (workflow: IWorkflow) => {
    console.log('🚀 ~ executeWorkflow ~ workflow:', workflow);
  };

  return (
    <>
      {/* Header bg */}
      <div className="absolute top-0 left-0 w-full rounded-b-2xl bg-accent h-48" />
      <div className="dark relative z-10 px-5 pt-8 text-white placeholder:text-black">
        <div className="mb-4 flex items-center">
          {/* Title */}
          <h1 className="text-xl font-semibold text-white">FlowScript</h1>
          <div className="grow"></div>
          {/* Function */}
          <button
            className="text-white"
            onClick={() => BackgroundUtils.openDashboard('')}
          >
            Go Dashboard
          </button>
        </div>
        <div className="flex">
          <UiInput
            className="search-input w-full"
            placeholder="Search"
            prependIcon="RiSearchLine"
            autoComplete="off"
          />
        </div>
      </div>
      {/* Query */}
      <div className="p-2 rounded-lg bg-white">
        <UiSelect>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Folder (all)" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectLabel className="text-gray-500">Folder (all)</SelectLabel>
            </SelectContent>
          </SelectGroup>
        </UiSelect>
      </div>
      {/* Workflow List */}
      <div className="workflows-list">
        {getWorkflows().map((workflow) => (
          <PopupWorkflow
            key={workflow.id}
            workflow={workflow}
            onExecute={() => executeWorkflow(workflow)}
          />
        ))}
      </div>
    </>
  );
};

export default PopupHome;
