"use strict";

const { getRandomInt, shuffle } = require(`../../utils`);
const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const getDate = () => {
  const threeMonthTimestamp = 7884000000;
  const currentTimestamp = new Date().getTime();
  return new Date(
    getRandomInt(currentTimestamp - threeMonthTimestamp, currentTimestamp)
  );
};

const getCategories = (count) => {
  const categories = CATEGORIES.slice();
  const result = [];
  for (let i = 0; i < count; i++) {
    const index = getRandomInt(0, categories.length - 1);
    result.push(...categories.splice(index, 1));
  }

  return result;
};

const generateOffers = (count) =>
  Array(count)
    .fill({})
    .map(() => ({
      category: getCategories(getRandomInt(1, CATEGORIES.length)),
      announce: shuffle(SENTENCES).slice(1, 5).join(` `),
      fullText: shuffle(SENTENCES)
        .slice(1, getRandomInt(2, SENTENCES.length - 1))
        .join(` `),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      createdDate: getDate(),
    }));

module.exports = {
  name: `--generate`,
  run(args) {
    try {
      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
      if (countOffer > 1000) {
        console.error(`Не больше 1000 публикаций`);
        process.exit(1);
      }
      const content = JSON.stringify(generateOffers(countOffer));
      fs.writeFile(FILE_NAME, content, (err) => {
        if (err) {
          return console.error(`Can't write data to file...`);
        }

        console.info(`Operation success. File created.`);
        process.exit(0);
      });
    } catch {
      console.error(`Can't generate data...`);
      process.exit(1);
    }
  },
};
