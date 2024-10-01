import { photos } from './photoGenerator.js';

const previewTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const previewsContainer = document.querySelector('.pictures');
const picturesList = document.createDocumentFragment();

photos.forEach(({url, comments, likes}) => {
  const clonedPreviewTemplate = previewTemplate.cloneNode(true);
  clonedPreviewTemplate.querySelector('.picture__img').src = url;
  clonedPreviewTemplate.querySelector('.picture__comments').textContent = comments.length;
  clonedPreviewTemplate.querySelector('.picture__likes').textContent = likes;
  picturesList.append(clonedPreviewTemplate);
});

previewsContainer.append(picturesList);
