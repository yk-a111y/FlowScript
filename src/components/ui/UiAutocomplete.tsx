import UiPopover from './UiPopover';

const UiAutocomplete = () => {
  return (
    <UiPopover
      trigger="manual"
      triggerWidth
      renderTrigger={() => <div>123</div>}
    >
      <div>
        <input type="text" />
      </div>
    </UiPopover>
  );
};

export default UiAutocomplete;
