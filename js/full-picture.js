import { isEscapeKey } from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureModal.querySelector('#picture-cancel');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const photoDescription = bigPictureModal.querySelector('.social__caption');
const socialCommentsCount = bigPictureModal.querySelector('.social__comment-count');
const commentsLoaderButton = bigPictureModal.querySelector('.social__comments-loader');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const MAX_COMMENTS_PER_PAGE = 5;
let currentCommentIndex = 0;

const buildComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentElement.append(commentImage);
  commentElement.append(commentText);
  commentsContainer.append(commentElement);
};

const showComments = (comments) => {
  const currentCommentsQuantity = comments.slice(currentCommentIndex, currentCommentIndex + MAX_COMMENTS_PER_PAGE);

  currentCommentsQuantity.forEach((comment) => buildComment(comment));

  currentCommentIndex += currentCommentsQuantity.length;

  if (currentCommentIndex < comments.length) {
    socialCommentsCount.classList.remove('hidden');
    commentsLoaderButton.classList.remove('hidden');
  } else {
    socialCommentsCount.classList.add('hidden');
    commentsLoaderButton.classList.add('hidden');
  }
};

const showFullPicture = (photo) => {
  bigPictureModal.classList.remove('hidden');

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;

  commentsContainer.innerHTML = '';
  currentCommentIndex = 0;
  showComments(photo.comments);

  commentsLoaderButton.addEventListener('click', () => showComments(photo.comments));

  document.body.classList.add('modal-open');
};

bigPictureCloseButton.addEventListener('click', () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    bigPictureModal.classList.add('hidden');
  }
});

export { showFullPicture };

