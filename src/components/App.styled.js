import styled from 'styled-components';

import colors from '../config/colors';
import dimensions from '../config/dimensions';

export default styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  background: ${colors.background};
  background-size: cover;

  > main {
    flex: 1;
    position: relative;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 3rem 0;
  }

  > footer {
    position: absolute;
    bottom: 0;
    width: 100%;

    > div {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: ${dimensions.footer.minHeight};

      > section {
        :last-child {
          > * {
            :not(:last-child) {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
`;
