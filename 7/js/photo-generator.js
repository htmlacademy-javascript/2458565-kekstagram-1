import { generatePositiveRandomInteger, getRandomElement } from './util.js';

const PHOTOS_ARRAY_MINLENGTH = 25;
const AVATAR_MINVALUE = 1;
const AVATAR_MAXVALUE = 6;
const LIKES_MINVALUE = 15;
const LIKES_MAXVALUE = 200;
const COMMENTS_MINVALUE = 0;
const COMMENTS_MAXVALUE = 10;
const COMMENTS_TEXT_MINVALUE = 1;
const COMMENTS_TEXT_MAXVALUE = 2;
const USER_NAMES = [
  'Ольга',
  'Иван',
  'Максим',
  'Виктория',
  'Анна'
];
const DESCRIPTIONS = [
  'Лучшие фотографии дикой природы',
  'Фото века: лучшие снимки всех времен по версии журнала Time',
  'море рисунок',
  'Машина для миллионера: самые популярные в России автомобили дороже $100 000',
  'Нежный маникюр c блестками: фото дизайнов на короткие ногти',
  'Instagram Logo Png - Бесплатные векторные изображения и PSD для скачивания'
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getMessage = (array) => {
  const count = generatePositiveRandomInteger(COMMENTS_TEXT_MINVALUE, COMMENTS_TEXT_MAXVALUE);
  const message = new Set;
  while (message.size < count) {
    message.add(getRandomElement(array));
  }

  return [...message].join(' ');
};

const generateComments = (_, index) => ({
  id: index,
  avatar: `img/avatar-${generatePositiveRandomInteger(AVATAR_MINVALUE, AVATAR_MAXVALUE)}.svg`,
  message: getMessage(COMMENTS),
  name: getRandomElement(USER_NAMES),
});

const generatePhoto = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: generatePositiveRandomInteger(LIKES_MINVALUE, LIKES_MAXVALUE),
  comments: Array.from({length: generatePositiveRandomInteger(COMMENTS_MINVALUE, COMMENTS_MAXVALUE)}, (commentIndex) => generateComments(_, commentIndex + 1))
});

const getPhotos = () => Array.from({length: PHOTOS_ARRAY_MINLENGTH}, generatePhoto);

export { getPhotos };
