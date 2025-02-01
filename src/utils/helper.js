const convertToObj = (array) =>
  array.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});

const debounce = (fn, delay = 200) => {
  let interval;
  return (...args) => {
    clearInterval(interval);

    return new Promise((resolve) => {
      interval = setTimeout(() => {
        resolve(fn(...args));
      }, delay);
    });
  };
};

const findTriggerBlock = (drawflow = {}) => {
  if (!drawflow) return null;

  if (drawflow.drawflow) {
    const blocks = Object.values(drawflow.drawflow?.Home?.data ?? {});
    if (!blocks) return null;

    return blocks.find(({ name }) => name === 'trigger');
  }
  if (drawflow.nodes) {
    return drawflow.nodes.find((node) => node.label === 'trigger');
  }

  return null;
}

const parseJSON = (data, def) => {
  try {
    const result = JSON.parse(data);

    return result;
  } catch (error) {
    return def;
  }
}

const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

const objectHasKey = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

const toCamelCase = (str, lowercase = true) => {
  const result = str.replace(/^[A-Z]/, letter =>
    lowercase ? letter.toLowerCase() : letter
  );

  return result
    .replace(/[A-Z]/g, letter =>
      `-${lowercase ? letter.toLowerCase() : letter}`
    )
    .replace(/^-/, '');
}

export { convertToObj, debounce, findTriggerBlock, parseJSON, objectHasKey, isObject, toCamelCase };
