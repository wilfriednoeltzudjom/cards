import styled from 'styled-components';

import colors from '../../../config/colors';

export default styled.div`
  padding-top: 0.5rem;

  > main {
    position: relative;
    display: flex;

    > span {
      :first-child {
        position: absolute;
        left: 0;
        top: -0.5rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${colors.white};
        color: ${colors.black};
      }

      :last-child {
        margin-left: 3rem;
      }
    }
  }
`;
