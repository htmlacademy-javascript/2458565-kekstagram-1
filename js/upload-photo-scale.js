import { imgFormOverLay, imgPreview } from './upload-photo-effects.js';

const DENOMINATOR = 100;
const SCALE_MAXVALUE = 100;
const SCALE_MINVALUE = 0;
const STEP_VALUE = 25;
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

const scaleImage = () => {
  const newValue = getScaleInputValue();
  const scale = newValue / DENOMINATOR;

  scaleInput.getAttributeNode('value').value = `${newValue}%`;
  imgPreview.style.transform = `scale(${scale})`;
};

zoomInButtonElem.addEventListener('click', () => {
  let value = getScaleInputValue();

  if (value < SCALE_MAXVALUE) {
    value = Math.min(value + STEP_VALUE, SCALE_MAXVALUE);
    scaleInput.value = `${value}%`;
    scaleImage();
  }
});

zoomOutButtonElem.addEventListener('click', () => {
  let value = getScaleInputValue();

  if (value > SCALE_MINVALUE) {
    value = Math.max(value - STEP_VALUE, SCALE_MINVALUE);
    scaleInput.value = `${value}%`;
    scaleImage();
  }
});

export { getOriginalScale };
