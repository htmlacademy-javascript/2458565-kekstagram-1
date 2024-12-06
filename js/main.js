import { getData, sendData } from './api.js';
import { getPreview } from './previews.js';
import { setFormSubmit } from './form.js';
import { showAlert, debounce } from './util.js';
import { showFilter, onFilterClick } from './filter.js';

const falseLoadTemplate = document.querySelector('#false-download')
  .content
  .querySelector('.false-download__message')
  .cloneNode(true);

getData()
  .then((data) => {
    getPreview(data);
    showFilter();
    onFilterClick(debounce(
      () => getPreview(data)
    ));
  })
  .catch (() => {
    showAlert(falseLoadTemplate);
  });

setFormSubmit(sendData);
