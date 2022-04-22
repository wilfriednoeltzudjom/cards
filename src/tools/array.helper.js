import _ from 'lodash';

function shuffle(array) {
  return _.shuffle(array);
}

function toArray(object) {
  return Object.values(object);
}

function moveElementPosition(elements, fromIndex, toIndex) {
  if (toIndex >= 0 && toIndex < elements.length) {
    const array = [...elements];
    const [element] = array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);

    return array;
  }

  return elements;
}

export default { shuffle, toArray, moveElementPosition };
