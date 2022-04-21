import styled from 'styled-components';

import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';
import { fontSizes } from '../../../config/sizes';

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
  }

  :disabled {
    color: #545454;

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
      box-shadow: 0 0 1rem 0 rgba(255, 255, 255, 0.1);

      ::before {
        height: 98%;
      }
    }
  }
`;
