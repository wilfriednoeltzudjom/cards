import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { exitGame, getGame, startGameOnline } from '../../../store/games/game.slice';
import { isEmptyObject, isNonEmptyObject } from '../../../utilities/data-validation.helper';
import { MODAL_TITLE_ENTER_PLAYER } from '../../../utilities/labels';
import setupOnlineViewmodel from './setup-online.viewmodel';
import { ROUTE_GAME, ROUTE_STARTUP } from '../../../routes';
import { arrayHelper } from '../../../tools';
import setupViewmodel from './setup.viewmodel';
import sessionHelper from '../../../utilities/session.helper';

import useWebSocket from '../../hooks/useWebSocket';
import useDisclosure from '../../hooks/useDisclosure';
import useForm from '../../hooks/useForm';
import { Button, Icon, Modal, PlayerEdition, Text } from '../../library';
import SetupOnlineStyled from './SetupOnline.styled';
import PlayerForm from './forms/PlayerForm';

export default function SetupOnline() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { game, player } = useSelector((state) => state.gameState);
  const webSocket = useWebSocket();
  const playerModal = useDisclosure();
  const playerForm = useForm();

  useEffect(() => {
    if (id) {
      sessionHelper.enableStorage();
      dispatch(getGame({ gameId: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isEmptyObject(player) && isNonEmptyObject(game)) {
      playerForm.resetFormState();
      playerModal.handleShow();
    }
  }, [game, player]);

  function handleJoin() {
    const { formState } = playerForm;
    if (setupOnlineViewmodel.isPlayerFormValid(game, formState)) {
      const player = setupOnlineViewmodel.createPlayer(formState, game);
      webSocket.joinGame({ game, player });
      playerModal.handleHide();
    }
  }

  function handleMovePlayerLeft(selectedPlayerIndex) {
    if (player.creator) {
      const players = arrayHelper.moveElementPosition(game.players, selectedPlayerIndex, selectedPlayerIndex - 1);
      updateGamePlayers(players);
    }
  }

  function handleMovePlayerRight(selectedPlayerIndex) {
    if (player.creator) {
      const players = arrayHelper.moveElementPosition(game.players, selectedPlayerIndex, selectedPlayerIndex - 1);
      updateGamePlayers(players);
    }
  }

  function handleDeletePlayer(selectedPlayer) {
    if (player.creator) {
      const players = game.players.filter(({ id }) => id !== selectedPlayer.id);
      updateGamePlayers(players);
    }
  }

  function updateGamePlayers(players) {
    webSocket.updateGame({ game: { ...game, players } });
  }

  function handleLeave() {
    sessionHelper.disableStorage();
    webSocket.leaveGame({ game, player });
    dispatch(exitGame());
  }

  function handleStartGame() {
    if (setupViewmodel.canStartGame(game.players)) dispatch(startGameOnline({ webSocket }));
  }

  useEffect(() => {
    return () => {
      sessionHelper.clearPlayer();
    };
  }, []);

  return setupOnlineViewmodel.mustRedirectToStartupPage({ game }) ? (
    <Redirect to={ROUTE_STARTUP} />
  ) : setupOnlineViewmodel.mustRedirectToGamePage({ game }) ? (
    <Redirect to={ROUTE_GAME} />
  ) : (
    <>
      <SetupOnlineStyled>
        <header>
          <Button onClick={handleLeave}>Leave</Button>
        </header>
        <main>
          {game.players.map((currentPlayer, index) => (
            <div key={currentPlayer.id}>
              <PlayerEdition
                player={currentPlayer}
                position={index + 1}
                playersCount={game.players.length}
                onMoveLeft={() => handleMovePlayerLeft(index)}
                onMoveRight={() => handleMovePlayerRight(index)}
              />
              {setupOnlineViewmodel.canShowDeletePlayerButton(currentPlayer) && (
                <Button icon={<Icon name="close" size="lg" />} onClick={() => handleDeletePlayer(currentPlayer)} />
              )}
            </div>
          ))}
        </main>
        {player?.creator && (
          <footer>
            <Text size="lg">
              Share PIN to your friends: <b>{game.id}</b>
            </Text>
            <Button disabled={!setupViewmodel.canStartGame(game.players)} onClick={handleStartGame}>
              Start game
            </Button>
          </footer>
        )}
      </SetupOnlineStyled>

      <Modal
        title={MODAL_TITLE_ENTER_PLAYER}
        shown={playerModal.shown}
        closable={false}
        backgroundMode={3}
        showOverlay
        onHide={playerModal.handleHide}
      >
        <PlayerForm
          formOptions={{ submitEnabled: setupOnlineViewmodel.isPlayerFormValid(game, playerForm.formState) }}
          onChange={playerForm.handleChange}
          onSubmit={handleJoin}
        />
      </Modal>
    </>
  );
}
