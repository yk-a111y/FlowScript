import { useState, useEffect } from 'react';
import UiTextarea from '@/components/ui/UiTextarea';
import UiLabel from '@/components/ui/UiLabel';
import UiInput from '@/components/ui/UiInput';
interface EditNewTabProps {
  compData: any;
  updateBlockData: (data: any) => void;
}

const EditNewTab = ({ compData, updateBlockData }: EditNewTabProps) => {
  const { description, url } = compData.data;
  
  const [desc, setDesc] = useState(description);
  const [newTabUrl, setNewTabUrl] = useState(url);

  useEffect(() => {
    setDesc(description);
    setNewTabUrl(url);
  }, [description, url]);

  return (
    <div>
      <UiTextarea
        placeholder="Please enter the description ..."
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
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
