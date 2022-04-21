import { faker } from '@faker-js/faker';

function generatePlayerName() {
  return faker.name.firstName();
}

function generatePlayersNames({ count = 2 } = {}) {
  return Array(count).fill().map(generatePlayerName);
}

export default { generatePlayerName, generatePlayersNames };
