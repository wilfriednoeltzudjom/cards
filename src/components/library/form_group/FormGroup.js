import React from 'react';
import PropTypes from 'prop-types';

import { childrenPropType } from '../../../utilities/prop-type-schemas';

import FormGroupStyled from './FormGroup.styled';

export function FormGroup({ orientation = 'horizontal', children }) {
  const props = { orientation };

  return <FormGroupStyled {...props}>{children}</FormGroupStyled>;
}
FormGroup.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  children: childrenPropType,
};
