import styled from 'styled-components';

import colors from '../../../../config/colors';
import dimensions from '../../../../config/dimensions';
import { fontSizes, fontWeights } from '../../../../config/sizes';

export default styled.section`
  > main {
    display: flex;
    justify-content: center;

    > div {
      position: relative;

      > input {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;

        :checked {
          + label {
            background: ${colors.white};
            color: ${colors.black};
            font-weight: ${fontWeights.bold};
          }
        }
      }

      > label {
        display: inline-block;
        border-radius: ${dimensions.defaults.radius};
        border: 1px solid ${colors.white};
        padding: 1rem 1.5rem;
        font-size: ${fontSizes.md};
        text-transform: capitalize;
        transition: all 200ms ease-in-out;
        cursor: pointer;
      }

      :not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
`;
