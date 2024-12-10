import { imgFormOverLay, imgPreview } from './upload-photo-effects.js';

const SCALE_MAXVALUE = 100;
const SCALE_MINVALUE = 0;
const scaleInput = imgFormOverLay.querySelector('.scale__control--value');
const zoomOutButtonElem = imgFormOverLay.querySelector('.scale__control--smaller');
const zoomInButtonElem = imgFormOverLay.querySelector('.scale__control--bigger');
const originalScale = imgPreview.style.transform;

const getScaleInputValue = () => parseFloat(scaleInput.value);

const getOriginalScale = () => {
  scaleInput.value = `${SCALE_MAXVALUE}%`;
  scaleInput.getAttributeNode('value').value = `${SCALE_MAXVALUE}%`;
  imgPreview.style.transform = originalScale;
};

const resizeImage = () => {
  const newValue = getScaleInputValue();
  const scale = newValue / 100;

  scaleInput.getAttributeNode('value').value = `${newValue}%`;
  imgPreview.style.transform = `scale(${scale})`;
};

zoomInButtonElem.addEventListener('click', () => {
  let value = getScaleInputValue();

  if (value < SCALE_MAXVALUE) {
    value = Math.min(value + 25, SCALE_MAXVALUE);
    scaleInput.value = `${value}%`;
    resizeImage();
  }
});

zoomOutButtonElem.addEventListener('click', () => {
  let value = getScaleInputValue();

  if (value > SCALE_MINVALUE) {
    value = Math.max(value - 25, SCALE_MINVALUE);
    scaleInput.value = `${value}%`;
    resizeImage();
  }
});

export { getOriginalScale };
