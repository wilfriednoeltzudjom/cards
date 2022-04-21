import loadash from 'lodash';

function shuffle(array) {
  return loadash.shuffle(array);
}

function toArray(object) {
  return Object.values(object);
}

export default { shuffle, toArray };
