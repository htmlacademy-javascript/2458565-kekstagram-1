const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message, time = ALERT_SHOW_TIME) => {
  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, time);
};

const shuffleElements = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const correctDebounce = (cb, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutID;
  return (...rest) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showAlert, shuffleElements, correctDebounce };
