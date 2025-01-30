const modules = import.meta.glob('../content/blocksHandler/*.ts');

const handlers = Object.keys(modules).reduce((acc, key) => {
  const name = key.replace('../content/blocksHandler/', '').replace('.ts', '');
  const handler = name.replace('handle', '').replace('Event', '').toLowerCase();
  acc[handler] = modules[key];

  return acc;
}, {});

export default function () {
  return {
    ...handlers,
  };
}
