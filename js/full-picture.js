import { isEscapeKey } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureModal.querySelector('#picture-cancel');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const photoDescription = bigPictureModal.querySelector('.social__caption');
const socialCommentsCount = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const commentsContainer = bigPictureModal.querySelector('.social__comments');


const showComments = (comment) => {
  comment.forEach(({avatar, message, name}) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = avatar;
    commentImage.alt = name;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;

    commentElement.append(commentImage);
    commentElement.append(commentText);
    commentsContainer.append(commentElement);
  });
};

const showFullPicture = (photo) => {
  bigPictureModal.classList.remove('hidden');
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;

  commentsContainer.innerHTML = '';
  showComments(photo.comments);

  document.classList.add('modal-open');
};

bigPictureCloseButton.addEventListener('click', () => {
  bigPictureModal.classList.add('hidden');
  document.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    bigPictureModal.classList.add('hidden');
  }
});

export { showFullPicture };

