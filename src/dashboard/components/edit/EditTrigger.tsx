import { useState } from 'react';
import UiTextarea from '@/components/ui/UiTextarea';
import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';
interface EditTriggerProps {
  compData: any;
  updateBlockData: (key: string, value: string) => void;
}

const EditTrigger = ({ compData, updateBlockData }: EditTriggerProps) => {
  const [description, setDescription] = useState(compData.data.description);
  return (
    <div className="edit-trigger">
      <UiTextarea
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          updateBlockData('description', e.target.value);
        }}
      />
      <UiButton variant="accent" className="mt-4 w-full">
        Edit Trigger
      </UiButton>
      <UiButton className="mt-4">
        <UiIcon name="RiCommandLine" />
        <span>Parameters</span>
      </UiButton>
    </div>
  );
};

export default EditTrigger;
