import browser from 'webextension-polyfill';

const hotReloadClientInit = () => {
  const bgWs = new WebSocket(`ws://127.0.0.1:${UP_PORT}`)

  let isAlive = true
  bgWs.addEventListener('message', (e) => {
    if (e.data === 'UPDATE_BG') {
      bgWs.close()
      setTimeout(() => {
        // browser.runtime.reload()
      }, 500)
    } else if (e.data === 'UPDATE_CONTENT_SCRIPT') {
      reloadContent()
    } else if (e.data === 'heartbeatMonitor') {
      isAlive = true
      const interval = setInterval(() => {
        setTimeout(() => {
          if (!isAlive) {
            const detectWs = new WebSocket(`ws://127.0.0.1:${UP_PORT}`)
            detectWs.onopen = () => {
              detectWs.close()
              clearInterval(interval)
              hotReloadClientInit()
            }
          }
        }, 500)
      }, 3000)
    } else if (e.data === 'heartbeat') {
      isAlive = true
      setTimeout(() => {
        isAlive = false
      }, 2500)
    }
  })

  // browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //   if (request.message === 'reload_background_from_content' && !isAlive) {
  //     hotReloadClientInit()
  //   }
  //   sendResponse(true)
  // })

  const reloadContent = () => {
    browser.tabs.query({}, async (tabs) => {
      const currentTab = tabs.find((tab) => tab.active)
      if (!currentTab || currentTab.url.indexOf('chrome') === 0) {
        return
      }
      const tabId = currentTab.id
      await browser.scripting.executeScript({
        target: { tabId },
        files: ['./contentScript/index.js']
      })
    })
  }
}

hotReloadClientInit()