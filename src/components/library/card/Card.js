import React from 'react';
import PropTypes from 'prop-types';

import { cardSizes } from '../../../config/sizes';
import { cardPropType, sizePropType } from '../../../utilities/prop-type-schemas';

import CardStyled from './Card.styled';
import CardIcon from './CardIcon';

export function Card({ className, card, size = 'md', shadowed = true, index, selectable = false, onSelect }) {
  const props = { className, card, size, index, shadowed, selectable };

  return (
    <CardStyled {...props} onClick={onSelect}>
      <CardIcon card={card} width={cardSizes.width[size]} height={cardSizes.height[size]} />
    </CardStyled>
  );
}
Card.propTypes = {
  className: PropTypes.string,
  card: cardPropType.isRequired,
  size: sizePropType,
  shadowed: PropTypes.bool,
  index: PropTypes.number,
  selectable: PropTypes.bool,
  onSelect: PropTypes.func,
};
