import styled from 'styled-components';

export default styled.div`
  > main {
    margin: 3.5rem 0 2.5rem 0;

    > div {
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
`;
