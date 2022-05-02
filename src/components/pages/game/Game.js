import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import gameViewmodel from './game.viewmodel';
import { exitGame, getMessages, pickAdditionalCards, pickPenaltyCards, playCard } from '../../../store/games/game.slice';
import { ROUTE_STARTUP } from '../../../routes';
import { areObjectsEqual, isNonEmptyObject } from '../../../utilities/data-validation.helper';
import { CARD_VALUES, GAME_MODES, GAME_STATUSES, PLAYER_TYPES } from '../../../core/enums';
import sessionHelper from '../../../utilities/session.helper';

import { Button, ChatBox, Icon, Modal, Platform, Player } from '../../library';
import GameStyled from './Game.styled';
import useDisclosure from '../../hooks/useDisclosure';
import { SelectShapeForm } from './forms';
import useWebSocket from '../../hooks/useWebSocket';

export default function Game() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { game, player: currentPlayer, messages } = useSelector((state) => state.gameState);
  const shapeModal = useDisclosure();
  const [selectedCard, setSelectedCard] = useState({});
  const webSocket = useWebSocket();
  const gameRef = useRef();
  const playingRef = useRef();

  useEffect(() => {
    if (game.status === GAME_STATUSES.ENDED) return;

    const { activePlayer } = game;
    if (game.mode === GAME_MODES.ONLINE && activePlayer.id !== currentPlayer.id) return;

    if (isNonEmptyObject(activePlayer)) {
      document.getElementById(activePlayer.id).scrollIntoView();
      if (!activePlayer.active) return;
      if (gameViewmodel.isPenaltyCardActive(game) && !gameViewmodel.includesPenaltyCards(activePlayer)) {
        if (game.penaltyEnabled) {
          dispatchPickPenaltyCards();
          return;
        }
      }
      if (!gameViewmodel.includesPlayableCards(activePlayer, game)) {
        dispatchPickAdditionalCards();
        return;
      }

      const chosenCardStrategies = {
        [PLAYER_TYPES.HUMAN]: handleHumanPlayer,
        [PLAYER_TYPES.COMPUTER]: handleComputerPlayer,
      };
      setTimeout(() => {
        chosenCardStrategies[activePlayer.type]();
      }, 350);
    }

    function handleHumanPlayer() {}

    function handleComputerPlayer() {
      const card = gameViewmodel.chooseComputerCard(activePlayer, game);
      if (isNonEmptyObject(card)) {
        const args = { card, player: activePlayer };
        if (card.value === CARD_VALUES.JACK) {
          args.shape = gameViewmodel.chooseBestShape(activePlayer);
        }
        dispatch(playCard(args));
      }
    }
  }, [game.activePlayer]);

  useEffect(() => {
    if (game.id) dispatch(getMessages({ game }));
  }, [game.id]);

  function handleHideShapeModal() {
    shapeModal.handleHide();
    setPlayingOff();
  }

  function handleSelectCard(card) {
    if (playingRef.current) return;
    if (game.status === GAME_STATUSES.ENDED || (game.mode === GAME_MODES.ONLINE && game.activePlayer.id !== currentPlayer.id)) return;
    playingRef.current = true;
    if (gameViewmodel.isPlayableCard(card, game)) {
      if (gameViewmodel.isPenaltyCardActive(game) && !gameViewmodel.isPenaltyCard(card) && game.penaltyEnabled) {
        dispatchPickPenaltyCards({ timeout: 75 });
        return;
      }

      processPlayingCardForHuman(card);
    } else dispatchPickAdditionalCards({ timeout: 75 });
  }

  function processPlayingCardForHuman(card) {
    const { activePlayer } = game;
    if (card.value === CARD_VALUES.JACK && activePlayer.cards.length > 1) {
      setSelectedCard(card);
      shapeModal.handleShow();
      return;
    }
    dispatch(playCard({ card, player: activePlayer, webSocket })).then((action) => {
      dispatchGameUsingWebSocket(action);
      setPlayingOff();
    });
  }

  function handleSelectShape(shape) {
    handleHideShapeModal();
    dispatch(playCard({ card: selectedCard, player: game.activePlayer, shape, webSocket })).then((action) => {
      dispatchGameUsingWebSocket(action);
      setPlayingOff();
    });
    setSelectedCard({});
  }

  function handlePickAdditionalCard() {
    if (playingRef.current) return;
    if (game.activePlayer.type === PLAYER_TYPES.HUMAN) {
      playingRef.current = true;
      dispatchPickAdditionalCards();
    }
  }

  function handleSendMessage({ content }) {
    if (game.mode === GAME_MODES.ONLINE) {
      webSocket.sendMessage({ game, player: currentPlayer, content });
    }
  }

  function handleExitGame() {
    if (game.mode === GAME_MODES.ONLINE) sessionHelper.disableStorage();
    dispatch(exitGame()).then(() => {
      history.push(ROUTE_STARTUP);
      webSocket.leaveGame({ game, player: currentPlayer });
    });
  }

  function dispatchPickPenaltyCards({ timeout = 250 } = {}) {
    setPlayingOn();
    setTimeout(() => {
      dispatch(pickPenaltyCards({ webSocket })).then(setPlayingOff);
    }, timeout);
  }

  function dispatchPickAdditionalCards({ timeout = 250 } = {}) {
    setPlayingOn();
    setTimeout(() => {
      dispatch(pickAdditionalCards({ webSocket })).then(setPlayingOff);
    }, timeout);
  }

  function dispatchGameUsingWebSocket({ payload }) {
    if (payload.game.mode !== GAME_MODES.ONLINE) return;
    if (!areObjectsEqual(payload.game, gameRef.current)) {
      webSocket.updateGame({ game: payload.game });
      gameRef.current = payload.game;
    }
  }

  function setPlayingOn() {
    playingRef.current = true;
  }

  function setPlayingOff() {
    playingRef.current = false;
  }

  return isNonEmptyObject(game) ? (
    <>
      <GameStyled>
        <header>
          <Button icon={<Icon name="exit" />} onClick={handleExitGame}>
            Exit
          </Button>
        </header>
        <main>
          <div>
            <section>
              {game.players.map((player) => (
                <Player
                  key={player.id}
                  player={player}
                  mode={game.mode}
                  currentPlayer={currentPlayer}
                  playersCount={game.players.length}
                  playing={gameViewmodel.isPlayerPlaying(player, game)}
                  onSelect={handleSelectCard}
                />
              ))}
            </section>
            <Platform
              game={game}
              cardPickingEnabled={gameViewmodel.isCardPickingEnabled(game, currentPlayer)}
              onPickCard={handlePickAdditionalCard}
            />
          </div>
        </main>
      </GameStyled>

      <Modal title="Choose shape" shown={shapeModal.shown} onHide={handleHideShapeModal}>
        <SelectShapeForm onSelectShape={handleSelectShape} />
      </Modal>

      {game.mode === GAME_MODES.ONLINE && <ChatBox messages={messages} onSubmit={handleSendMessage} />}
    </>
  ) : (
    <Redirect to={ROUTE_STARTUP} />
  );
}
