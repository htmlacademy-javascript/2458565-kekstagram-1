import { showFullPicture } from './full-picture.js';

const previewTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const previewsContainer = document.querySelector('.pictures');
const picturesList = document.createDocumentFragment();

const getPreview = (preview) => {
  preview.forEach(({url, comments, likes, description}) => {
    const clonedPreviewTemplate = previewTemplate.cloneNode(true);
    clonedPreviewTemplate.querySelector('.picture__img').src = url;
    clonedPreviewTemplate.querySelector('.picture__comments').textContent = comments.length;
    clonedPreviewTemplate.querySelector('.picture__likes').textContent = likes;
    picturesList.append(clonedPreviewTemplate);

    clonedPreviewTemplate.addEventListener('click', () => {
      showFullPicture({url, comments, likes, description});
    });
  });
  previewsContainer.append(picturesList);
};

export { getPreview };


