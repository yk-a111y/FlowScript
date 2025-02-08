async function interaction(block) {
  // await checkAccess(block.label);
  // const debugMode =
  //   (block.data.settings?.debugMode ?? false) && !this.settings.debugMode;
  // const isChrome = BROWSER_TYPE === 'chrome';
  try {
    const data = await this._sendMessageToTab(block, {
      frameId: this.activeTab.frameId || 0,
    });

    return {
      data,
      nextBlockId: this.getBlockConnections(block.id),
    };
  } catch (error) {
    error.data = {
      name: block.label,
      selector: block.data.selector,
    };

    throw error;
  }
}

export default interaction;
