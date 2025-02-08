import browser from 'webextension-polyfill';

export const waitTabLoaded = ({ tabId, ms = 10000, listenError = false }) => {
  return new Promise((resolve, reject) => {
    let timeout = null;
    const excludeErrors = ['net::ERR_BLOCKED_BY_CLIENT', 'net::ERR_ABORTED'];

    const onErrorOccurred = (details) => {
      if (
        details.tabId !== tabId ||
        details.frameId !== 0 ||
        excludeErrors.includes(details.error)
      )
        return;

      clearTimeout(timeout);
      browser.webNavigation.onErrorOccurred.removeListener(onErrorOccurred);
      reject(new Error(details.error));
    };

    if (ms > 0) {
      timeout = setTimeout(() => {
        browser.webNavigation.onErrorOccurred.removeListener(onErrorOccurred);
        reject(new Error('Timeout'));
      }, ms);
    }

    // if (listenError && BROWSER_TYPE === 'chrome')
    browser.webNavigation.onErrorOccurred.addListener(onErrorOccurred);

    const activeTabStatus = () => {
      browser.tabs.get(tabId).then((tab) => {
        if (!tab) {
          reject(new Error('no-tab'));
          return;
        }

        if (tab.status === 'loading') {
          setTimeout(() => {
            activeTabStatus();
          }, 1000);
          return;
        }

        clearTimeout(timeout);

        browser.webNavigation.onErrorOccurred.removeListener(onErrorOccurred);
        resolve(tab);
      });
    };

    activeTabStatus();
  });
};
