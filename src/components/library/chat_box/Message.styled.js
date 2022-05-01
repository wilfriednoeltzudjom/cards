import styled from 'styled-components';

import colors from '../../../config/colors';

export default styled.li`
  list-style-type: none;

  > header {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: ${colors.white};

    > span {
      color: #a4b7c8;

      :first-child {
        font-weight: 700;
        text-transform: lowercase;

        ::before {
          content: '@';
        }
      }

      :last-child {
        font-size: 0.9rem;
      }
    }
  }
`;
