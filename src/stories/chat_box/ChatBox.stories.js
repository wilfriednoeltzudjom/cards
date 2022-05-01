import React from 'react';
import { faker } from '@faker-js/faker';

import { ChatBox } from '../../components/library';

export default {
  title: 'Cards/ChatBox',
  component: ChatBox,
  argTypes: {
    onSubmit: {
      type: 'action',
    },
  },
};

const Template = (args) => <ChatBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  messages: generateMessages(),
};

function generateMessages() {
  return Array(Math.floor(Math.random() * 10) + 1)
    .fill()
    .map(() => ({
      id: faker.datatype.uuid(),
      createdAt: faker.date.recent().toISOString(),
      playerName: faker.name.firstName(),
      content: faker.lorem.sentence(),
    }));
}
