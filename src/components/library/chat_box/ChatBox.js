import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { isNonEmptyString } from '../../../utilities/data-validation.helper';
import { messagePropType } from '../../../utilities/prop-type-schemas';

import ChatBoxStyled from './ChatBox.styled';
import { Text } from '../text';
import { Icon } from '../icon';
import { Input } from '../input';
import { Button } from '../button';
import { Message } from './Message';

export function ChatBox({ messages = [], onSubmit }) {
  const props = { messages };
  const [state, setState] = useState('');
  const [content, setContent] = useState('');
  const formRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessageElement = document.getElementById(messages[messages.length - 1].id);
      if (lastMessageElement) lastMessageElement.scrollIntoView();
    }
  }, [messages]);

  function handleShrink() {
    setState('shrinked');
  }

  function handleExpand() {
    setState('expanded');
  }

  function handleSubmit(evt) {
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    if (isFormValid(content) && onSubmit) {
      onSubmit({ content });
      if (formRef.current) formRef.current.reset();
    }
  }

  return (
    <ChatBoxStyled {...props} className={state}>
      <header>
        <Text weight="bold">ONLINE CHAT</Text>
        {['expanded', ''].includes(state) && <Icon name="shrink" variant="outline" clickable onClick={handleShrink} />}
        {state === 'shrinked' && <Icon name="expand" variant="outline" clickable onClick={handleExpand} />}
      </header>
      <main>
        <ul>
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </ul>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Input onChange={({ value }) => setContent(() => value)} />
          <Button disabled={!isFormValid(content)} icon={<Icon name="send" />} onClick={() => handleSubmit()} />
        </form>
      </main>
    </ChatBoxStyled>
  );
}
ChatBox.propTypes = {
  messages: PropTypes.arrayOf(messagePropType),
  onSubmit: PropTypes.func,
};

function isFormValid(content) {
  return isNonEmptyString(content) && content.length <= 100;
}
