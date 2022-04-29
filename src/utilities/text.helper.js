import removeAccents from 'remove-accents';

function capitalize(text) {
  return text[0].toUpperCase().concat(text.substr(1).toLowerCase());
}

export function sanitize(value) {
  return value ? removeAccents.remove(value).toLowerCase() : '';
}

export default { capitalize, sanitize };
