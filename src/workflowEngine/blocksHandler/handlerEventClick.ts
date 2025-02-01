function eventClick(block) {
  return new Promise((resolve) => {
    console.log('🚀 ~ eventClick');
    resolve({
      data: '',
      nextBlockId: this.getBlockConnections(block.id),
    });
  });
}

export default eventClick;
