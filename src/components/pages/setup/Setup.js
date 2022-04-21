import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startGame } from '../../../store/games/game.slice';
import gameHelper from '../../../core/helpers/game.helper';
import setupViewmodel from './setup.viewmodel';
import { isNonEmptyObject } from '../../../utilities/data-validation.helper';
import { ROUTE_GAME, ROUTE_STARTUP } from '../../../routes';

import { Button, PlayerEdition } from '../../library';
import SetupStyled from './Setup.styled';

export default function Setup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { game } = useSelector((state) => state.gameState);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    setPlayers(gameHelper.generatePlayers());
  }, []);

  function handleBack() {
    history.push(ROUTE_STARTUP);
  }

  function handleStartGame() {
    if (setupViewmodel.canStartGame(players)) dispatch(startGame({ players }));
  }

  function handlePlayerChange(selectedPlayer, { value }) {
    setPlayers(
      players.map((player) => {
        if (player.id === selectedPlayer.id) player.name = value;

        return player;
      })
    );
  }

  if (isNonEmptyObject(game)) return <Redirect to={ROUTE_GAME} />;

  return (
    <SetupStyled>
      <header>
        <Button onClick={handleBack}>Back</Button>
      </header>
      <main>
        {players.map((player, index) => (
          <PlayerEdition key={player.id} player={player.toJSON()} position={index + 1} onChange={(args) => handlePlayerChange(player, args)} />
        ))}
      </main>
      <footer>
        <Button disabled={!setupViewmodel.canStartGame(players)} onClick={handleStartGame}>
          Start game
        </Button>
      </footer>
    </SetupStyled>
  );
}
