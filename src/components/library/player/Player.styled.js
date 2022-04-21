import styled, { css, keyframes } from 'styled-components';

import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';
import { cardSizes, fontSizes, fontWeights } from '../../../config/sizes';

const activeAnimation = keyframes`
  0% {
    outline-width: 0.25rem;
  }
  50% {
    outline-width: 0.5rem;
  }
  100% {
    outline-width: 0.25rem;
  }
`;

const prizeAnimation = keyframes`
  0% {
    transform: translateX(-50%) translateY(-50%) scale(0);
  }
  50% {
    transform: translateX(-50%) translateY(-50%) scale(1.5);
  }
  100% {
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
`;

export default styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  outline: 0.25rem solid ${colors.white};
  border-radius: ${dimensions.defaults.radius};
  background: ${colors.gray};
  position: relative;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${fontSizes.md};
    font-weight: ${fontWeights.extra};

    > section {
      :first-child {
        color: ${colors.black};
        display: flex;
        align-items: center;

        > span {
          margin-left: 0.25rem;
        }
      }

      :last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: ${colors.primary};
        color: ${colors.white};
      }
    }
  }

  > main {
    position: relative;
    margin: 1rem 0 0 0;
    min-height: ${`${cardSizes.height.md}px`};
  }

  > footer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) scale(0);
    z-index: 3;
    animation: ${prizeAnimation} 1s forwards;

    > .icon {
      color: ${getIconColor};
    }

    > span:not(.icon) {
      position: absolute;
      left: 50%;
      top: 25%;
      transform: translateX(-50%);
    }
  }

  ${({ playing }) =>
    playing
      ? css`
          outline-color: ${colors.green};
          animation: ${activeAnimation} 800ms linear infinite;
        `
      : css`
          ::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            border-radius: ${dimensions.defaults.radius};
            cursor: not-allowed;
            z-index: 2;
          }
        `}
`;

function getIconColor({ player }) {
  return player.ranking ? { 1: colors.gold, 2: colors.silver, 3: colors.bronze }[player.ranking] : colors.white;
}
