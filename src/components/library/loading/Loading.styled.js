import styled, { css, keyframes } from 'styled-components';

import colors from '../../../config/colors';
import zIndices from '../../../config/z-indices';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  from {
    width: 0.1rem;
    height: 0.1rem;
    opacity: 1;
    transform: translate3d(0);
  }
  to {
    width: 3rem;
    height: 3rem;
    opacity: 0.2;
    transform: translate3d(0, -1rem, 0);
  }
`;

export default styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: ${colors.white};
  opacity: 0;
  z-index: ${zIndices.loading};

  ${({ shown }) =>
    shown &&
    css`
      display: block;
      animation: ${fadeIn} 500ms forwards;
      animation-delay: 200ms;
    `}

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        background: ${colors.white};
        border-radius: 50%;
        margin: 5rem 0.5rem;
        animation: ${bounce} 0.6s infinite alternate;

        :nth-child(2) {
          animation-delay: 0.2s;
        }

        :nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }
`;
