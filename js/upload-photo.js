import { imgPreview } from './upload-photo-effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
const uploadInput = document.querySelector('.img-upload__input');

const uploadPhoto = () => {
  imgPreview.src = '';
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((element) => fileName.endsWith(element));

  if (matches) {
    const uploadPhotoSRC = URL.createObjectURL(file);
    imgPreview.src = uploadPhotoSRC;
  }
};

export { uploadPhoto };
