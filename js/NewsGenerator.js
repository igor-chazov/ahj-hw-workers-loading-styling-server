const faker = require('faker');

faker.locale = 'ru';

class NewsGenerator {
  constructor() {
    this.news = [];
  }

  generate() {
    this.news = [];

    for (let i = 1; i <= 7; i += 1) {
      const news = {
        id: faker.datatype.uuid(),
        image: NewsGenerator.generateImage(),
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        created: Date.now(),
      };

      this.news.push(news);
    }
  }

  static generateImage() {
    const imageSize = Math.floor(Math.random() * (120 - 100)) + 100;
    const imageType = Math.floor(Math.random() * 4) + 1;
    const imageFrom = {
      1: 'nature',
      2: 'arch',
      3: 'tech',
      4: 'people',
    };

    return `https://placeimg.com/${imageSize}/${imageSize}/${imageFrom[imageType]}`;
  }
}

module.exports = NewsGenerator;
