import { isXPath } from '@/utils/helper';
import FindElement from '@/utils/FindElement';

const markElement = (el, { id, data }) => {
  if (data.markEl) {
    el.setAttribute(`block--${id}`, '');
  }
};

const getDocumentCtx = (frameSelector) => {
  if (!frameSelector) return document;

  let documentCtx = document;

  const iframeSelectors = frameSelector.split('|>');
  const type = isXPath(frameSelector) ? 'xpath' : 'cssSelector';
  iframeSelectors.forEach((selector) => {
    if (!documentCtx) return;

    const element = FindElement[type]({ selector }, documentCtx);
    documentCtx = element?.contentDocument;
  });

  return documentCtx;
};

const queryElements = (data, documentCtx) => {
  return new Promise((resolve) => {
    let timeout = null;
    let isTimeout = false;

    const findSelector = () => {
      if (isTimeout) return;

      const selectorType = data.findBy || 'cssSelector';
      const elements = FindElement[selectorType](data, documentCtx);
      const isElNotFound = !elements || elements.length === 0;

      if (isElNotFound && data.waitForSelector) {
        setTimeout(findSelector, 200);
      } else {
        if (timeout) clearTimeout(timeout);
        resolve(elements);
      }
    };

    findSelector();

    if (data.waitForSelector) {
      timeout = setTimeout(() => {
        isTimeout = true;
        resolve(null);
      }, data.waitSelectorTimeout);
    }
  });
};

const handleSelector = async (
  { data, id, frameSelector, debugMode },
  { onSelected, onError, onSuccess, withDocument } = {}
) => {
  if (!data || !data.selector) {
    if (onError) onError(new Error('selector-empty'));
    return null;
  }

  const documentCtx = getDocumentCtx(frameSelector);
  if (!documentCtx) {
    if (onError) onError(new Error('iframe-not-found'));

    return null;
  }

  try {
    data.blockIdAttr = `block--${id}`;
    const elements = await queryElements(data, documentCtx);
    if (!elements || elements.length === 0) {
      if (onError) onError(new Error('element-not-found'));

      return null;
    }
    const elementsArr = data.multiple ? Array.from(elements) : [elements];

    await Promise.allSettled(
      elementsArr.map(async (el) => {
        markElement(el, { id, data });

        if (debugMode) {
          // const isInViewport = visibleInViewport(el);
          // if (!isInViewport) el.scrollIntoView();
        }

        if (onSelected) await onSelected(el);
      })
    );

    if (onSuccess) onSuccess();
    if (withDocument) {
      return {
        elements,
        document: documentCtx,
      };
    }

    return elements;
  } catch (error) {
    if (onError) onError(error);
    return null;
  }
};

export default handleSelector;
export { getDocumentCtx, markElement };
