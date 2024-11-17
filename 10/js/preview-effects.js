const imgForm = document.querySelector('.img-upload__overlay');
const imgPreview = imgForm.querySelector('.img-upload__preview img');
const effectInput = imgForm.querySelector('.effect-level__value');
const effectsSlider = imgForm.querySelector('.effect-level__slider');
const effectRadioButtons = imgForm.querySelectorAll('.effects__radio');
effectInput.value = 100;

noUiSlider.create(effectsSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

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
    effectsSlider.noUiSlider.updateOptions({
      range: {
        min: options.range.min,
        max: options.range.max,
      },
      start: options.range.max,
      step: options.step,
    });

    effectsSlider.noUiSlider.on('update', (values) => {
      const currentValue = values[0];
      imgPreview.style.filter = options.filter(currentValue);
      effectInput.value = currentValue;
    });
  }
};

const getSliderVisibility = (effect) => {
  if (effect === 'none') {
    imgPreview.style.filter = '';
    effectsSlider.classList.add('hidden');
  } else {
    effectsSlider.classList.remove('hidden');
    getFilterOptions(effect);
  }
};

const originEffect = Array.from(effectRadioButtons).find((radio) =>
  radio.checked).value;
getSliderVisibility(originEffect);

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

export { imgForm, imgPreview, getSliderVisibility };
