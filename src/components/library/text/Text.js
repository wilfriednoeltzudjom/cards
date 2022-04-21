import React from 'react';

import { childrenPropType, sizePropType, weightPropType } from '../../../utilities/prop-type-schemas';

import TextStyled from './Text.styled';

export function Text({ children, size = 'md', weight = 'normal' }) {
  const props = { size, weight };

  return <TextStyled {...props}>{children}</TextStyled>;
}
Text.propTypes = {
  children: childrenPropType,
  size: sizePropType,
  weight: weightPropType,
};
