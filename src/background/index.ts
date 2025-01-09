console.log('background');

chrome.runtime.onInstalled.addListener(() => {
  console.log('background onInstalled');
});
