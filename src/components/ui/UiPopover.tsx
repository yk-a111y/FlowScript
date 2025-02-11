import { cn } from '@/lib/utils';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import tippy, { Instance, Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

interface PopoverProps extends PropsWithChildren {
  // 基础属性
  placement?: Props['placement'];
  trigger?: Props['trigger'];
  padding?: string;
  to?: string | HTMLElement;
  options?: Partial<Props>;
  disabled?: boolean;
  triggerWidth?: boolean;
  modelValue?: boolean;
  triggerClass?: string;

  renderTrigger: (props: { isShow: boolean }) => React.ReactNode;

  // 事件处理
  onShow?: (instance: Instance) => void;
  onClose?: () => void;
  onTrigger?: () => void;
  onChange?: (value: boolean) => void;
}

const UiPopover: React.FC<PopoverProps> = ({
  placement = 'bottom',
  trigger = 'click',
  padding = 'p-4',
  to,
  options = {},
  disabled = false,
  triggerWidth = false,
  modelValue = false,
  triggerClass,
  children,
  renderTrigger,
  onShow,
  onClose,
  onTrigger,
  onChange,
}) => {
  // refs
  const targetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance | null>(null);

  // state
  const [isShow, setIsShow] = useState(false);

  // 初始化 tippy 实例
  useEffect(() => {
    if (!targetRef.current || !contentRef.current) return;

    const target = to
      ? typeof to === 'string'
        ? document.querySelector(to)
        : to
      : targetRef.current;

    tippyInstance.current = tippy(target, {
      role: 'popover',
      theme: null,
      content: contentRef.current,
      placement,
      trigger,
      interactive: true,
      appendTo: () => document.body,
      onShow: (instance) => {
        if (triggerWidth) {
          const rect = instance.reference.getBoundingClientRect();
          instance.popper.style.width = `${rect.width}px`;
        }
        setIsShow(true);
        onShow?.(instance);
      },
      onHide: () => {
        setIsShow(false);
        onChange?.(false);
        onClose?.();
      },
      onTrigger: () => onTrigger?.(),
      ...options,
    });

    return () => {
      tippyInstance.current?.destroy();
    };
  }, []);

  // 监听 options 变化
  useEffect(() => {
    tippyInstance.current?.setProps(options);
  }, [options]);

  // 监听 disabled 状态
  useEffect(() => {
    if (!tippyInstance.current) return;

    if (disabled) {
      tippyInstance.current.hide();
      tippyInstance.current.disable();
    } else {
      tippyInstance.current.enable();
    }
  }, [disabled]);

  // 监听 modelValue 变化
  useEffect(() => {
    if (!tippyInstance.current || modelValue === isShow) return;

    if (modelValue) {
      tippyInstance.current.show();
    } else {
      tippyInstance.current.hide();
    }
  }, [modelValue]);

  return (
    <div className={cn('ui-popover inline-block', { hidden: to })}>
      <div
        ref={targetRef}
        className={cn('ui-popover__trigger inline-block h-full', triggerClass)}
      >
        {renderTrigger({ isShow })}
      </div>
      <div
        ref={contentRef}
        className={cn(
          'ui-popover__content rounded-lg border bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800',
          padding
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default UiPopover;
