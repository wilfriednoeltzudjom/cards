import styled, { keyframes } from 'styled-components';

import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';
import { fontSizes } from '../../../config/sizes';

export const ripple = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

export default styled.button`
  position: relative;
  display: inline-block;
  font-size: ${fontSizes.md};
  color: ${colors.white};
  font-weight: 800;
  border: none;
  border-radius: ${dimensions.radius.default};
  background: ${colors.primaryLight};
  padding: 1.25rem 3rem;
  overflow: hidden;
  transition: all 100ms ease-in-out;
  cursor: pointer;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 89%;
    background: ${colors.primary};
    border-radius: ${dimensions.radius.default};
    transition: all 100ms ease-in-out;
  }

  > main {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    > .icon {
      margin-right: 0.5rem;
    }
  }

  :disabled {
    color: #545454;
    cursor: not-allowed;

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${colors.disabled};
      border-radius: ${dimensions.radius.default};
    }
  }

  :hover {
    :not(:disabled) {
      box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.1);

      ::before {
        height: 98%;
      }
    }
  }

  > span {
    &.ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ${ripple} 500ms linear;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  &.action {
    padding: 1rem;

    > main {
      > .icon {
        margin-right: 0;
      }
    }
  }
`;
