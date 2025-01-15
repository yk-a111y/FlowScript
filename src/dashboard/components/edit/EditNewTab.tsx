import { Textarea } from '@/components/ui/UiTextarea';

interface EditNewTabProps {
  compData: any;
}

const EditNewTab = ({ compData }: EditNewTabProps) => {
  console.log('🚀 ~ EditNewTab ~ compData:', compData);
  return (
    <div>
      <Textarea
        placeholder="Tell us a little bit about yourself"
        value={compData.description}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};

export default EditNewTab;
