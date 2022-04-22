import styled, { keyframes } from 'styled-components';

import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';
import { fontSizes, fontWeights } from '../../../config/sizes';

const entryAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-5rem);
  }
  to {
    opacity: 1;
    transform: translate(0rem);
  }
`;

export default styled.div`
  width: ${dimensions.playerEdition.width};
  background: ${colors.primaryLight};
  border: 2px solid ${colors.white};
  border-radius: ${dimensions.defaults.radius};
  color: ${colors.black};
  font-size: ${fontSizes.md};
  font-weight: ${fontWeights.extra};
  opacity: 0;
  transform: translateX(-5rem);
  animation: ${entryAnimation} 500ms forwards;

  > header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;

    ::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 2px;
      background: ${colors.white};
    }

    > section {
      display: flex;
      align-items: center;

      > span {
        margin-right: 0.25rem;
      }

      :last-child {
        ::before {
          content: '#';
        }
      }
    }
  }

  > main {
    padding: 0.75rem 1rem;

    > input {
      display: inline-block;
      width: 100%;
      border: 2px solid #e2e4ec;
      border-radius: ${dimensions.defaults.radius};
      padding: 0.75rem 1rem;
      font-size: ${fontSizes.md};
      font-weight: ${fontWeights.extra};
      transition: all 200ms ease-in-out;
      outline: none;

      :focus {
        border-color: ${colors.primary};
      }
    }
  }

  > footer {
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
  }
`;
