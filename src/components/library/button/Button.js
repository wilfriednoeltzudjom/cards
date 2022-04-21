import React from 'react';
import PropTypes from 'prop-types';

import { childrenPropType } from '../../../utilities/prop-type-schemas';

import ButtonStyled from './Button.styled';

export function Button({ children, disabled = false, onClick }) {
  return (
    <ButtonStyled disabled={disabled} onClick={onClick}>
      <main>{children}</main>
    </ButtonStyled>
  );
}
Button.propTypes = {
  children: childrenPropType,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
