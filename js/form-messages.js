import { isEscapeKey } from './util.js';

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);
const successMessageButton = successMessage.querySelector('.success__button');
const errorMessageButton = errorMessage.querySelector('.error__button');

const closeMessage = (element, message) => {
  element.addEventListener('click', () => {
    message.remove();
  });
  element.removeEventListener('click', closeMessage);
};

const onClickRemover = (element, message) => {
  element.addEventListener('click', (evt) => {
    if (evt.target === element) {
      message.remove();
    }
    element.removeEventListener('click', onClickRemover);
  });
};

const onEscClickRemover = (message) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
    }
  });
};

const showSuccessMessage = () => {
  document.body.append(successMessage);
  closeMessage(successMessageButton, successMessage);
  onClickRemover(successMessage, successMessage);
  onEscClickRemover(successMessage);
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
  closeMessage(errorMessageButton, errorMessage);
  onClickRemover(errorMessage, errorMessage);
  onEscClickRemover(errorMessage);
};

export { showSuccessMessage, showErrorMessage, closeMessage };
