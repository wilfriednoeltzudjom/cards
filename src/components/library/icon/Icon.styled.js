import styled, { css } from 'styled-components';

import colors from '../../../config/colors';

export default styled.span`
  display: inline-block;
  font-size: ${getIconFontSize};

  ${({ clickable }) =>
    clickable &&
    css`
      transition: all 200ms ease-in-out;
      cursor: pointer;

      :hover {
        transform: scale(1.2);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${colors.disabled};
      cursor: not-allowed;
    `}
`;

function getIconFontSize({ size }) {
  return { sm: '1.25rem', md: '1.5rem', lg: '2rem', xl: '4rem', xxl: '8rem' }[size];
}
