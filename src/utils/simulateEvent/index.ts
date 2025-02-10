import { eventList } from '../shared';

const getEventObj = (eventName, options) => {
  const eventType = eventList.find(({ id }) => id === eventName)?.type ?? '';
  let event;

  switch (eventType) {
    case 'mouse-event':
      event = new MouseEvent(eventName, { ...options, view: window });
      break;
    case 'focus-event':
      event = new FocusEvent(eventName, { ...options, view: window });
      break;
    case 'touch-event':
      event = new TouchEvent(eventName, { ...options, view: window });
      break;
    case 'keyboard-event':
      event = new KeyboardEvent(eventName, { ...options, view: window });
      break;
    case 'wheel-event':
      event = new WheelEvent(eventName, { ...options, view: window });
      break;
    case 'input-event':
      event = new InputEvent(eventName, { ...options, view: window });
      break;
    default:
      event = new Event(eventName, { ...options, view: window });
  }

  return event;
};

const simulateEvent = (element, eventName, options) => {
  const event = getEventObj(eventName, options);
  const useNativeMethods = ['focus', 'submit', 'blur'];

  if (useNativeMethods.includes(eventName) && element[eventName]) {
    element[eventName]();
  } else {
    element.dispatchEvent(event);
  }
};

export default simulateEvent;
export { getEventObj };
