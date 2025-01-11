// import db from './db';
(() => {
  console.log('background');
  chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('Active tab ID:', activeInfo.tabId);
  });
})();
