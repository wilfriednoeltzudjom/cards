import styled, { keyframes } from 'styled-components';

import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';
import { fontSizes, fontWeights } from '../../../config/sizes';

const cardAnimation = keyframes`
  from {
    opacity: 0.5;
    transform: scale(1.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export default styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  min-height: ${dimensions.platform.minHeight};
  align-items: center;
  border: 2px dashed ${colors.white};
  border-radius: ${dimensions.defaults.radius};
  background: ${colors.gray};
  padding: 2rem;

  > main {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      position: absolute;
      opacity: 0.5;
      transform: scale(1.5);
      animation: ${cardAnimation} 300ms forwards;

      &.rotate {
        opacity: 0.8;
        animation: none;
        transform: rotate(25deg);
      }
    }
  }

  > aside {
    width: 30%;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > span {
      display: flex;
      justify-content: center;
      font-size: ${fontSizes.md};
      font-weight: ${fontWeights.extra};
      align-items: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: ${colors.primary};
      color: ${colors.white};
    }

    > section {
      margin-top: 1rem;
    }

    > div {
      margin-top: 1rem;
    }
  }
`;
