import { isEscapeKey } from './util.js';
import { imgForm, imgPreview,getSliderVisibility } from './preview-effects.js';
import './preview-scale.js';

const uploadFile = document.querySelector('#upload-file');
const resetButton = imgForm.querySelector('#upload-cancel');
const hashtagInput = imgForm.querySelector('.text__hashtags');
const commentInput = imgForm.querySelector('.text__description');
const HASHTAG_MAXQUANTITY = 5;
const HASHTAG__MINLENGTH = 2;
const HASHTAG__MAXLENGTH = 20;
const COMMENT_MAXLENGTH = 140;

uploadFile.addEventListener('change', () => {
  imgForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateHashtag = (value) => {
  const hashtags = value.split(' ').filter(Boolean);
  const uniqueHashtags = new Set(hashtags);
  const minLength = [...uniqueHashtags].some((hashtag) => hashtag.length < HASHTAG__MINLENGTH);
  const maxLength = [...uniqueHashtags].some((hashtag) => hashtag.length > HASHTAG__MAXLENGTH);
  const maxQuantity = uniqueHashtags.size > HASHTAG_MAXQUANTITY;
  const format = /^#[a-zа-яё0-9]{1,19}$/i;
  const invalidFormat = [...uniqueHashtags].some((hashtag) => !format.test(hashtag));
  const duplicate = uniqueHashtags.size !== hashtags.length;

  const errors = {
    minLength,
    maxLength,
    maxQuantity,
    invalidFormat,
    duplicate
  };

  return {
    isValid: !(minLength || maxLength || maxQuantity || invalidFormat || duplicate),
    errors
  };
};

const getErrorMessage = (errors) => {
  switch (true) {
    case errors.minLength:
      return 'хэш-тег не может состоять из одного символа';
    case errors.maxLength:
      return 'максимальная длина одного хэш-тега 20 символов, включая решётку';
    case errors.maxQuantity:
      return 'превышено максимально допустимое количество хэш-тегов';
    case errors.invalidFormat:
      return 'Неверный формат хэш-тегов. Используйте символ решетки, числа и буквы, регистр не важен';
    case errors.duplicate:
      return 'не используйте повторяющиеся хэш-теги';
    default:
      return '';
  }
};

pristine.addValidator(
  hashtagInput,
  (value) => {
    const validationResult = validateHashtag(value);
    return validationResult.isValid;
  },
  (value) => {
    const validationResult = validateHashtag(value);
    return getErrorMessage(validationResult.errors);
  });

const validateComment = (comment) => {
  if (!comment) {
    return false;
  }

  if (comment.length >= COMMENT_MAXLENGTH) {
    return false;
  }
  return true;
};

pristine.addValidator(
  commentInput,
  validateComment,
  'длина не более 140 символов'
);

imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  pristine.validate();
});

const resetform = () => {
  imgPreview.className = 'img-upload__preview';
  uploadFile.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  getSliderVisibility('none');
};

resetButton.addEventListener('click', () => {
  imgForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetform();
});


document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    imgForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    resetform();
  }
});

const stopEvent = (element) => {
  element.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

stopEvent(hashtagInput);
stopEvent(commentInput);

export { imgForm, imgPreview };
