import { isEscapeKey } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const imgForm = document.querySelector('.img-upload__overlay');
const resetButton = imgForm.querySelector('#upload-cancel');
const hashtagInput = imgForm.querySelector('.text__hashtags');
const HASHTAG_MAXQUANTITY = 5;
const COMMENT_MAXLENGTH = 140;

uploadFile.addEventListener('change', () => {
  imgForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  const uniqueHashtags = new Set(hashtags);

  if (uniqueHashtags.size > hashtags.length) {
    return false;
  }

  if (hashtags.length === 1 && hashtags[0].length === 1) {
    return false;
  }

  if (hashtags.length > HASHTAG_MAXQUANTITY) {
    return false;
  }

  for (const hashtag of uniqueHashtags) {
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)) {
      hashtagInput.classList.add('input--invalid');
      return false;
    }
  }

  return [...uniqueHashtags].join(' ');
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  'Хэштеги могут содержать только буквы и цифры. Используйте не более 5 хэштегов'
);

const commentInput = imgForm.querySelector('.text__description');
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
  pristine.validate();
  evt.preventDefault();
  evt.stopPropagation();
});

resetButton.addEventListener('click', () => {
  imgForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    imgForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFile.value = '';
    hashtagInput.value = '';
    commentInput.value = '';
  }
});

const stopEvent = (element) => {
  element.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
};

stopEvent(hashtagInput);
stopEvent(commentInput);

