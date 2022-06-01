import React from 'react';
import PropTypes from 'prop-types';

import InputStyled from './Input.styled';

export function Input({ type = 'text', size = 'default', defaultValue, onChange, onBlur, ...restOfProps }) {
  function handleChange({ target }) {
    if (onChange) onChange(target);
  }

  function handleBlur({ target }) {
    if (onBlur) onBlur(target);
  }

  return <InputStyled type={type} size={size} defaultValue={defaultValue} onChange={handleChange} onBlur={handleBlur} {...restOfProps} />;
}
Input.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['default', 'sm']),
  defaultValue: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
