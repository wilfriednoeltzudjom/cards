import React from 'react';
import { dateHelper } from '../../../tools';

import { messagePropType } from '../../../utilities/prop-type-schemas';

import MessageStyled from './Message.styled';

export function Message({ message }) {
  return (
    <MessageStyled id={message.id}>
      <header>
        <span>{message.playerName}</span>
        <span>{dateHelper.calculateElapsedTime({ date: message.createdAt })} min ago</span>
      </header>
      <main>{message.content}</main>
    </MessageStyled>
  );
}
Message.propTypes = {
  message: messagePropType,
};
