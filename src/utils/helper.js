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

export { convertToObj };
