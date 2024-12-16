import { imgPreview } from './upload-photo-effects.js';

const VALID_FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const uploadInput = document.querySelector('.img-upload__input');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const uploadPhoto = () => {
  imgPreview.src = '';
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = VALID_FILE_TYPES.some((element) => fileName.endsWith(element));

  if (matches) {
    const uploadPhotoSRC = URL.createObjectURL(file);
    imgPreview.src = uploadPhotoSRC;
    for (const effectPreview of effectsPreviews) {
      effectPreview.style.backgroundImage = `url(${uploadPhotoSRC})`;
    }
  }
};

export { uploadPhoto };
