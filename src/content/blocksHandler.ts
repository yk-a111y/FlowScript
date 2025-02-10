import { toCamelCase } from '@/utils/helper';

const modules = import.meta.glob('./blocksHandler/*.ts', { eager: true });

const handlers = Object.keys(modules).reduce((acc, key) => {
  const name = key.replace(/^\.\/blocksHandler\/handler|Event\.ts$|\.ts$/g, '');
  acc[toCamelCase(name)] = modules[key].default;

  return acc;
}, {});

export default function () {
  return {
    ...handlers,
  };
}
