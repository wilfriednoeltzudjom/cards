import React from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTE_RULES, ROUTE_SETUP } from '../../../routes';

import { Button, Text } from '../../library';
import StartupStyled from './Startup.styled';

export default function Startup() {
  const history = useHistory();

  function handleNewGame() {
    history.push(ROUTE_SETUP);
  }

  function handleRules() {
    history.push(ROUTE_RULES);
  }

  return (
    <StartupStyled>
      <header>
        <Text size="xxl" weight="black">
          Cards Game
        </Text>
        <Text>A simple and fun cards game with a set of custom rules for you to enjoy yourself.</Text>
      </header>
      <main>
        <Button onClick={handleNewGame}>New game</Button>
        <Button onClick={handleRules}>Rules</Button>
        <Button disabled>Leaderboard</Button>
      </main>
    </StartupStyled>
  );
}
