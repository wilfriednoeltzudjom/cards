function isNullish(value) {
  return [null, undefined].includes(value);
}

function isValidValue(value) {
  return !isNullish(value);
}

function isNonEmptyObject(value) {
  return isValidValue(value) && typeof value === 'object' && Object.keys(value).length > 0;
}

function isNonEmptyString(value) {
  return isValidValue(value) && typeof value === 'string' && value.length > 0;
}

function isEmptyObject(object) {
  return isNullish(object) || (isNonEmptyObject(object) && Object.keys(object).length === 0);
}

function isNonEmptyArray(array) {
  return Array.isArray(array) && array.length > 0;
}

export { isValidValue, isNullish, isNonEmptyObject, isNonEmptyString, isEmptyObject, isNonEmptyArray };
