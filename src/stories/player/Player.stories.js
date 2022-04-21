import React from 'react';

import { Player } from '../../components/library';
import gameHelper from '../../core/helpers/game.helper';

export default {
  title: 'Cards/Player',
  component: Player,
};

const Template = (args) => <Player {...args} />;

export const Default = Template.bind({});
Default.args = {
  player: {
    name: 'John',
    cards: gameHelper.generateCardSet().slice(0, 10),
    active: true,
    ranking: 1,
  },
  playing: false,
};
