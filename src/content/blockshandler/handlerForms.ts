async function forms(block) {
  const { data } = block;
  const elements = await handleSelector(block, { returnElement: true });

  if (!elements) {
    throw new Error('element-not-found');
  }

  if (data.getValue) {
    let result = '';

    if (data.multiple) {
      result = elements.map((element) => element.value || '');
    } else {
      result = elements.value || '';
    }

    return result;
  }

  const typeText = async (element) => {
    if (block.debugMode && data.type === 'text-field') {
      return;
    }

    markElement(element, block);
    await handleFormElement(element, data);
  };

  if (data.multiple) {
    const promises = Array.from(elements).map((element) => typeText(element));

    await Promise.allSettled(promises);
  } else {
    await typeText(elements);
  }

  return null;
}

export default forms;
