async function newTab(block) {
  return new Promise((resolve) => {
    console.log('🚀 ~ handlerNewtab');
    resolve({
      data: '',
      nextBlockId: this.getBlockConnections(block.id),
    });
  });
}

export default newTab;
