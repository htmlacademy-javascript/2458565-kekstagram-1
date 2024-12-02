import { getData, sendData } from './api.js';
import { getPreview } from './previews.js';
import { setFormSubmit } from './form.js';
import { showAlert } from './util.js';

getData()
  .then((data) => {
    getPreview(data);
  })
  .catch ((err) => {
    showAlert(err.message);
  });

setFormSubmit(sendData);
