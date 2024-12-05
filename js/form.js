import { isEscapeKey } from './util.js';
import { imgFormOverLay, imgPreview, getDefaultEffect } from './preview-effects.js';
import { pristine, hashtagInput, commentInput } from './form-validation.js';
import { showErrorMessage, showSuccessMessage } from './form-messages.js';
import { getOriginalScale } from './preview-scale.js';

const uploadFileInput = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const resetButton = imgFormOverLay.querySelector('#upload-cancel');
const submitButton = imgFormOverLay.querySelector('.img-upload__submit');

uploadFileInput.addEventListener('change', () => {
  imgFormOverLay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  getDefaultEffect();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetform = () => {
  imgPreview.className = 'img-upload__preview';
  uploadFileInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  getOriginalScale();
  getDefaultEffect();
};

const closeModal = () => {
  imgFormOverLay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

resetButton.addEventListener('click', () => {
  closeModal();
  resetform();
});

const stopEvent = (element) => {
  element.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
    resetform();
    stopEvent(hashtagInput);
    stopEvent(commentInput);
  }
};

document.addEventListener('keydown', onDocumentKeydown);

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      onSuccess(new FormData(form))
        .then(() => {
          closeModal();
          showSuccessMessage();
          resetform();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    } else {
      showErrorMessage();
    }
  });
};

export { setFormSubmit };
