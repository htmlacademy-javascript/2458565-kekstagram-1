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

let totalComments = 0;

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

const showComments = (comments) => {
  comments.forEach((comment, index) => {
    const newCommentElement = buildComment(comment);
    if (index >= MAX_COMMENTS_PER_PAGE) {
      newCommentElement.classList.add('visually-hidden');
    } else {
      newCommentElement.classList.remove('visually-hidden');
    }
    commentsContainer.append(newCommentElement);
  });
};

const closeFullPicture = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureModal.classList.add('hidden');
    document.removeEventListener('keydown', closeFullPicture);
  }
};

const showFullPicture = (photo) => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeFullPicture);

  totalComments = photo.comments.length;
  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = totalComments;
  photoDescription.textContent = photo.description;

  if (photo.comments.length < MAX_COMMENTS_PER_PAGE) {
    commentsLoaderButton.classList.add('hidden');
    socialCommentsCount.textContent = `${totalComments} из ${totalComments} комментариев`;
  } else {
    commentsLoaderButton.classList.remove('hidden');
    socialCommentsCount.textContent = `${MAX_COMMENTS_PER_PAGE} из ${totalComments} комментариев`;
  }

  commentsContainer.innerHTML = '';
  showComments(photo.comments);
};

commentsLoaderButton.addEventListener('click', () => {
  const hiddenComments = bigPictureModal.querySelectorAll('.social__comment.visually-hidden');
  const commentsToShow = Math.min(hiddenComments.length, MAX_COMMENTS_PER_PAGE);

  if (commentsToShow > 0) {
    for (let i = 0; i < commentsToShow; i++) {
      hiddenComments[i].classList.remove('visually-hidden');
    }
  }

  const displayedComments = commentsContainer.querySelectorAll('.social__comment:not(.visually-hidden)');
  socialCommentsCount.textContent = `${displayedComments.length} из ${totalComments} комментариев`;

  if (displayedComments.length === totalComments) {
    commentsLoaderButton.classList.add('hidden');
  }
});

bigPictureCloseButtonElem.addEventListener('click', () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFullPicture);
});

export { showFullPicture };
