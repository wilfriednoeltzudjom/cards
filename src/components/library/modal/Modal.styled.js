import styled, { keyframes } from 'styled-components';

import zIndices from '../../../config/z-indices';
import dimensions from '../../../config/dimensions';

const zoomIn = keyframes`
  0% {
    transform: scale(0)
  }
  50% {
    transform: scale(1.2);
    z-index: ${zIndices.modal}
  }
  100% {
    transform: scale(1);
    z-index: ${zIndices.modal}
  }
`;
const zoomOut = keyframes`
  from {
    transform: scale(1)
  }
  to {
    transform: scale(0);
    z-index: ${zIndices.hide}
  }
`;

export default styled.div`
  width: ${dimensions.modal.width};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  transform: scale(0);
  transform-origin: 50% 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${dimensions.defaults.radius};
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  padding: 1rem;

  &.shown {
    animation: ${zoomIn} 500ms forwards;
  }

  &.hidden {
    animation: ${zoomOut} 300ms forwards;
  }

  > header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  > main {
    padding: 1rem;
    display: flex;
  }
`;
