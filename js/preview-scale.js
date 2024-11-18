import { imgForm, imgPreview } from './preview-effects.js';

const scaleInput = imgForm.querySelector('.scale__control--value');
const zoomOutButton = imgForm.querySelector('.scale__control--smaller');
const zoomInButton = imgForm.querySelector('.scale__control--bigger');
const SCALE_MAXVALUE = 100;
const SCALE_MINVALUE = 0;

const getScaleInputValue = () => parseFloat(scaleInput.value);

const resizeImage = () => {
  const value = getScaleInputValue();
  const scale = value / 100;
  imgPreview.style.transform = `scale(${scale})`;
};

zoomInButton.addEventListener('click', () => {
  let value = getScaleInputValue();

  if (value < SCALE_MAXVALUE) {
    value = Math.min(value + 25, SCALE_MAXVALUE);
    scaleInput.value = `${value}%`;
    resizeImage();
  }
});

zoomOutButton.addEventListener('click', () => {
  let value = getScaleInputValue();

  if (value > SCALE_MINVALUE) {
    value = Math.max(value - 25, SCALE_MINVALUE);
    scaleInput.value = `${value}%`;
    resizeImage();
  }
});
