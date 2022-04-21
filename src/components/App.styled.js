import styled from 'styled-components';

import colors from '../config/colors';

export default styled.div`
  max-width: 1400px;
  min-height: 100vh;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
  background: ${colors.background};
`;
