import { isEscapeKey } from './util.js';

const MAX_COMMENTS_PER_PAGE = 5;
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureCloseButtonElem = bigPictureModal.querySelector('#picture-cancel');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const photoDescription = bigPictureModal.querySelector('.social__caption');
const socialCommentsCount = bigPictureModal.querySelector('.social__comment-count');
const commentsLoaderButton = bigPictureModal.querySelector('.social__comments-loader');
const commentsContainer = bigPictureModal.querySelector('.social__comments');

let commentIndex = 0;

const closeFullPicture = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    commentsContainer.innerHTML = '';
    commentIndex = 0;
    bigPictureModal.classList.add('hidden');
    document.removeEventListener('keydown', closeFullPicture);
  }
};

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

  return commentElement;
};

const showComments = (comments, totalComments) => {
  const commentsToShow = Math.min(MAX_COMMENTS_PER_PAGE, totalComments - commentIndex);

  for (let i = 0; i < commentsToShow; i++) {
    const newComment = buildComment(comments[commentIndex]);
    commentsContainer.append(newComment);
    commentIndex++;
  }

  socialCommentsCount.textContent = `${commentIndex} из ${totalComments} комментариев`;

  if (commentIndex >= comments.length) {
    socialCommentsCount.classList.add('hidden');
    commentsLoaderButton.classList.add('hidden');
  } else {
    socialCommentsCount.classList.remove('hidden');
    commentsLoaderButton.classList.remove('hidden');
  }
};

const showFullPicture = (photo) => {
  commentIndex = 0;
  commentsContainer.innerHTML = '';

  socialCommentsCount.textContent = `{MAX_COMMENTS_PER_PAGE} из ${photo.comments.length}`;
  showComments(photo.comments, photo.comments.length);

  bigPictureModal.classList.remove('hidden');

  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  photoDescription.textContent = photo.description;

  commentsLoaderButton.removeEventListener('click', showComments);
  commentsLoaderButton.addEventListener('click', () => showComments(photo.comments, photo.comments.length));

  document.addEventListener('keydown', closeFullPicture);
  document.body.classList.add('modal-open');
};

bigPictureCloseButtonElem.addEventListener('click', () => {
  commentIndex = 0;
  commentsContainer.innerHTML = '';
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

export { showFullPicture };
