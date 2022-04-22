import styled from 'styled-components';
import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';

export default styled.div`
  > main {
    display: flex;
    margin: 3.5rem 0 2.5rem 0;
    padding: 2rem 2rem 3.5rem 2rem;
    border: 2px dashed ${colors.white};
    border-radius: ${dimensions.defaults.radius};

    > div {
      position: relative;

      :not(:last-child) {
        margin-right: 2rem;
      }

      > button {
        position: absolute;
        left: 50%;
        bottom: -1.75rem;
        transform: translateX(-50%);
      }
    }

    > aside {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }

  > footer {
    display: flex;
    justify-content: center;
  }
`;
