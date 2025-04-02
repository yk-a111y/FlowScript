import { useState } from 'react';
import { useWorkflowStore } from '@/store/workflow';
import { importWorkflow } from '@/utils/workflowData';
import UiButton from '@/components/ui/UiButton';
import UiInput from '@/components/ui/UiInput';
import UiPopover from '@/components/ui/UiPopover';
import UiIcon from '@/components/ui/UiIcon';
import UiList from '@/components/ui/UiList';
import UiListItem from '@/components/ui/UiListItem';
import UiModal from '@/components/ui/UiModal';
import WorkflowsLocal from '../components/WorkflowsLocal';
import UiTextarea from '@/components/ui/UiTextarea';
import { useNavigate } from 'react-router-dom';

const Workflows = () => {
  const navigate = useNavigate();
  const workflowStore = useWorkflowStore();
  const [addWorkflowModal, setAddWorkflowModal] = useState({
    name: '',
    show: false,
    type: 'manual',
    description: '',
  });

  const functions = [
    {
      id: 'import',
      label: 'Import Workflow',
      value: 'import',
      action: () => importWorkflow(workflowStore, { multiple: true }),
    },
    {
      id: 'record',
      label: 'Record Workflow',
      value: 'record',
    },
    {
      id: 'hosted',
      label: 'Add Hosted Workflow',
      value: 'hosted',
    },
  ];

  const handleItemClick = (itemId: string) => {
    const item = functions.find((item) => item.id === itemId);
    if (item) item.action?.();
  };

  const clearAddWorkflowModal = () => {
    setAddWorkflowModal({
      name: '',
      show: false,
      type: 'manual',
      description: '',
    });
  };

  const addWorkflow = () => {
    workflowStore
      .insert({
        name: addWorkflowModal.name,
        description: addWorkflowModal.description,
      })
      .then((workflows) => {
        console.log('🚀 ~ .then ~ workflows:', workflows);
        const workflowId = Object.keys(workflows)[0];
        console.log('🚀 ~ .then ~ workflowId:', workflowId);
        navigate(`/workflow/${workflowId}`);
      })
      .finally(() => {
        clearAddWorkflowModal();
      });
  };

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
            onClick={() =>
              setAddWorkflowModal({ ...addWorkflowModal, show: true })
            }
          >
            New Workflow
          </UiButton>
          <UiPopover
            renderTrigger={() => (
              <UiButton className="rounded-l-none h-11" variant="accent">
                <UiIcon name="RiArrowDownSLine" />
              </UiButton>
            )}
            onItemClick={handleItemClick}
          >
            <UiList className="pointer-cursor">
              {functions.map((item) => (
                <UiListItem
                  className="cursor-pointer"
                  key={item.value}
                  data-item-id={item.id}
                >
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
      {/* Modal */}
      <UiModal
        title="Workflow"
        open={addWorkflowModal.show}
        onClose={() =>
          setAddWorkflowModal({ ...addWorkflowModal, show: false })
        }
      >
        <UiInput
          className="mb-4 w-full"
          value={addWorkflowModal.name}
          placeholder="Name"
          autoFocus
          onChange={(e) =>
            setAddWorkflowModal({ ...addWorkflowModal, name: e.target.value })
          }
        />
        <UiTextarea
          className="w-full dark:text-gray-200"
          value={addWorkflowModal.description}
          placeholder="Description"
          max={300}
          onChange={(e) =>
            setAddWorkflowModal({
              ...addWorkflowModal,
              description: e.target.value,
            })
          }
        />
        <p className="mb-6 text-right text-gray-600 dark:text-gray-200">
          {addWorkflowModal.description.length}/300
        </p>
        <div className="flex space-x-2">
          <UiButton className="w-full" onClick={clearAddWorkflowModal}>
            Cancel
          </UiButton>
          <UiButton className="w-full" variant="accent" onClick={addWorkflow}>
            Add Workflow
          </UiButton>
        </div>
      </UiModal>
    </div>
  );
};

export default Workflows;
