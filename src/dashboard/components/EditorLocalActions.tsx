import UiButton from '@/components/ui/UiButton';
import UiCard from '@/components/ui/UiCard';
import UiIcon from '@/components/ui/UiIcon';

interface EditorLocalActionsProps {
  isDataChanged: boolean;
  onRunWorkflow: () => void;
  onSaveWorkflow: () => void;
}

const EditorLocalActions = ({
  isDataChanged,
  onRunWorkflow,
  onSaveWorkflow,
}: EditorLocalActionsProps) => {
  const modalActions = [
    {
      id: 'table',
      name: 'table',
      icon: 'riTable2',
    },
    {
      id: 'global-data',
      name: 'global-data',
      icon: 'riDatabase2Line',
    },
    {
      id: 'settings',
      name: 'settings',
      icon: 'riSettings3Line',
    },
  ];

  return (
    <div className="top-func absolute left-0 top-0 z-10 flex w-full items-center p-4">
      <div onClick={onRunWorkflow}>开始</div>
      <UiCard padding="p-2 ml-4 hidden md:block pointer-events-auto">
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
      <UiCard padding="p-1 ml-4 space-x-1 pointer-events-auto flex items-center">
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
