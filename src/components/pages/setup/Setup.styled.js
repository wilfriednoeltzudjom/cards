import styled from 'styled-components';
import colors from '../../../config/colors';
import dimensions from '../../../config/dimensions';

export default styled.div`
  > main {
    display: flex;
    margin: 3.5rem 0 2.5rem 0;
    padding: 2rem;
    border: 2px dashed ${colors.white};
    border-radius: ${dimensions.defaults.radius};

    > div {
      :not(:last-child) {
        margin-right: 2rem;
      }
    }
  }

  > footer {
    display: flex;
    justify-content: center;
  }
`;
