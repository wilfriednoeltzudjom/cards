import React from 'react';

import { Card } from '../../components/library';

import { CARD_COLORS, CARD_SHAPES, CARD_VALUES } from '../../core/enums';

export default {
  title: 'Cards/Card',
  component: Card,
  argTypes: {
    size: {
      type: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  card: {
    value: CARD_VALUES.A,
    shape: CARD_SHAPES.CLOVER,
    color: CARD_COLORS.RED,
    covered: true,
  },
  size: 'sm',
};
