import browser from 'webextension-polyfill';

class BackgroundUtils {
  static async openDashboard(url: string, updateTab: boolean = true) {
    const tabUrl = browser.runtime.getURL(
      `/dashboard/index.html#${typeof url === 'string' ? url : ''}`
    );

    try {
      // check if tab is already open
      const [tab] = await browser.tabs.query({
        url: browser.runtime.getURL('dashboard/index.html'),
      });
      if (tab) {
        const tabOptions = { active: true, url: '' };
        if (updateTab) tabOptions.url = tabUrl;

        // update tab
        await browser.tabs.update(tab.id, tabOptions);

        if (updateTab) {
          await browser.windows.update(tab.windowId, {
            focused: true, // focus window
            state: 'maximized', // maximize window
          });
        }
      } else {
        const curWin = await browser.windows.getCurrent();
        console.log('🚀 ~ BackgroundUtils ~ openDashboard ~ curWin:', curWin);
        const windowOptions = {
          top: 0,
          left: 0,
          width: curWin.width,
          height: curWin.height,
          url: tabUrl,
          type: 'popup',
        };
        // create new window
        await browser.windows.create(windowOptions);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default BackgroundUtils;
