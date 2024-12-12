const imgFormOverLay = document.querySelector('.img-upload__overlay');
const imgPreview = imgFormOverLay.querySelector('.img-upload__preview img');
const effectLevelField = imgFormOverLay.querySelector('.img-upload__effect-level');
const effectInput = imgFormOverLay.querySelector('.effect-level__value');
const effectsSliderContainer = imgFormOverLay.querySelector('.effect-level__slider');
const effectRadioButtons = imgFormOverLay.querySelectorAll('.effects__radio');
effectInput.value = 100;

const createSlider = () => {
  noUiSlider.create(effectsSliderContainer, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
};

const destroySlider = () => effectsSliderContainer.noUiSlider.destroy();

const getEffectOptions = (effect) => {
  switch (effect) {
    case 'chrome':
      return {
        range: {
          min: 0,
          max: 1,
        },
        filter: (value) => `grayscale(${value})`,
        step: 0.1,
      };
    case 'sepia':
      return {
        range: {
          min: 0,
          max: 1,
        },
        filter: (value) => `sepia(${value})`,
        step: 0.1,
      };
    case 'marvin':
      return {
        range: {
          min: 0,
          max: 100,
        },
        filter: (value) => `invert(${value}%)`,
        step: 1,
      };
    case 'phobos':
      return {
        range: {
          min: 0,
          max: 3,
        },
        filter: (value) => `blur(${value}px)`,
        step: 0.1,
      };
    case 'heat':
      return {
        range: {
          min: 1,
          max: 3,
        },
        filter: (value) => `brightness(${value})`,
        step: 1,
      };
    default:
      return null;
  }
};

const getFilterOptions = (effect) => {
  const options = getEffectOptions(effect);
  if (options) {
    effectsSliderContainer.noUiSlider.updateOptions({
      range: {
        min: options.range.min,
        max: options.range.max,
      },
      start: options.range.max,
      step: options.step,
    });

    effectsSliderContainer.noUiSlider.on('update', (values) => {
      const currentValue = values[0];

      imgPreview.style.filter = options.filter(currentValue);
      effectInput.value = currentValue;
      effectInput.getAttributeNode('value').value = currentValue;
    });
  }
};

const getSliderVisibility = (effect) => {
  if (effect === 'none') {
    imgPreview.style.filter = '';
    effectsSliderContainer.classList.add('hidden');
    effectLevelField.classList.add('hidden');
    effectInput.getAttributeNode('value').value = '';
  } else {
    effectsSliderContainer.classList.remove('hidden');
    effectLevelField.classList.remove('hidden');
    getFilterOptions(effect);
  }
};

const getDefaultEffect = () => {
  const originEffectRadio = document.querySelector('#effect-none');
  const originEffect = Array.from(effectRadioButtons).find((radio) =>
    radio.id === 'effect-none').value;

  originEffectRadio.checked = true;
  getSliderVisibility(originEffect);
};

for (const effectRadioButton of effectRadioButtons) {
  effectRadioButton.addEventListener('change', (evt) => {
    const value = evt.target.value;
    const effectClassName = `effects__preview--${value}`;

    imgPreview.classList.forEach((className) => {
      if (className.startsWith('effects__preview--')) {
        imgPreview.classList.remove(className);
      }
    });

    imgPreview.classList.add(effectClassName);
    getSliderVisibility(value);
  });
}

export { imgFormOverLay, imgPreview, getDefaultEffect, createSlider, destroySlider };
