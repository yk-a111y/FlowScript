(() => {
  // 添加一个页面元素
  const testDiv = document.createElement('div');
  testDiv.style.cssText = `
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  background: red;
  color: white;
  z-index: 999999;
  `;
  testDiv.textContent = 'Content script is running1';
  document.body.appendChild(testDiv);
})();
