const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Methods = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorMessages = {
  GET_DATA: 'Данные не удалось загрузить. Попробуйте обновить страницу',
  SEND_DATA: 'Форма не отправлена. Повторите попытку',
};

const load = (route, error, method = Methods.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(error);
    });

const getData = () => load(Route.GET_DATA, ErrorMessages.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorMessages.SEND_DATA, Methods.POST, body);

export { getData, sendData };
