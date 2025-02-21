import browser from 'webextension-polyfill';
import { waitTabLoaded } from '../helper';

async function newTab({ id, data }) {
  if (this.windowId) {
    try {
      await browser.windows.get(this.windowId);
    } catch (error) {
      console.log(error);
      this.windowId = null;
    }
  }

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
  if (tab) {
    // if (this.settings.debugMode || data.customUserAgent) {
    //   await attachDebugger(tab.id, this.activeTab.id);
    //   this.debugAttached = true;

    //   if (data.customUserAgent && isChrome) {
    //     await sendDebugCommand(tab.id, 'Network.setUserAgentOverride', {
    //       userAgent: data.userAgent,
    //     });
    //     await browser.tabs.reload(tab.id);
    //     await sleep(1000);
    //   }
    // }

    // if (data.tabZoom && data.tabZoom !== 1) {
    //   await sleep(1000);
    //   await browser.tabs.setZoom(tab.id, data.tabZoom);
    // }

    this.activeTab.id = tab.id;
    this.windowId = tab.windowId;
  }

  this.activeTab.frameId = 0;

  if (data.waitTabLoaded) {
    await waitTabLoaded({
      tabId: this.activeTab.id,
      ms: this.settings?.tabLoadTimeout ?? 30000,
      listenError: true,
    });
  }

  await browser.windows.update(tab.windowId, { focused: true });

  return new Promise((resolve) => {
    resolve({
      data: '',
      nextBlockId: this.getBlockConnections(id),
    });
  });
}

export default newTab;
