import ReactDOM from 'react-dom';

const body = document.querySelector('body');

export function Portal({ children }) {
  return ReactDOM.createPortal(children, body);
}
