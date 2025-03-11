import UiButton from '@/components/ui/UiButton';
import UiCard from '@/components/ui/UiCard';
import UiIcon from '@/components/ui/UiIcon';
import UiList from '@/components/ui/UiList';
import UiListItem from '@/components/ui/UiListItem';
import UiPopover from '@/components/ui/UiPopover';
import { cn } from '@/lib/utils';
import { useWorkflowStore } from '@/store/workflow';
import { IWorkflow } from '@/types/workflow';
import { exportWorkflow } from '@/utils/workflowData';

interface EditorLocalActionsProps {
  workflow: IWorkflow;
  isDataChanged: boolean;
  onRunWorkflow: () => void;
  onSaveWorkflow: () => void;
}

const EditorLocalActions = ({
  workflow,
  isDataChanged,
  onRunWorkflow,
  onSaveWorkflow,
}: EditorLocalActionsProps) => {
  const workflowStore = useWorkflowStore();
  const modalActions = [
    {
      id: 'table',
      name: 'table',
      icon: 'RiTable2',
    },
    {
      id: 'global-data',
      name: 'global-data',
      icon: 'RiDatabase2Line',
    },
    {
      id: 'settings',
      name: 'settings',
      icon: 'RiSettings3Line',
    },
  ];

  const moreActions = [
    {
      id: 'copy-workflow-id',
      icon: 'RiFileCopyLine',
      name: 'Copy Workflow Id',
      action: () => {
        navigator.clipboard.writeText(workflow.id || '');
      },
    },
    {
      id: 'disable-workflow',
      icon: 'RiToggleLine',
      name: 'Disable Workflow',
      action: () => {
        console.log('disable workflow');
      },
    },
    {
      id: 'export',
      icon: 'RiDownloadLine',
      name: 'Export Workflow',
      action: () => exportWorkflow(workflow, workflowStore), // export workflow
      // hasAccess: isTeam ? canEdit : true,
    },
    {
      id: 'rename',
      icon: 'RiPencilLine',
      name: 'Rename Workflow',
      // action: initRenameWorkflow, // 重命名工作流
      // hasAccess: props.isTeam ? props.canEdit : true,
    },
    {
      id: 'delete',
      name: 'Delete Workflow',
      icon: 'RiDeleteBin7Line',
      // action: deleteWorkflow, // 删除工作流
      // hasAccess: true,
      attrs: {
        class: 'text-red-400 dark:text-red-500',
      },
    },
  ];

  const handleItemClick = (itemId: string) => {
    const item = moreActions.find((item) => item.id === itemId);
    if (item) item.action?.();
  };

  return (
    <div className="top-func absolute left-0 top-0 z-10 flex w-full items-center p-4">
      <UiCard padding="p-1 ml-4 hidden md:block pointer-events-auto">
        {modalActions.map((action) => (
          <UiButton
            key={action.id}
            className="hoverable rounded-lg p-2"
            variant="ghost"
          >
            <UiIcon name={action.icon} size={30} />
          </UiButton>
        ))}
      </UiCard>
      <UiCard padding="p-1 ml-4 flex items-center pointer-events-auto">
        <UiButton
          variant="ghost"
          className="hoverable rounded-lg px-2 md:px-4"
          onClick={onRunWorkflow}
        >
          <UiIcon name="RiPlayLine" size={30} />
        </UiButton>
      </UiCard>
      <UiCard padding="p-1 ml-4 space-x-1 pointer-events-auto flex items-center">
        {/* More Actions */}
        <UiPopover
          renderTrigger={() => (
            <UiButton variant="ghost" className="hoverable rounded-lg p-2">
              <UiIcon name="RiMore2Line" size={30} />
            </UiButton>
          )}
          onItemClick={handleItemClick}
        >
          <UiList style={{ minWidth: '7rem' }}>
            {moreActions.map((item) => (
              <UiListItem
                key={item.id}
                data-item-id={item.id}
                className={cn('cursor-pointer hoverable', item.attrs?.class)}
              >
                <UiIcon name={item.icon} size={30} className="mr-2 -ml-1" />
                {item.name}
              </UiListItem>
            ))}
          </UiList>
        </UiPopover>
        {/* Save Button */}
        <UiButton
          variant="accent"
          className="relative px-2 md:px-4"
          onClick={onSaveWorkflow}
        >
          {isDataChanged && (
            <span className="absolute top-0 left-0 -ml-1 -mt-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-600"></span>
            </span>
          )}
          <UiIcon name="riSaveLine" className="my-1 md:-ml-1" />
          <span className="ml-2 hidden md:block">保存</span>
        </UiButton>
      </UiCard>
    </div>
  );
};

export default EditorLocalActions;
