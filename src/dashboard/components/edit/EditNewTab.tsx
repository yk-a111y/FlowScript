import UiTextarea from '@/components/ui/UiTextarea';

interface EditNewTabProps {
  compData: any;
}

const EditNewTab = ({ compData }: EditNewTabProps) => {
  console.log(compData);
  return (
    <div>
      <UiTextarea
        placeholder="描述"
        value={compData.description}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};

export default EditNewTab;
