import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { startGame } from '../../../store/games/game.slice';
import gameHelper from '../../../core/helpers/game.helper';
import { arrayHelper } from '../../../tools';
import setupViewmodel from './setup.viewmodel';
import { isNonEmptyObject } from '../../../utilities/data-validation.helper';
import { ROUTE_GAME, ROUTE_STARTUP } from '../../../routes';

import { Button, Icon, PlayerEdition } from '../../library';
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

  function handleAddPlayer() {
    setPlayers((currentPlayers) => {
      return [...currentPlayers, gameHelper.generatePlayer()];
    });
  }

  function handleDeletePlayer(selectedPlayer) {
    if (!setupViewmodel.canDeletePlayer(selectedPlayer)) return;

    setPlayers((currentPlayers) => {
      return currentPlayers.filter((player) => player.id !== selectedPlayer.id);
    });
  }

  function handleMovePlayerLeft(selectedPlayerIndex) {
    setPlayers((currentPlayers) => arrayHelper.moveElementPosition(currentPlayers, selectedPlayerIndex, selectedPlayerIndex - 1));
  }

  function handleMovePlayerRight(selectedPlayerIndex) {
    setPlayers((currentPlayers) => arrayHelper.moveElementPosition(currentPlayers, selectedPlayerIndex, selectedPlayerIndex + 1));
  }

  if (isNonEmptyObject(game)) return <Redirect to={ROUTE_GAME} />;

  return (
    <SetupStyled>
      <header>
        <Button icon={<Icon name="arrow-back" />} onClick={handleBack}>
          Back
        </Button>
      </header>
      <main>
        {players.map((player, index) => (
          <div key={player.id}>
            <PlayerEdition
              player={player.toJSON()}
              position={index + 1}
              playersCount={players.length}
              onChange={(args) => handlePlayerChange(player, args)}
              onMoveLeft={() => handleMovePlayerLeft(index)}
              onMoveRight={() => handleMovePlayerRight(index)}
            />
            {setupViewmodel.canShowDeletePlayerButton(players, player, index) && (
              <Button icon={<Icon name="close" size="lg" />} onClick={() => handleDeletePlayer(player)} />
            )}
          </div>
        ))}
        <aside>
          <Button icon={<Icon name="add" size="lg" />} disabled={players.length === 4} onClick={handleAddPlayer} />
        </aside>
      </main>
      <footer>
        <Button disabled={!setupViewmodel.canStartGame(players)} onClick={handleStartGame}>
          Start game
        </Button>
      </footer>
    </SetupStyled>
  );
}
