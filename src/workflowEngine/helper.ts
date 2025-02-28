import browser from 'webextension-polyfill';
import { customAlphabet } from 'nanoid/non-secure';

export const messageSandbox = (type, data = {}) => {
  const nanoid = customAlphabet('1234567890abcdef', 5);

  return new Promise((resolve) => {
    const messageId = nanoid();

    const iframeEl = document.getElementById('sandbox');
    iframeEl.contentWindow.postMessage({ id: messageId, type, ...data }, '*');

    const messageListener = ({ data: messageData }) => {
      if (messageData?.type !== 'sandbox' || messageData?.id !== messageId)
        return;

      window.removeEventListener('message', messageListener);

      resolve(messageData.result);
    };

    window.addEventListener('message', messageListener);
  });
};

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

export const sendDebugCommand = (tabId, method, params = {}) => {
  return new Promise((resolve) => {
    chrome.debugger.sendCommand({ tabId }, method, params, resolve);
  });
};

export const checkCSPAndInject = async (
  { target, debugMode, options = {}, injectOptions = {} },
  callback
) => {
  // check is blocked by CSP
  const [isBlockedByCSP] = await browser.scripting.executeScript({
    target,
    func: () => {
      return new Promise((resolve) => {
        const escapePolicy = (script) => {
          if (window?.trustedTypes?.createPolicy) {
            const escapeElPolicy = window.trustedTypes.createPolicy(
              'forceInner',
              {
                createHTML: (to_escape) => to_escape,
                createScript: (to_escape) => to_escape,
              }
            );

            return escapeElPolicy.createScript(script);
          }

          return script;
        };
        const eventListener = ({ srcElement }) => {
          if (!srcElement || srcElement.id !== 'automa-csp') return;
          srcElement.remove();
          resolve(true);
        };

        document.addEventListener('securitypolicyviolation', eventListener);
        const script = document.createElement('script');
        script.id = 'automa-csp';
        script.innerText = escapePolicy('console.log("CSP check...")');

        setTimeout(() => {
          document.removeEventListener(
            'securitypolicyviolation',
            eventListener
          );
          script.remove();
          resolve(false);
        }, 500);

        document.body.appendChild(script);
      });
    },
    world: 'MAIN',
    ...(injectOptions || {}),
  });
  // console.log('🚀 ~ isBlockedByCSP:', isBlockedByCSP);

  if (isBlockedByCSP.result) {
    await new Promise((resolve) => {
      chrome.debugger.attach({ tabId: target.tabId }, '1.3', resolve);
    });

    const jsCode = await callback();
    const execResult = await sendDebugCommand(
      target.tabId,
      'Runtime.evaluate',
      {
        expression: jsCode,
        userGesture: true,
        awaitPromise: true,
        returnByValue: true,
        ...(options || {}),
      }
    );

    if (!debugMode) await chrome.debugger.detach({ tabId: target.tabId });

    if (!execResult || !execResult.result) {
      throw new Error('Unable execute code');
    }

    if (execResult.result.subtype === 'error') {
      throw new Error(execResult.result.description);
    }

    return {
      isBlocked: true,
      value: execResult.result.value || null,
    };
  }

  return { isBlocked: false, value: null };
};
