import { PropsWithChildren } from 'react';
import UiIcon from '../ui/UiIcon';
import UiCard from '../ui/UiCard';

interface BlockBaseProps extends PropsWithChildren {
  id?: string;
}

const BlockBase = ({ children }: BlockBaseProps) => {
  return (
    <div className="block-base relative w-48">
      <div
        className="block-menu-container absolute top-0 hidden w-full"
        style={{ transform: 'translateY(-100%)' }}
      >
        <div className="pointer-events-none">
          <p
            title="Block id (click to copy)"
            className="block-menu pointer-events-auto text-overflow inline-block px-1 dark:text-gray-300"
            style={{ maxWidth: '96px', marginBottom: 0 }}
          >
            ✅ Copied
          </p>
        </div>
        <div className="block-menu inline-flex items-center dark:text-gray-300">
          <button title="Delete block">
            <UiIcon name="RiDeleteBinLine" />
          </button>
          <button title="Edit block">
            <UiIcon name="RiPencilLine" />
          </button>
          <button title="Block settings">
            <UiIcon name="RiSettings3Line" />
          </button>
          <button title="Run workflow from here">
            <UiIcon name="RiPlayLine" />
          </button>
        </div>
      </div>
      <UiCard className="block-base__content relative z-10">{children}</UiCard>
    </div>
  );
};

export default BlockBase;
