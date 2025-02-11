import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import UiTextarea from '@/components/ui/UiTextarea';
import UiSelect, {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/UiSelect';
import EditAutocomplete from './EditAutocomplete';
import CommonElSelectorActions from '../common/CommonElSelectorActions';
import UiExpand from '@/components/ui/UiExpand';
import UiIcon from '@/components/ui/UiIcon';
import UiLabel from '@/components/ui/UiLabel';
import UiCheckbox from '@/components/ui/UiCheckbox';
import UiSeparator from '@/components/ui/UiSeparator';
interface EditInteractionBaseProps extends PropsWithChildren {
  data: any;
  hide?: boolean;
  hideMarkEl?: boolean;
  hideSelector?: boolean;
  hideMultiple?: boolean;
  hideDescription?: boolean;
  updateBlockData: (data: any) => void;
  onChange?: (data: any) => void;
  prependEle?: React.ReactNode;
  prependSelectorEle?: React.ReactNode;
}

const EditInteractionBase: React.FC<EditInteractionBaseProps> = ({
  data,
  hide = false,
  hideMarkEl = false,
  hideSelector = false,
  hideMultiple = false,
  hideDescription = false,
  updateBlockData,
  children,
  prependEle,
  prependSelectorEle,
}) => {
  const blockData = data.data;
  const selectorTypes = ['cssSelector', 'xpath'];
  const [description, setDescription] = useState(blockData.description);
  const [findBy, setFindBy] = useState(blockData.findBy);
  const [selector, setSelector] = useState(blockData.selector);
  const [showExpand, setShowExpand] = useState(false);
  const [multiple, setMultiple] = useState(blockData.multiple);
  const [markEl, setMarkEl] = useState(blockData.markEl);

  const updateData = useCallback(
    (value: any) => {
      const payload = { ...blockData, ...value };
      updateBlockData(payload);
    },
    [blockData, updateBlockData]
  );

  useEffect(() => {
    if (blockData && !blockData.findBy) {
      updateData({ findBy: 'cssSelector' });
    }
  }, [blockData, updateData]);

  return (
    <div>
      {prependEle}
      {!hide && (
        <>
          {!hideDescription && (
            <UiTextarea
              className="mb-2 w-full"
              value={description}
              placeholder="Please enter the description ..."
              onChange={(e) => {
                setDescription(e.target.value);
                updateData({ description: e.target.value });
              }}
            />
          )}
          {!hideSelector && (
            <>
              <div className="flex items-center mb-4">
                <UiSelect
                  value={findBy}
                  onValueChange={(value) => {
                    setFindBy(value);
                    updateData({ findBy: value });
                  }}
                >
                  <SelectTrigger className="bg-input mr-2 flex-1">
                    <SelectValue placeholder={findBy} />
                  </SelectTrigger>
                  <SelectGroup>
                    <SelectContent>
                      <SelectLabel className="text-gray-500">
                        Find Element By
                      </SelectLabel>
                      {selectorTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectGroup>
                </UiSelect>
                <CommonElSelectorActions
                  findBy={blockData.findBy}
                  selector={blockData.selector}
                  multiple={blockData.multiple}
                  updateData={updateData}
                />
              </div>
              <EditAutocomplete>
                <UiTextarea
                  autoResize
                  className="w-full"
                  value={selector}
                  placeholder="Please Enter the Element Selector ..."
                  onChange={(e) => setSelector(e.target.value)}
                />
              </EditAutocomplete>
              <UiExpand
                show={showExpand}
                handleToggle={() => setShowExpand(!showExpand)}
                hideHeaderIcon
                headerClass="flex items-center w-full focus:ring-0"
                header={
                  <>
                    <UiIcon
                      name="RiArrowLeftSLine"
                      rotate={showExpand ? 270 : 180}
                      className="mr-1 -ml-1 transition-transform"
                    />
                    <UiLabel>Selector Options</UiLabel>
                  </>
                }
              >
                <div className="m-1">
                  <UiCheckbox
                    className="mr-6"
                    checked={multiple}
                    onChange={(checked) => {
                      setMultiple(checked);
                      updateData({ multiple: checked });
                    }}
                  >
                    Multiple
                  </UiCheckbox>
                  {!hideMarkEl &&
                    (data.findBy || 'cssSelector') === 'cssSelector' && (
                      <UiCheckbox
                        checked={markEl}
                        onChange={(checked) => {
                          setMarkEl(checked);
                          updateData({ markEl: checked });
                        }}
                      >
                        Wait for Selector
                      </UiCheckbox>
                    )}
                </div>
              </UiExpand>
            </>
          )}
          {prependSelectorEle}
        </>
      )}
      {children}
    </div>
  );
};

export default EditInteractionBase;
