import { Textarea } from '@/components/ui/UiTextarea';
import { useState } from 'react';

interface EditNewTabProps {
  compData: any;
  updateBlockData: (key: string, value: string) => void;
}

const EditNewTab = ({ compData, updateBlockData }: EditNewTabProps) => {
  const [description, setDescription] = useState(compData.data.description);
  return (
    <div>
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          updateBlockData('description', e.target.value);
        }}
      />
    </div>
  );
};

export default EditNewTab;
