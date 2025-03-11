const convertToObj = (array) =>
  array.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {});

const sleep = (ms = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

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

const parseJSON = (data, def = {}) => {
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

const isXPath = (str) => {
  const regex = /^([(/@]|id\()/;

  return regex.test(str);
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

const deepMerge = (target, obj) => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  const res = { ...target };

  Object.keys(obj).forEach((key) => {
    if (objectHasKey(obj, key)) {
      res[key] = deepMerge(target[key], obj[key]);
    }
  });

  return res;
}

const fileSaver = (filename, data, revokeBlobURL = false) => {
  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = data;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);

  anchor.click();

  setTimeout(() => {
    document.body.removeChild(anchor);
    // If it's a Blob URL, release it
    if (revokeBlobURL) URL.revokeObjectURL(data);
  }, 100);
};

const openFilePicker = (acceptedFileTypes = [], attrs = {}) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = Array.isArray(acceptedFileTypes) ? acceptedFileTypes.join(',') : acceptedFileTypes;

    Object.entries(attrs).forEach(([key, value]) => {
      input[key] = value;
    });

    input.onchange = (e) => {
      const { files } = e.target;
      const validFiles = [];

      Array.from(files).forEach((file) => {
        if (!acceptedFileTypes.includes(file.type)) return;
        validFiles.push(file);
      });

      resolve(validFiles);
    }

    input.click();
  })
}

export {
  convertToObj,
  sleep,
  debounce,
  findTriggerBlock,
  parseJSON,
  objectHasKey,
  isObject,
  toCamelCase,
  isXPath,
  deepMerge,
  fileSaver,
  openFilePicker,
};
