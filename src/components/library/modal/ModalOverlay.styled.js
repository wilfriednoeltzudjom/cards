import styled, { keyframes } from 'styled-components';

import zIndices from '../../../config/z-indices';

const hideAnimation = keyframes`
  to {
    z-index: ${zIndices.hide};
  }
`;

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: ${getBackground};

  &.initial {
    animation: ${hideAnimation} 300ms forwards;
  }

  &.shown {
    z-index: ${zIndices.overlay};
  }

  &.hidden {
    animation: ${hideAnimation} 300ms forwards;
  }
`;

function getBackground({ showOverlay }) {
  return showOverlay ? 'rgba(0, 0, 0, 0.38)' : 'none';
}
