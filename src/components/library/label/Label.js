import React from 'react';

import { childrenPropType } from '../../../utilities/prop-type-schemas';

import LabelStyled from './Label.styled';

export function Label({ children }) {
  return <LabelStyled>{children}</LabelStyled>;
}
Label.propTypes = {
  children: childrenPropType,
};
