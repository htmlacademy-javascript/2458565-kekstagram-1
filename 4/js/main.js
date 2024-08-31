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

const generatePositiveRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

const getRandomElement = (elements) => elements[generatePositiveRandomInteger(0, elements.length - 1)];

const getID = () => {
  let minIdNumber = 0;

  return function () {
    minIdNumber += 1;
    return minIdNumber;
  };
};

const commentsIdNumber = getID();

const generateComments = () => ({
  id: commentsIdNumber(),
  avatar: `img/avatar-${generatePositiveRandomInteger(1, 6)}.svg`,
  message: getRandomElement(COMMENTS),
  name: getRandomElement(USER_NAMES),
});

const generatePhoto = (number) => ({
  id: number,
  url: `photos/${number}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: generatePositiveRandomInteger(15, 200),
  comments: Array.from({length: generatePositiveRandomInteger(0, COMMENTS.length)}, generateComments)
});

const getPhotos = () => Array.from({length: 25}).reduce((accumulator, _, index) => {
  accumulator.push(generatePhoto(index + 1));
  return accumulator;
}, []);
getPhotos();
