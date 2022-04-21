import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Clover } from '../../../assets/shapes/clover.svg';
import { ReactComponent as Diamond } from '../../../assets/shapes/diamond.svg';
import { ReactComponent as Heart } from '../../../assets/shapes/heart.svg';
import { ReactComponent as Spade } from '../../../assets/shapes/spade.svg';
import { sizePropType } from '../../../utilities/prop-type-schemas';
import ShapeStyled from './Shape.styled';

const shapesComponents = {
  clover: Clover,
  diamond: Diamond,
  heart: Heart,
  spade: Spade,
};

export function Shape({ name, size, animated = false, clickable = false, onClick }) {
  const props = { animated, clickable };
  const ShapeComponent = shapesComponents[name.toLowerCase()];

  function handleClick() {
    if (onClick) onClick(name);
  }

  return (
    <ShapeStyled {...props} onClick={handleClick}>
      {ShapeComponent ? <ShapeComponent width={getWidth({ size })} height={getHeight({ size })} /> : <></>}
    </ShapeStyled>
  );
}
Shape.propTypes = {
  name: PropTypes.string.isRequired,
  size: sizePropType,
  animated: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
};

function getWidth({ size }) {
  return { sm: 100, md: 200, lg: 300, xl: 400, xxl: 500 }[size];
}

function getHeight({ size }) {
  return { sm: 100, md: 200, lg: 300, xl: 400, xxl: 500 }[size];
}
