import { useState } from 'react';
import UiTextarea from '@/components/ui/UiTextarea';
import UiLabel from '@/components/ui/UiLabel';
import UiInput from '@/components/ui/UiInput';
interface EditNewTabProps {
  compData: any;
  updateBlockData: (data: any) => void;
}

const EditNewTab = ({ compData, updateBlockData }: EditNewTabProps) => {
  const [description, setDescription] = useState(compData.data.description);
  const [newTabUrl, setNewTabUrl] = useState(compData.data.url);
  return (
    <div>
      <UiTextarea
        placeholder="Please enter the description ..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          updateBlockData({ description: e.target.value });
        }}
      />
      <UiLabel>New Tab URL</UiLabel>
      <UiInput
        className="mt-2"
        value={newTabUrl}
        placeholder="https://www.test.com"
        onChange={(e) => {
          setNewTabUrl(e.target.value);
          updateBlockData({ url: e.target.value });
        }}
      />
    </div>
  );
};

export default EditNewTab;
