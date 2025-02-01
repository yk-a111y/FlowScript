async function trigger(block) {
  return new Promise((resolve) => {
    console.log('🚀 ~ handleTrigger');
    resolve({
      data: '',
      nextBlockId: this.getBlockConnections(block.id),
    });
  });
}

export default trigger;
