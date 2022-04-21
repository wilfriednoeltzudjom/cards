import React from 'react';
import PropTypes from 'prop-types';

import { CARD_SHAPES } from '../../../../core/enums';

import SelectShapeFormStyled from './SelectShapeForm.styled';
import { Shape } from '../../../library';

export function SelectShapeForm({ onSelectShape }) {
  function handleSelectShape(args) {
    if (onSelectShape) onSelectShape(args);
  }

  return (
    <SelectShapeFormStyled>
      {Object.values(CARD_SHAPES).map((shape) => (
        <Shape key={shape} name={shape} size="sm" clickable onClick={handleSelectShape} />
      ))}
    </SelectShapeFormStyled>
  );
}
SelectShapeForm.propTypes = {
  onSelectShape: PropTypes.func,
};
