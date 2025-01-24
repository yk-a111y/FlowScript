import { useState } from 'react';
import { Textarea } from '@/components/ui/UiTextarea';
import { Label } from '@/components/ui/UiLabel';
import { Input } from '@/components/ui/UiInput';
interface EditNewTabProps {
  compData: any;
  updateBlockData: (key: string, value: string) => void;
}

const EditNewTab = ({ compData, updateBlockData }: EditNewTabProps) => {
  const [description, setDescription] = useState(compData.data.description);
  const [newTabUrl, setNewTabUrl] = useState(compData.data.url);
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
      <Label>New Tab URL</Label>
      <Input
        value={newTabUrl}
        placeholder="https://www.test.com"
        onChange={(e) => {
          setNewTabUrl(e.target.value);
          updateBlockData('url', e.target.value);
        }}
      />
    </div>
  );
};

export default EditNewTab;
