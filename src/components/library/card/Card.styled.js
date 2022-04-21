import styled, { css } from 'styled-components';

import dimensions from '../../../config/dimensions';
import { isValidValue } from '../../../utilities/data-validation.helper';

export default styled.div`
  display: inline-block;

  > svg {
    display: inline-block;
    border-radius: ${getBorderRadius};
  }

  ${({ shadowed }) =>
    shadowed &&
    css`
      filter: drop-shadow(0 0 10px rgba(124, 124, 124, 0.5));
    `}

  ${({ index }) =>
    isValidValue(index) &&
    css`
      position: absolute;
      left: ${getLeft};
      top: 0;
    `}

  ${({ selectable }) =>
    selectable &&
    css`
      cursor: pointer;
      transition: all 200ms ease-in-out;

      :hover {
        z-index: 2;
        transform: scale(1.1);
        filter: drop-shadow(0 0 20px rgba(124, 124, 124, 0.5));
      }
    `}
`;

function getBorderRadius({ size }) {
  return { sm: '4px', md: '4px' }[size] || dimensions.defaults.radius;
}

function getLeft({ index }) {
  return `${index * 1.25}rem`;
}
