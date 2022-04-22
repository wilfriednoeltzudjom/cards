import styled from 'styled-components';

import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';

export default styled.div`
  > main {
    position: relative;
    max-height: calc(100vh - 14rem);
    overflow-y: auto;
    scroll-padding: 1rem;
    margin: 2.5rem 0 0 0;
    border: 2px dashed ${colors.white};
    border-radius: ${dimensions.defaults.radius};

    > div {
      display: flex;
      align-items: center;
      padding: 2rem;

      > section {
        > div {
          :not(:last-child) {
            margin-bottom: 2rem;
          }
        }
      }

      > div {
        flex: 1;
        margin-left: 5rem;
        top: 2rem;
      }
    }
  }
`;
