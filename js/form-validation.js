import { imgFormOverLay } from './upload-photo-effects.js';

const HASHTAG_MAXQUANTITY = 5;
const HASHTAG__MINLENGTH = 2;
const HASHTAG__MAXLENGTH = 20;
const COMMENT_MAXLENGTH = 140;
const hashtagInput = imgFormOverLay.querySelector('.text__hashtags');
const commentInput = imgFormOverLay.querySelector('.text__description');

const ErrorMessages = {
  hashtagMinlength: 'хэш-тег не может состоять из одного символа',
  hashTagMaxlength: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
  hashtagMaxquantity: 'превышено максимально допустимое количество хэш-тегов',
  invalidFormat: 'Неверный формат хэш-тегов. Используйте символ решетки, числа и буквы',
  hashtagDuplicate: 'не используйте повторяющиеся хэш-теги',
  commentMaxLength: 'длина не более 140 символов',
};

const pristine = new Pristine(imgFormOverLay, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateHashtag = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter(Boolean);
  const uniqueHashtags = new Set(hashtags);
  const minLength = [...uniqueHashtags].some((hashtag) => hashtag.length < HASHTAG__MINLENGTH);
  const maxLength = [...uniqueHashtags].some((hashtag) => hashtag.length >= HASHTAG__MAXLENGTH);
  const maxQuantity = uniqueHashtags.size > HASHTAG_MAXQUANTITY;
  const format = /^#[a-zа-яё0-9]{1,19}$/i;
  const invalidFormat = [...uniqueHashtags].some((hashtag) => !format.test(hashtag));
  const duplicate = uniqueHashtags.size !== hashtags.length;

  const Errors = {
    minLength,
    maxLength,
    maxQuantity,
    invalidFormat,
    duplicate
  };

  return {
    isValid: !(minLength || maxLength || maxQuantity || invalidFormat || duplicate),
    Errors
  };
};

const getErrorMessage = (value) => {
  const result = validateHashtag(value);
  if (result.Errors.minLength) {
    return ErrorMessages.hashtagMinlength;
  } else if (result.Errors.maxLength) {
    return ErrorMessages.hashTagMaxlength;
  } else if (result.Errors.maxQuantity) {
    return ErrorMessages.hashtagMaxquantity;
  } else if (result.Errors.invalidFormat) {
    return ErrorMessages.invalidFormat;
  } else if (result.Errors.duplicate) {
    return ErrorMessages.hashtagDuplicate;
  }
};

const validateComment = (comment) => {
  if (comment.length > COMMENT_MAXLENGTH) {
    return false;
  }
  return true;
};

pristine.addValidator(
  hashtagInput,
  (value) => {
    const result = validateHashtag(value);
    return result.isValid;
  },
  getErrorMessage,
);

pristine.addValidator(
  commentInput,
  validateComment,
  ErrorMessages.commentMaxLength,
);

export { pristine, hashtagInput, commentInput };
