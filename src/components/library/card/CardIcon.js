import React from 'react';

import { CARD_VALUES } from '../../../core/enums';
import { cardPropType } from '../../../utilities/prop-type-schemas';

import { ReactComponent as CardCover } from '../../../assets/cards/card_cover.svg';
import { ReactComponent as AClover } from '../../../assets/cards/a_clover.svg';
import { ReactComponent as ADiamond } from '../../../assets/cards/a_diamond.svg';
import { ReactComponent as AHeart } from '../../../assets/cards/a_heart.svg';
import { ReactComponent as ASpade } from '../../../assets/cards/a_spade.svg';
import { ReactComponent as TwoClover } from '../../../assets/cards/two_clover.svg';
import { ReactComponent as TwoDiamond } from '../../../assets/cards/two_diamond.svg';
import { ReactComponent as TwoHeart } from '../../../assets/cards/two_heart.svg';
import { ReactComponent as TwoSpade } from '../../../assets/cards/two_spade.svg';
import { ReactComponent as ThreeClover } from '../../../assets/cards/three_clover.svg';
import { ReactComponent as ThreeDiamond } from '../../../assets/cards/three_diamond.svg';
import { ReactComponent as ThreeHeart } from '../../../assets/cards/three_heart.svg';
import { ReactComponent as ThreeSpade } from '../../../assets/cards/three_spade.svg';
import { ReactComponent as FourClover } from '../../../assets/cards/four_clover.svg';
import { ReactComponent as FourDiamond } from '../../../assets/cards/four_diamond.svg';
import { ReactComponent as FourHeart } from '../../../assets/cards/four_heart.svg';
import { ReactComponent as FourSpade } from '../../../assets/cards/four_spade.svg';
import { ReactComponent as FiveClover } from '../../../assets/cards/five_clover.svg';
import { ReactComponent as FiveDiamond } from '../../../assets/cards/five_diamond.svg';
import { ReactComponent as FiveHeart } from '../../../assets/cards/five_heart.svg';
import { ReactComponent as FiveSpade } from '../../../assets/cards/five_spade.svg';
import { ReactComponent as SixClover } from '../../../assets/cards/six_clover.svg';
import { ReactComponent as SixDiamond } from '../../../assets/cards/six_diamond.svg';
import { ReactComponent as SixHeart } from '../../../assets/cards/six_heart.svg';
import { ReactComponent as SixSpade } from '../../../assets/cards/six_spade.svg';
import { ReactComponent as SevenClover } from '../../../assets/cards/seven_clover.svg';
import { ReactComponent as SevenDiamond } from '../../../assets/cards/seven_diamond.svg';
import { ReactComponent as SevenHeart } from '../../../assets/cards/seven_heart.svg';
import { ReactComponent as SevenSpade } from '../../../assets/cards/seven_spade.svg';
import { ReactComponent as EightClover } from '../../../assets/cards/eight_clover.svg';
import { ReactComponent as EightDiamond } from '../../../assets/cards/eight_diamond.svg';
import { ReactComponent as EightHeart } from '../../../assets/cards/eight_heart.svg';
import { ReactComponent as EightSpade } from '../../../assets/cards/eight_spade.svg';
import { ReactComponent as NineClover } from '../../../assets/cards/nine_clover.svg';
import { ReactComponent as NineDiamond } from '../../../assets/cards/nine_diamond.svg';
import { ReactComponent as NineHeart } from '../../../assets/cards/nine_heart.svg';
import { ReactComponent as NineSpade } from '../../../assets/cards/nine_spade.svg';
import { ReactComponent as TenClover } from '../../../assets/cards/ten_clover.svg';
import { ReactComponent as TenDiamond } from '../../../assets/cards/ten_diamond.svg';
import { ReactComponent as TenHeart } from '../../../assets/cards/ten_heart.svg';
import { ReactComponent as TenSpade } from '../../../assets/cards/ten_spade.svg';
import { ReactComponent as JackClover } from '../../../assets/cards/jack_clover.svg';
import { ReactComponent as JackDiamond } from '../../../assets/cards/jack_diamond.svg';
import { ReactComponent as JackHeart } from '../../../assets/cards/jack_heart.svg';
import { ReactComponent as JackSpade } from '../../../assets/cards/jack_spade.svg';
import { ReactComponent as QueenClover } from '../../../assets/cards/queen_clover.svg';
import { ReactComponent as QueenDiamond } from '../../../assets/cards/queen_diamond.svg';
import { ReactComponent as QueenHeart } from '../../../assets/cards/queen_heart.svg';
import { ReactComponent as QueenSpade } from '../../../assets/cards/queen_spade.svg';
import { ReactComponent as KingClover } from '../../../assets/cards/king_clover.svg';
import { ReactComponent as KingDiamond } from '../../../assets/cards/king_diamond.svg';
import { ReactComponent as KingHeart } from '../../../assets/cards/king_heart.svg';
import { ReactComponent as KingSpade } from '../../../assets/cards/king_spade.svg';
import { ReactComponent as JokerRed } from '../../../assets/cards/joker_red.svg';
import { ReactComponent as JokerBlack } from '../../../assets/cards/joker_black.svg';

export const cardIconComponents = {
  a_clover: AClover,
  a_diamond: ADiamond,
  a_heart: AHeart,
  a_spade: ASpade,
  two_clover: TwoClover,
  two_diamond: TwoDiamond,
  two_heart: TwoHeart,
  two_spade: TwoSpade,
  three_clover: ThreeClover,
  three_diamond: ThreeDiamond,
  three_heart: ThreeHeart,
  three_spade: ThreeSpade,
  four_clover: FourClover,
  four_diamond: FourDiamond,
  four_heart: FourHeart,
  four_spade: FourSpade,
  five_clover: FiveClover,
  five_diamond: FiveDiamond,
  five_heart: FiveHeart,
  five_spade: FiveSpade,
  six_clover: SixClover,
  six_diamond: SixDiamond,
  six_heart: SixHeart,
  six_spade: SixSpade,
  seven_clover: SevenClover,
  seven_diamond: SevenDiamond,
  seven_heart: SevenHeart,
  seven_spade: SevenSpade,
  eight_clover: EightClover,
  eight_diamond: EightDiamond,
  eight_heart: EightHeart,
  eight_spade: EightSpade,
  nine_clover: NineClover,
  nine_diamond: NineDiamond,
  nine_heart: NineHeart,
  nine_spade: NineSpade,
  ten_clover: TenClover,
  ten_diamond: TenDiamond,
  ten_heart: TenHeart,
  ten_spade: TenSpade,
  jack_clover: JackClover,
  jack_diamond: JackDiamond,
  jack_heart: JackHeart,
  jack_spade: JackSpade,
  queen_clover: QueenClover,
  queen_diamond: QueenDiamond,
  queen_heart: QueenHeart,
  queen_spade: QueenSpade,
  king_clover: KingClover,
  king_diamond: KingDiamond,
  king_heart: KingHeart,
  king_spade: KingSpade,
  joker_red: JokerRed,
  joker_black: JokerBlack,
};

export default function CardIcon({ card, ...restOfProps }) {
  if (card.covered) return <CardCover {...restOfProps} />;

  const IconComponent = cardIconComponents[toIconComponentName(card)];

  return <IconComponent {...restOfProps} />;
}
CardIcon.propTypes = {
  card: cardPropType,
};

function toIconComponentName(card) {
  return String(formatCardValue(card.value))
    .concat('_')
    .concat(card.value === CARD_VALUES.JOKER ? card.color : card.shape)
    .toLowerCase();
}

function formatCardValue(value) {
  return {
    [CARD_VALUES.A]: 'A',
    [CARD_VALUES.TWO]: 'TWO',
    [CARD_VALUES.THREE]: 'THREE',
    [CARD_VALUES.FOUR]: 'FOUR',
    [CARD_VALUES.FIVE]: 'FIVE',
    [CARD_VALUES.SIX]: 'SIX',
    [CARD_VALUES.SEVEN]: 'SEVEN',
    [CARD_VALUES.EIGHT]: 'EIGHT',
    [CARD_VALUES.NINE]: 'NINE',
    [CARD_VALUES.TEN]: 'TEN',
    [CARD_VALUES.JACK]: 'JACK',
    [CARD_VALUES.QUEEN]: 'QUEEN',
    [CARD_VALUES.KING]: 'KING',
    [CARD_VALUES.JOKER]: 'JOKER',
  }[value];
}
