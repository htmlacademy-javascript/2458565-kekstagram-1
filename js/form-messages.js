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

let escapeHandler;

const handleCloseButtonClick = (element, message) => {
  const clickHandler = () => {
    if (message) {
      message.remove();
    }
    element.removeEventListener('click', clickHandler);
    document.removeEventListener('keydown', escapeHandler);
  };
  element.addEventListener('click', clickHandler);
};

const handleEscapeButtonClick = (message) => {
  escapeHandler = (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
      document.removeEventListener('keydown', escapeHandler);
      escapeHandler = null;
    }
  };
  document.addEventListener('keydown', escapeHandler);
};

const handleOutsideElementClick = (element, message) => {
  const clickHandler = (evt) => {
    if (evt.target === element) {
      message.remove();
    }
    element.removeEventListener('click', clickHandler);
    document.removeEventListener('keydown', escapeHandler);
  };
  element.addEventListener('click', clickHandler);
};

const showSuccessMessage = () => {
  document.body.append(successMessageTemplate);
  handleCloseButtonClick(successMessageButtonElem, successMessageTemplate);
  handleOutsideElementClick(successMessageTemplate, successMessageTemplate);
  handleEscapeButtonClick(successMessageTemplate);
};

const showErrorMessage = () => {
  document.body.append(errorMessageTemplate);
  handleCloseButtonClick(errorMessageButtonElem, errorMessageTemplate);
  handleOutsideElementClick(errorMessageTemplate, errorMessageTemplate);
  handleEscapeButtonClick(errorMessageTemplate);
};

export { showSuccessMessage, showErrorMessage, errorMessageTemplate };
