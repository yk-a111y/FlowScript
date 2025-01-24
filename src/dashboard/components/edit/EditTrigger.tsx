import { useState } from 'react';
import { Textarea } from '@/components/ui/UiTextarea';
import { Button } from '@/components/ui/UiButton';
import Icon from '@/components/ui/UiIcon';
interface EditTriggerProps {
  compData: any;
  updateBlockData: (key: string, value: string) => void;
}

const EditTrigger = ({ compData, updateBlockData }: EditTriggerProps) => {
  const [description, setDescription] = useState(compData.data.description);
  return (
    <div className="edit-trigger">
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          updateBlockData('description', e.target.value);
        }}
      />
      <Button variant="accent" className="mt-4 w-full">
        Edit Trigger
      </Button>
      <Button className="mt-4">
        <Icon name="RiCommandLine" />
        <span>Parameters</span>
      </Button>
    </div>
  );
};

export default EditTrigger;
