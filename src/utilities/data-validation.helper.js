import SHA512 from 'crypto-js/sha512';
import Base64 from 'crypto-js/enc-base64';
import { validate as validateUUID } from 'uuid';

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
  return isNullish(object) || (typeof object === 'object' && Object.keys(object).length === 0);
}

function isNonEmptyArray(array) {
  return Array.isArray(array) && array.length > 0;
}

function isNullishOrEmpty(value) {
  return (
    isNullish(value) ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'string' && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
}

function areObjectsEqual(source = {}, object = {}) {
  return createObjectHash(source) === createObjectHash(object);
}

function createObjectHash(object) {
  return Base64.stringify(SHA512(JSON.stringify(object)));
}

function isValidUUID(value) {
  return validateUUID(value);
}

export {
  isValidValue,
  isNullish,
  isNonEmptyObject,
  isNonEmptyString,
  isEmptyObject,
  isNonEmptyArray,
  isNullishOrEmpty,
  areObjectsEqual,
  isValidUUID,
};
