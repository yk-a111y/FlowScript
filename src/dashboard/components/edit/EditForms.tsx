import { useState } from 'react';
import UiSeparator from '@/components/ui/UiSeparator';
import UiCheckbox from '@/components/ui/UiCheckbox';
import UiSelect, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/UiSelect';
import EditInteractionBase from './EditInteractionBase';
import UiLabel from '@/components/ui/UiLabel';

interface EditFormsProps {
  compData: any;
  updateBlockData: (data: any, isData?: boolean) => void;
}

const EditForms = ({ compData, updateBlockData }: EditFormsProps) => {
  console.log('🚀 ~ EditForms ~ compData:', compData);
  const forms = ['text-field', 'select', 'checkbox', 'radio'];
  const [getFromValue, setGetFromValue] = useState(compData.getValue);
  const [type, setType] = useState(compData.data.type);

  return (
    <EditInteractionBase data={compData} updateBlockData={updateBlockData}>
      <UiSeparator className="my-4 bg-gray-200 dark:bg-gray-800" />
      <UiCheckbox
        className="mb-4"
        checked={getFromValue}
        onChange={(checked) => {
          setGetFromValue(checked);
          updateBlockData({ getValue: checked }, true);
        }}
      >
        Get From Value
      </UiCheckbox>
      {!getFromValue && (
        <>
          <UiSelect
            value={type}
            onValueChange={(value) => {
              setType(value);
              updateBlockData({ type: value });
            }}
          >
            <SelectTrigger className="bg-input" label="Context">
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent className="font-serif bg-white dark:bg-gray-900">
              {forms.map((form) => (
                <SelectItem key={form} value={form}>
                  {form}
                </SelectItem>
              ))}
            </SelectContent>
          </UiSelect>
        </>
      )}
    </EditInteractionBase>
  );
};

export default EditForms;
