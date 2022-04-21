import loadash from 'lodash';

function removeUndefinedProperties(object) {
  const clonedObject = loadash.cloneDeep(object);
  for (const property in object) {
    if (isNullish(clonedObject[property])) delete clonedObject[property];
  }

  return clonedObject;
}

function isNullish(value) {
  return [null, undefined].includes(value);
}

function cloneDeep(object) {
  return loadash.cloneDeep(object);
}

function isValidValue(value) {
  return !isNullish(value);
}

function capitalize(value) {
  return isValidValue(value) && typeof value === 'string' && value.length > 0
    ? value
        .charAt(0)
        .toUpperCase()
        .concat(value.length > 1 ? value.substring(1).toLowerCase() : '')
    : value;
}

export default { removeUndefinedProperties, cloneDeep, isValidValue, capitalize };
