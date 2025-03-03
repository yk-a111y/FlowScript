import { useState } from 'react';
import UiTextarea from '@/components/ui/UiTextarea';
import UiInput from '@/components/ui/UiInput';
import UiSelect, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/UiSelect';
import UiCheckbox from '@/components/ui/UiCheckbox';
import UiModal from '@/components/ui/UiModal';
import SharedCodeMirror from '../SharedCodeMirror';
import UiTabs from '@/components/ui/UiTabs';
import UiTab from '@/components/ui/UiTab';
import UiTabPanels from '@/components/ui/UiTabPanels';
import UiTabPanel from '@/components/ui/UiTabPanel';
interface EditJavascriptCodeProps {
  compData: any;
  updateBlockData: (data: any, isData?: boolean) => void;
}

const EditJavascriptCode = ({
  compData,
  updateBlockData,
}: EditJavascriptCodeProps) => {
  console.log('🚀 ~ compData:', compData);
  const { data } = compData;
  const [description, setDescription] = useState(data.description);
  const [timeoutValue, setTimeoutValue] = useState(data.timeout);
  const [context, setContext] = useState(data.context);
  const [everyNewTab, setEveryNewTab] = useState(data.everyNewTab);
  const [runBeforePageLoaded, setRunBeforePageLoaded] = useState(
    data.runBeforePageLoaded
  );
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [code, setCode] = useState(data.code);

  const [activeTab, setActiveTab] = useState<string | number>('code');

  const modalHeader = () => {
    return (
      <UiTabs
        value={activeTab}
        onChange={(value: string | number) => setActiveTab(value)}
      >
        <UiTab value="code">Code</UiTab>
        <UiTab value="preloadScript">PreloadScript</UiTab>
      </UiTabs>
    );
  };

  return (
    <div className="mb-2 mt-4">
      <UiTextarea
        className="mb-1 w-full"
        value={description}
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
          updateBlockData({ description: e.target.value });
        }}
      />
      {!data.everyNewTab && (
        <>
          <UiInput
            className="mb-2 w-full"
            type="number"
            value={timeoutValue}
            label="Timeout (in milliseconds)"
            onChange={(e) => {
              setTimeoutValue(e.target.value);
              updateBlockData({ timeout: e.target.value });
            }}
          />
          <UiSelect
            value={context}
            onValueChange={(value) => {
              setContext(value);
              updateBlockData({ context: value });
            }}
          >
            <SelectTrigger className="bg-input mb-2 w-full" label="Context">
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent className="font-serif bg-white dark:bg-gray-900">
              {['website', 'background'].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </UiSelect>
        </>
      )}
      <p className="ml-1 text-sm text-gray-600 dark:text-gray-200">
        Javascript Code
      </p>
      {!showCodeModal && (
        <pre
          className="max-h-80 overflow-auto rounded-lg bg-gray-900 p-4 text-gray-200"
          onClick={() => {
            setShowCodeModal(true);
          }}
        >
          {data.code}
        </pre>
      )}
      {data.context !== 'background' && (
        <>
          <UiCheckbox
            className="mt-2"
            checked={everyNewTab}
            onChange={(checked) => {
              setEveryNewTab(checked);
              updateBlockData({ everyNewTab: checked });
            }}
          >
            Execute in every new tab
          </UiCheckbox>
          <UiCheckbox
            className="mt-2"
            checked={runBeforePageLoaded}
            onChange={(checked) => {
              setRunBeforePageLoaded(checked);
              updateBlockData({ runBeforePageLoaded: checked });
            }}
          >
            Run before page loaded
          </UiCheckbox>
        </>
      )}
      {showCodeModal && (
        <UiModal
          open={showCodeModal}
          contentClass="max-w-4xl"
          header={modalHeader()}
          onClose={() => setShowCodeModal(false)}
        >
          <UiTabPanels
            modelValue={activeTab}
            className="overflow-auto"
            style={{ height: 'calc(100vh - 9rem)' }}
            onChange={(value: string | number) => setActiveTab(value)}
          >
            <UiTabPanel value="code" cache={true} className="h-full">
              <SharedCodeMirror
                code={code}
                everyNewTab={everyNewTab}
                updateCode={(newValue) => {
                  setCode(newValue);
                  updateBlockData({ code: newValue }, true);
                }}
              />
            </UiTabPanel>
            <UiTabPanel value="preloadScript" cache={true}>
              <div>11111</div>
            </UiTabPanel>
          </UiTabPanels>
        </UiModal>
      )}
    </div>
  );
};

export default EditJavascriptCode;
