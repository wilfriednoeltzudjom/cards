import React from 'react';
import PropTypes from 'prop-types';

import { cardSizes } from '../../../config/sizes';
import { cardPropType, sizePropType } from '../../../utilities/prop-type-schemas';

import CardStyled from './Card.styled';
import CardIcon from './CardIcon';

export function Card({ className, card, size = 'md', shadowed = true, covered = false, index, selectable = false, onSelect }) {
  const props = { className, card, size, index, shadowed, selectable, onSelect };

  function handleClick() {
    if (selectable && onSelect) onSelect();
  }

  return (
    <CardStyled {...props} onClick={handleClick}>
      <CardIcon card={card} covered={covered} width={cardSizes.width[size]} height={cardSizes.height[size]} />
    </CardStyled>
  );
}
Card.propTypes = {
  className: PropTypes.string,
  card: cardPropType.isRequired,
  size: sizePropType,
  shadowed: PropTypes.bool,
  covered: PropTypes.bool,
  index: PropTypes.number,
  selectable: PropTypes.bool,
  onSelect: PropTypes.func,
};
