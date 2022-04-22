import htmlReactParser from 'html-react-parser';

function parseFromText(html) {
  return htmlReactParser(html);
}

export default { parseFromText };
