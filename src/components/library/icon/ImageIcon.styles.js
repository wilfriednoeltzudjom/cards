import styled from 'styled-components';

import colors from '../../../config/colors';

export function styleImageIcon(UnStyledImageIcon) {
  return styled(UnStyledImageIcon)`
    path {
      fill: ${getBackgroundColor};
    }
  `;
}

function getBackgroundColor({ colorScheme }) {
  return colors[colorScheme];
}

export function getWidth({ size }) {
  return { sm: 18, md: 24, lg: 48, xl: 96 }[size];
}

export function getHeight({ size }) {
  return { sm: 18, md: 24, lg: 48, xl: 96 }[size];
}
