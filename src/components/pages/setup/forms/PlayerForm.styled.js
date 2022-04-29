import styled from 'styled-components';

import colors from '../../../../config/colors';
import dimensions from '../../../../config/dimensions';
import { fontSizes, fontWeights } from '../../../../config/sizes';

export default styled.section`
  > main {
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
`;
