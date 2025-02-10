import simulateEvent from '@/utils/simulateEvent';

const eventClick = (block) => {
  const { data } = block;
  const { selector } = data;
  const element = document.querySelector(selector);
  console.log('🚀 ~ eventClick ~ element:', element);
  // simulateEvent(element, 'click', {
  //   bubbles: true,
  //   cancelable: true,
  // });
};

export default eventClick;
