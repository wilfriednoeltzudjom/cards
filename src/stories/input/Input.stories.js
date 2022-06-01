import React from 'react';

import { Input } from '../../components/library';

export default {
  title: 'Cards/Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {};
