import browser from 'webextension-polyfill';

(() => {
  console.log('content script is running');

  browser.runtime.onMessage.addListener(async (data) => {
    console.log('🚀 ~ data:', data);
  });
})();
