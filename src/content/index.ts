import browser from 'webextension-polyfill';
import handleSelector from './handleSelector';
import showExecutedBlock from './showExecutedBlock';
import blocksHandler from './blocksHandler';

async function executeBlock(data) {
  const removeExecutedBlock = showExecutedBlock(data, data.executedBlockOnWeb);

  const handlers = blocksHandler();
  console.log('🚀 ~ executeBlock ~ handlers:', handlers);
  console.log('🚀 ~ executeBlock ~ data.name:', data.name);
  console.log('🚀 ~ executeBlock ~ data.label:', data.label);
  const handler = handlers[data.name || data.label];
  console.log('🚀 ~ executeBlock ~ handler:', handler);

  if (handler) {
    const result = await handler(data, { handleSelector });
    removeExecutedBlock();
    return result;
  }

  const error = new Error(`"${data.label}" doesn't have a handler`);
  console.error(error);

  throw error;
}

(() => {
  console.log('content script is running');

  browser.runtime.onMessage.addListener(async (data) => {
    console.log('🚀 ~ data:', data);
    const asyncExecuteBlock = async (block) => {
      try {
        const res = await executeBlock(block);
        return res;
      } catch (error) {
        console.error(error);
        // const elNotFound = error.message === 'element-not-found';
        // const isLoopItem = data.data?.selector?.includes('automa-loop');

        // if (!elNotFound || !isLoopItem) return Promise.reject(error);

        // const findLoopEl = data.loopEls.find(({ url }) =>
        //   window.location.href.includes(url)
        // );

        // const blockData = { ...data.data, ...findLoopEl, multiple: true };
        // const loopBlock = {
        //   ...data,
        //   onlyGenerate: true,
        //   data: blockData,
        // };

        // await blocksHandler().loopData(loopBlock);
        // return executeBlock(block);
      }
    };

    if (data.isBlock) {
      const res = await asyncExecuteBlock(data);
      return res;
    }
  });
})();
