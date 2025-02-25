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

export const automaRefDataStr = (varName) => {
  return `
function findData(obj, path) {
  const paths = path.split('.');
  const isWhitespace = paths.length === 1 && !/\\S/.test(paths[0]);

  if (path.startsWith('$last') && Array.isArray(obj)) {
    paths[0] = obj.length - 1;
  }

  if (paths.length === 0 || isWhitespace) return obj;
  else if (paths.length === 1) return obj[paths[0]];

  let result = obj;

  for (let i = 0; i < paths.length; i++) {
    if (result[paths[i]] == undefined) {
      return undefined;
    } else {
      result = result[paths[i]];
    }
  }

  return result;
}
function automaRefData(keyword, path = '') {
  const data = ${varName}[keyword];

  if (!data) return;

  return findData(data, path);
}
  `;
};
