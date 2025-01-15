import { Textarea } from '@/components/ui/UiTextarea';
import { Button } from '@/components/ui/UiButton';
import Icon from '@/components/ui/UiIcon';
interface EditTriggerProps {
  compData: any;
}

const EditTrigger = ({ compData }: EditTriggerProps) => {
  console.log('🚀 ~ EditTrigger ~ compData:', compData);
  return (
    <div className="edit-trigger">
      <Textarea
        placeholder="Description"
        value={compData.description}
        onChange={(e) => {
          console.log(e.target.value);
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
