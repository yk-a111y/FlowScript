import UiButton from '@/components/ui/UiButton';
import UiIcon from '@/components/ui/UiIcon';

interface CommonElSelectorActionsProps {
  findBy: string;
  selector: string;
  multiple: boolean;
  updateData: (data: any) => void;
}

const CommonElSelectorActions: React.FC<CommonElSelectorActionsProps> = ({
  findBy,
  selector,
  multiple,
  updateData,
}) => {
  const selectElement = () => {
    console.log('selectElement');
  };
  const verifySelector = () => {
    console.log('verifySelector');
  };
  return (
    <div className="inline-flex items-center">
      <UiButton className="mr-2" onClick={selectElement}>
        <UiIcon name="RiFocus3Line" />
      </UiButton>
      <UiButton disabled={!selector} onClick={verifySelector}>
        <UiIcon name="RiCheckDoubleLine" />
      </UiButton>
    </div>
  );
};
export default CommonElSelectorActions;
