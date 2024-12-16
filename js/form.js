import { isEscapeKey, showAlert } from './util.js';
import { imgFormOverLay, imgPreview, getDefaultEffect, createSlider, destroySlider } from './upload-photo-effects.js';
import { pristine, hashtagInput, commentInput } from './form-validation.js';
import { showErrorMessage, showSuccessMessage, errorMessageTemplate } from './form-messages.js';
import { getOriginalScale } from './upload-photo-scale.js';
import { uploadPhoto } from './upload-photo.js';

const LoadingMessages = {
  START: 'ПУБЛИКУЮ...',
  FINISH: 'ОПУБЛИКОВАТЬ',
};
const ALERT_SHOW_TIME = 2000;
const uploadFileInput = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const resetButtonElem = imgFormOverLay.querySelector('#upload-cancel');
const submitButtonElem = imgFormOverLay.querySelector('.img-upload__submit');
const loadPhotoTemplate = document.querySelector('#messages')
  .content
  .querySelector('.img-upload__message')
  .cloneNode(true);

const changeSubmitButton = (availability, text) => {
  submitButtonElem.disabled = availability;
  submitButtonElem.textContent = text;
};

const resetForm = () => {
  imgPreview.className = 'img-upload__preview';
  imgPreview.src = '';
  uploadFileInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  pristine.reset();
  getOriginalScale();
  getDefaultEffect();
};

const stopEvent = (element) => {
  element.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

const closeModal = () => {
  imgFormOverLay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  destroySlider();
};

const handleDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !document.body.contains(errorMessageTemplate)) {
    stopEvent(hashtagInput);
    stopEvent(commentInput);
    resetForm();
    closeModal();
    document.removeEventListener('keydown', handleDocumentKeydown);
  }
};

const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const isValid = pristine.validate();

    if (isValid) {
      changeSubmitButton(true, LoadingMessages.START);
      onSuccess(new FormData(form))
        .then(() => {
          closeModal();
          document.removeEventListener('keydown', handleDocumentKeydown);
          showSuccessMessage();
          resetForm();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(() => {
          changeSubmitButton(false, LoadingMessages.FINISH);
        });
    } else {
      showErrorMessage();
    }
  });
};

uploadFileInput.addEventListener('change', () => {
  showAlert(loadPhotoTemplate, ALERT_SHOW_TIME);
  createSlider();
  getDefaultEffect();
  setTimeout(() => {
    document.addEventListener('keydown', handleDocumentKeydown);
    imgFormOverLay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadPhoto();
  }, ALERT_SHOW_TIME);
});

resetButtonElem.addEventListener('click', () => {
  resetForm();
  closeModal();
  document.removeEventListener('keydown', handleDocumentKeydown);
});

export { setFormSubmit };
