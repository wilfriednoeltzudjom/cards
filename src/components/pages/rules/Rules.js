import React from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTE_STARTUP } from '../../../routes';

import { Button, Icon, Rule } from '../../library';
import RulesStyled from './Rules.styled';

const RULES = [
  `You can start a game by clicking on the &laquo;new game&raquo; button and then setting up the players. At least one &laquo;automated player&raquo; and one &laquo;manual player&raquo; (actual player) are needed (only one manual one is allowed for this version).`,
  `The game consist of a set of a total of <b>54</b> cards, <b>4</b> shapes (CLOVER, SPADE, DIAMOND, HEART) and <b>2</b> colors (RED, BLACK) <br /> - 10 cards from <b>A</b> (as 1) to <b>10</b> for each shape <br /> - 3 cards <b>J</b> (JACK), <b>Q</b> (QUEEN), <b>K</b> (KING) for each shape <br /> - 1 card <b>JOKER</b> for each color`,
  `The goal is to empty the cards you possess by playing them one at a time when they can be played.`,
  `Special cards` +
    `<br /> - <b>Effect cards</b> will apply some effect to the game <br /> &nbsp;&nbsp;- <b>A</b> will stop the next player for one round <br /> &nbsp;&nbsp;- <b>10</b> will change the players order <br /> &nbsp;&nbsp;- <b>J</b> &laquo;can always be played&raquo; and will give you the possibility to choose the next played card shape` +
    `<br /> - <b>Penalty cards</b> will make the next player take some additional cards unless he also play a penalty card in which case, the penalty will be cumulated until the effect is gone (applied on a player) <br /> &nbsp;&nbsp;- <b>7</b> will make the next player take <b>2</b> additional cards <br /> &nbsp;&nbsp;- <b>JOKER</b> will make the next player take <b>4</b> additional cards`,
  `At start, a default card will be set as the active one. In general, you can play a card if &laquo;it's the same shape or value as the active one&raquo; but there are some special cases <br /> - Both <b>J</b> and <b>JOKER</b> can always be played <br /> - If the active card is <b>J</b>, only another <b>J</b>, a <b>JOKER</b> or a card with the chosen shape can be played <br /> - If the active card is <b>JOKER</b> and the penalty effect is gone, only a card of the same color can be played`,
  `The game end when there is only one player that have not emptied its cards`,
];

export default function Rules() {
  const history = useHistory();

  function handleBack() {
    history.push(ROUTE_STARTUP);
  }

  return (
    <RulesStyled>
      <header>
        <Button icon={<Icon name="arrow-back" />} onClick={handleBack}>
          Back
        </Button>
      </header>
      <main>
        {RULES.map((rule, index) => (
          <Rule key={index} position={index + 1} content={rule} />
        ))}
      </main>
    </RulesStyled>
  );
}
