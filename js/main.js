import { getData, sendData } from './api.js';
import { getPreview } from './previews.js';
import { setFormSubmit } from './form.js';
import { showAlert, correctDebounce } from './util.js';
import { showFilter, chooseFilter } from './filter.js';

const falseLoadTemplate = document.querySelector('#false-download')
  .content
  .querySelector('.false-download__message')
  .cloneNode(true);

getData()
  .then((data) => {
    getPreview(data);
    showFilter();
    chooseFilter(correctDebounce(
      () => getPreview(data)
    ));
  })
  .catch (() => {
    showAlert(falseLoadTemplate);
  });

setFormSubmit(sendData);
