import styled, { css, keyframes } from 'styled-components';

const animation = keyframes`
  0% {
    transform: scale(0.75);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.75);
    opacity: 0.5;
  }
`;

export default styled.div`
  ${({ animated }) =>
    animated &&
    css`
      animation: ${animation} 800ms linear infinite;
    `}

  ${({ clickable }) =>
    clickable &&
    css`
      transition: all 200ms ease-in-out;
      cursor: pointer;

      :hover {
        opacity: 0.5;
        transform: scale(1.25);
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.2));
      }
    `}
`;
