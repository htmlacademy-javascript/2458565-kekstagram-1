import { shuffleElements } from './util.js';

const RANDOM_PHOTO_QUANTITY = 10;
const filters = document.querySelector('.img-filters');
const filterButtons = filters.querySelectorAll('.img-filters__button');
let activeFilterButton;
const FilterID = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const sortPhoto = (data, id) => {
  if (!data) {
    return [];
  }
  const dataCopy = data.slice();
  if (id === FilterID.random) {
    shuffleElements(dataCopy);
    const randomPhotoSet = dataCopy.slice(0, RANDOM_PHOTO_QUANTITY);
    return randomPhotoSet;
  } else if (id === FilterID.discussed) {
    return dataCopy.sort((a, b) => b.comments.length - a.comments.length);
  } else if (id === FilterID.default) {
    return dataCopy;
  }
};

const showFilter = () => filters.classList.remove('img-filters--inactive');

const onFilterClick = (cb) => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      activeFilterButton = filters.querySelector('.img-filters__button--active');
      activeFilterButton.classList.remove('img-filters__button--active');
      activeFilterButton = evt.target;
      evt.target.classList.add('img-filters__button--active');
      cb();
    });
  });
};

export { showFilter, sortPhoto, onFilterClick, filters };
