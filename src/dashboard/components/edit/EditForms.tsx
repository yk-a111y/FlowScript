import UiSeparator from '@/components/ui/UiSeparator';
import EditInteractionBase from './EditInteractionBase';
interface EditFormsProps {
  compData: any;
  updateBlockData: (data: any) => void;
}

const EditForms = ({ compData, updateBlockData }: EditFormsProps) => {
  console.log('🚀 ~ EditForms ~ compData:', compData);
  const forms = ['text-field', 'select', 'checkbox', 'radio'];

  return (
    <EditInteractionBase data={compData} updateBlockData={updateBlockData}>
      <UiSeparator className="my-4 bg-gray-200 dark:bg-gray-800" />
    </EditInteractionBase>
  );
};

export default EditForms;
