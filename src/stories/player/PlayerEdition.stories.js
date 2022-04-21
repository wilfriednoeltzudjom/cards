import React from 'react';

import { PlayerEdition } from '../../components/library';

import { PLAYER_TYPES } from '../../core/enums';

export default {
  title: 'Cards/PlayerEdition',
  component: PlayerEdition,
};

const Template = (args) => <PlayerEdition {...args} />;

export const Default = Template.bind({});
Default.args = {
  player: {
    type: PLAYER_TYPES.HUMAN,
  },
  position: 1,
};
