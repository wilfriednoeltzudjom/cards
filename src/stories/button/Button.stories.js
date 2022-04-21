import React from 'react';

import { Button } from '../../components/library';

export default {
  title: 'Cards/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};
