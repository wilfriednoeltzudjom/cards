import React from 'react';
import PropTypes from 'prop-types';

import InputStyled from './Input.styled';

export function Input({ type = 'text', onChange, onBlur, ...restOfProps }) {
  function handleChange({ target }) {
    if (onChange) onChange(target);
  }

  function handleBlur({ target }) {
    if (onBlur) onBlur(target);
  }

  return <InputStyled type={type} onChange={handleChange} onBlur={handleBlur} {...restOfProps} />;
}
Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
