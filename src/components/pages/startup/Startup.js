import React from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTE_SETUP } from '../../../routes';

import { Button, Text } from '../../library';
import StartupStyled from './Startup.styled';

export default function Startup() {
  const history = useHistory();

  function handleNewGame() {
    history.push(ROUTE_SETUP);
  }

  return (
    <StartupStyled>
      <header>
        <Text size="xxl" weight="black">
          Cards Game
        </Text>
      </header>
      <main>
        <Button onClick={handleNewGame}>New game</Button>
        <Button>Rules</Button>
        <Button>Leaderboard</Button>
      </main>
    </StartupStyled>
  );
}
