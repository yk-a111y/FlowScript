import browser from 'webextension-polyfill';

async function newTab({ id, data }) {
  console.log('🚀 ~ newTab ~ data:', data, id);

  let tab = null;

  if (data.updatePrevTab && this.activeTab.id) {
    tab = await browser.tabs.update(this.activeTab.id, {
      url: data.url,
      active: data.active,
    });
  } else {
    tab = await browser.tabs.create({
      url: data.url,
      active: data.active,
      windowId: this.windowId,
    });
  }

  this.activeTab.url = data.url;

  await browser.windows.update(tab.windowId, { focused: true });

  return new Promise((resolve) => {
    console.log('🚀 ~ handlerNewtab');
    resolve({
      data: '',
      nextBlockId: this.getBlockConnections(id),
    });
  });
}

export default newTab;
