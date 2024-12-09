import { showFullPicture } from './full-picture.js';
import { sortPhoto, filters } from'./filter.js';

const previewTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const previewsContainer = document.querySelector('.pictures');


const getPreview = (preview) => {
  const previewListFragment = document.createDocumentFragment();
  const previewElements = previewsContainer.querySelectorAll('.picture');
  const activeFilterButtonElem = filters.querySelector('.img-filters__button--active');
  const sortedPreview = sortPhoto(preview, activeFilterButtonElem.id);

  sortedPreview.forEach(({url, comments, likes, description}) => {
    const clonedPreviewTemplate = previewTemplate.cloneNode(true);
    clonedPreviewTemplate.querySelector('.picture__img').src = url;
    clonedPreviewTemplate.querySelector('.picture__comments').textContent = comments.length;
    clonedPreviewTemplate.querySelector('.picture__likes').textContent = likes;
    previewListFragment.append(clonedPreviewTemplate);

    clonedPreviewTemplate.addEventListener('click', () => {
      showFullPicture({url, comments, likes, description});
    });
  });

  previewElements.forEach((element) => element.remove());
  previewsContainer.append(previewListFragment);
};

export { getPreview };


