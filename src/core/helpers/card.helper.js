import { CARD_COLORS, CARD_SHAPES, CARD_VALUES } from '../enums';

function isCardSpecial(card) {
  return [CARD_VALUES.A, CARD_VALUES.SEVEN, CARD_VALUES.JACK, CARD_VALUES.TEN, CARD_VALUES.JOKER].includes(card.value);
}

function isEffectCard(card) {
  return [CARD_VALUES.A, CARD_VALUES.TEN].includes(card.value);
}

function setCardColor(card) {
  const color = {
    [CARD_SHAPES.CLOVER]: CARD_COLORS.BLACK,
    [CARD_SHAPES.SPADE]: CARD_COLORS.BLACK,
    [CARD_SHAPES.DIAMOND]: CARD_COLORS.RED,
    [CARD_SHAPES.HEART]: CARD_COLORS.RED,
  }[card.shape];
  if (color) card.color = color;
}

function filterPenaltyCards(cards, { ordered = false } = {}) {
  const penaltyCards = cards.filter(isPenaltyCard);

  return ordered && penaltyCards.length > 0
    ? penaltyCards.sort((prevCard, nexCard) => {
        if (prevCard.value === CARD_VALUES.SEVEN && nexCard.value === CARD_VALUES.JOKER) return -1;
        else if (prevCard.value === CARD_VALUES.JOKER && nexCard.value === CARD_VALUES.SEVEN) return 1;

        return 0;
      })
    : penaltyCards;
}

function isPenaltyCard(card) {
  return [CARD_VALUES.SEVEN, CARD_VALUES.JOKER].includes(card.value);
}

export default { isCardSpecial, setCardColor, filterPenaltyCards, isPenaltyCard, isEffectCard };
