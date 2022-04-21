import styled from 'styled-components';

export default styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > header {
    margin-bottom: 3.5rem;
  }

  > main {
    display: flex;
    flex-direction: column;

    > button:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;
