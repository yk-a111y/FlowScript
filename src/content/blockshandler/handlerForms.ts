import handleFormElement from '@/utils/handleFormElement';
import handleSelector, { markElement } from '../handleSelector';

async function forms(block) {
  console.log('🚀 ~ forms ~ block:', block);
  const { data } = block;
  const elements = await handleSelector(block, { returnElement: true });

  // console.log('🚀 ~ forms ~ elements:', elements);
  if (!elements) {
    throw new Error('element-not-found');
  }

  if (data.getValue) {
    let result = '';

    if (data.multiple) {
      result = elements.map((element) => element.value || '');
    } else {
      result = elements.value || '';
    }

    return result;
  }

  const typeText = async (element) => {
    // if (block.debugMode && data.type === 'text-field') {
    //   // get lock
    //   await synchronizedLock.getLock();
    //   element.focus?.();

    //   try {
    //     if (data.clearValue) {
    //       const backspaceCommands = new Array(element.value?.length ?? 0).fill({
    //         type: 'rawKeyDown',
    //         unmodifiedText: 'Delete',
    //         text: 'Delete',
    //         windowsVirtualKeyCode: 46,
    //       });

    //       await sendMessage(
    //         'debugger:type',
    //         { commands: backspaceCommands, tabId: block.activeTabId, delay: 0 },
    //         'background'
    //       );
    //     }

    //     const commands = data.value.split('').map((char) => ({
    //       type: 'keyDown',
    //       text: char === '\n' ? '\r' : char,
    //     }));
    //     const typeDelay = +block.data.delay;
    //     await sendMessage(
    //       'debugger:type',
    //       {
    //         commands,
    //         tabId: block.activeTabId,
    //         delay: Number.isNaN(typeDelay) ? 0 : typeDelay,
    //       },
    //       'background'
    //     );
    //   } finally {
    //     synchronizedLock.releaseLock();
    //   }
    //   return;
    // }

    markElement(element, block);
    await handleFormElement(element, data);
  };

  if (data.multiple) {
    const promises = Array.from(elements).map((element) => typeText(element));

    await Promise.allSettled(promises);
  } else {
    await typeText(elements);
  }

  return null;
}

export default forms;
