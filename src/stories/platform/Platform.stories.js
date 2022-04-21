import React from 'react';

import { Platform } from '../../components/library';
import { Game, Player } from '../../core/entities';
import { CARD_SHAPES, CARD_VALUES } from '../../core/enums';
import gameHelper from '../../core/helpers/game.helper';

export default {
  title: 'Cards/Platform',
  component: Platform,
};

const Template = (args) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Platform {...args} />
    </div>
  );
};

const players = Array(2)
  .fill()
  .map(() => Player.newInstance({}));
const game = Game.newInstance({
  cards: gameHelper.generateCardSet().filter((card) => [CARD_VALUES.EIGHT, CARD_VALUES.TEN].includes(card.value)),
  players,
  initialCardsPerPlayerCount: 2,
});
game.startGame();
game.play(game.players[0].cards[0], game.players[0]);

export const Default = Template.bind({});
Default.args = {
  game: {
    ...game.toJSON(),
    chosenShape: CARD_SHAPES.CLOVER,
  },
};
