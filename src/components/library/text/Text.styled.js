import styled from 'styled-components';

import colors from '../../../config/colors';
import { fontSizes, fontWeights } from '../../../config/sizes';

export default styled.span`
  display: inline-block;
  font-size: ${getFontSize};
  font-weight: ${getFontWeight};
  color: ${colors.white};
`;

function getFontSize({ size }) {
  return fontSizes[size];
}

function getFontWeight({ weight }) {
  return fontWeights[weight];
}
