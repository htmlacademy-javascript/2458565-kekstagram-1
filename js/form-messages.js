import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success')
  .cloneNode(true);
const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error')
  .cloneNode(true);
const successMessageButtonElem = successMessageTemplate.querySelector('.success__button');
const errorMessageButtonElem = errorMessageTemplate.querySelector('.error__button');

const closeMessage = (element, message) => {
  element.addEventListener('click', () => {
    if (message) {
      message.remove();
    }
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
  document.body.append(successMessageTemplate);
  closeMessage(successMessageButtonElem, successMessageTemplate);
  onClickRemover(successMessageTemplate, successMessageTemplate);
  onEscClickRemover(successMessageTemplate);
};

const showErrorMessage = () => {
  document.body.append(errorMessageTemplate);
  closeMessage(errorMessageButtonElem, errorMessageTemplate);
  onClickRemover(errorMessageTemplate, errorMessageTemplate);
  onEscClickRemover(errorMessageTemplate);
};

export { showSuccessMessage, showErrorMessage, closeMessage };
