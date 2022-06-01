import styled from 'styled-components';

import colors from '../../../../config/colors';
import dimensions from '../../../../config/dimensions';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: center;
  margin: 2rem auto;
  padding: 2rem;
  border: 2px dashed ${colors.white};
  border-radius: ${dimensions.defaults.radius};
  background: ${colors.primaryLight};

  > * {
    :first-child {
      margin-bottom: 1rem;
    }
  }

  label {
    min-width: 11rem;
  }
`;
