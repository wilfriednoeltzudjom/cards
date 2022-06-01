import styled from 'styled-components';
import colors from '../../../config/colors';

import dimensions from '../../../config/dimensions';

export default styled.div`
  display: flex;
  flex-direction: ${getFlexDirection};
  align-items: center;

  > label {
    margin-right: ${getFirstChildMarginRight};
    margin-bottom: ${getFirstChildMarginBottom};
    color: ${colors.black};
  }

  > input {
    width: ${dimensions.input.width.sm};
  }
`;

function getFlexDirection({ orientation }) {
  return { horizontal: 'row', vertical: 'column' }[orientation];
}

function getFirstChildMarginRight({ orientation }) {
  return { horizontal: '1rem', vertical: 0 }[orientation];
}

function getFirstChildMarginBottom({ orientation }) {
  return { horizontal: 0, vertical: '1rem' }[orientation];
}
