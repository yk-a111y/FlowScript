async function forms(block) {
  return new Promise((resolve) => {
    console.log('🚀 ~ forms');
    resolve({
      data: '',
      nextBlockId: this.getBlockConnections(block.id),
    });
  });
}

export default forms;
