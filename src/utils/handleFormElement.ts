import { sleep } from '@/utils/helper';
import simulateEvent from '@/utils/simulateEvent';
import { keyDefinitions } from '@/utils/USKeyboardLayout';
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
).set;
const reactJsEvent = (element, value) => {
  if (!element._valueTracker) return;

  const previousValue = element.value;
  nativeInputValueSetter.call(element, value);
  element._valueTracker.setValue(previousValue);
};

const formEvent = (element, data) => {
  if (data.type === 'text-field') {
    const currentKey = /\s/.test(data.value) ? 'Space' : data.value;
    const { key, keyCode, code } = keyDefinitions[currentKey] || {
      key: currentKey,
      keyCode: 0,
      code: `Key${currentKey}`,
    };

    simulateEvent(element, 'input', {
      inputType: 'insertText',
      data: data.value,
      bubbles: true,
      cancelable: true,
    });

    simulateEvent(element, 'keydown', {
      key,
      code,
      keyCode,
      bubbles: true,
      cancelable: true,
    });
    simulateEvent(element, 'keyup', {
      key,
      code,
      keyCode,
      bubbles: true,
      cancelable: true,
    });
  }

  simulateEvent(element, 'input', {
    inputType: 'insertText',
    data: data.value,
    bubbles: true,
    cancelable: true,
  });

  if (data.type !== 'text-field') {
    element.dispatchEvent(
      new Event('change', { bubbles: true, cancelable: true })
    );
  }
};

const inputText = async ({ data, element, isEditable = false }) => {
  element?.focus();
  element?.click();
  const elementKey = isEditable ? 'textContent' : 'value';

  if (data.delay > 0 && !document.hidden) {
    for (let index = 0; index < data.value.length; index++) {
      if (elementKey === 'value') reactJsEvent(element, element.value);

      const currentChar = data.value[index];
      element[elementKey] += currentChar;

      formEvent(element, {
        type: 'text-field',
        value: currentChar,
        isEditable,
      });

      await sleep(data.delay);
    }
  } else {
    if (elementKey === 'value') reactJsEvent(element, element.value);
    element[elementKey] += data.value;

    formEvent(element, {
      isEditable,
      type: 'text-field',
      value: data.value[0] ?? '',
    });
  }

  element.dispatchEvent(
    new Event('change', { bubbles: true, cancelable: true })
  );

  element?.blur();
};

const handleFormElement = async (element, data) => {
  const textFields = ['INPUT', 'TEXTAREA'];
  const isEditable =
    element.hasAttribute('contenteditable') && element.isContentEditable;

  if (isEditable) {
    if (data.clearValue) element.innerText = '';

    await inputText({ data, element, isEditable });
    return;
  }

  if (data.type === 'text-field' && textFields.includes(element.tagName)) {
    if (data.clearValue) {
      element?.select();
      reactJsEvent(element, '');
      element.value = '';
    }

    await inputText({ data, element });
    return;
  }
};

export default handleFormElement;
