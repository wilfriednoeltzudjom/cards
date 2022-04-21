import styled from 'styled-components';

import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';

export default styled.div`
  > main {
    max-height: calc(100vh - 12.5rem);
    overflow-y: auto;
    scroll-padding: 1rem;
    scroll-behavior: smooth;
    margin: 2.5rem 0 0 0;
    padding: 2rem;
    border: 2px dashed ${colors.white};
    border-radius: ${dimensions.defaults.radius};
    display: flex;
    align-items: center;

    > section {
      display: flex;
      flex-direction: column;

      > div {
        :not(:last-child) {
          margin-bottom: 2rem;
        }
      }
    }

    > div {
      flex: 1;
      margin-left: 5rem;
    }
  }
`;
