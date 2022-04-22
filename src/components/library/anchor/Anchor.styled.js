import styled from 'styled-components';

import colors from '../../../config/colors';

export default styled.a`
  display: inline-block;
  color: ${colors.white};
  text-decoration: underline;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }
`;
