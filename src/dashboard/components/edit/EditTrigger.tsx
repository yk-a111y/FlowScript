import { Textarea } from '@/components/ui/UiTextarea';

interface EditTriggerProps {
  compData: any;
}

const EditTrigger = ({ compData }: EditTriggerProps) => {
  console.log('🚀 ~ EditTrigger ~ compData:', compData);
  return (
    <div>
      <Textarea placeholder="Tell us a little bit about yourself" />
    </div>
  );
};

export default EditTrigger;
