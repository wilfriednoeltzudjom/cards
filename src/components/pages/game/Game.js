import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import gameViewmodel from './game.viewmodel';
import { exitGame, pickAdditionalCards, pickPenaltyCards, playCard } from '../../../store/games/game.slice';
import { ROUTE_STARTUP } from '../../../routes';
import { areObjectsEqual, isNonEmptyObject } from '../../../utilities/data-validation.helper';
import { CARD_VALUES, GAME_MODES, GAME_STATUSES, PLAYER_TYPES } from '../../../core/enums';
import sessionHelper from '../../../utilities/session.helper';

import { Button, Icon, Modal, Platform, Player } from '../../library';
import GameStyled from './Game.styled';
import useDisclosure from '../../hooks/useDisclosure';
import { SelectShapeForm } from './forms';
import useWebSocket from '../../hooks/useWebSocket';

export default function Game() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { game, player: currentPlayer } = useSelector((state) => state.gameState);
  const shapeModal = useDisclosure();
  const [selectedCard, setSelectedCard] = useState({});
  const webSocket = useWebSocket();
  const gameRef = useRef();

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
      }, 1200);
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

  // useEffect(() => {
  //   if (game.mode !== GAME_MODES.ONLINE || game.status === GAME_STATUSES.ENDED) return;

  //   const { activePlayer } = game;
  //   if (activePlayer.id !== currentPlayer.id) return;

  //   if (isNonEmptyObject(activePlayer)) {
  //     document.getElementById(activePlayer.id).scrollIntoView();
  //     if (!activePlayer.active) return;
  //     if (gameViewmodel.isPenaltyCardActive(game) && !gameViewmodel.includesPenaltyCards(activePlayer)) {
  //       if (game.penaltyEnabled) {
  //         const gameInstance = gameViewmodel.createGameFromJSON(game);
  //         gameInstance.pickPenaltyCards();
  //         setTimeout(() => {
  //           webSocket.updateGame({ game: gameInstance.toJSON() });
  //         }, 500);
  //         return;
  //       }
  //     }
  //     if (!gameViewmodel.includesPlayableCards(activePlayer, game)) {
  //       const gameInstance = gameViewmodel.createGameFromJSON(game);
  //       gameInstance.giveActivePlayerAdditionalCards({ cardsCount: 1 });
  //       setTimeout(() => {
  //         webSocket.updateGame({ game: gameInstance.toJSON() });
  //       }, 500);
  //       return;
  //     }
  //   }
  // }, [game.activePlayer]);

  function handleSelectCard(card) {
    if (gameViewmodel.isPlayableCard(card, game)) {
      if (gameViewmodel.isPenaltyCardActive(game) && !gameViewmodel.isPenaltyCard(card) && game.penaltyEnabled) {
        dispatchPickPenaltyCards({ timeout: 100 });
        return;
      }

      processPlayingCardForHuman(card);
    } else dispatchPickAdditionalCards({ timeout: 100 });
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
    });
  }

  function handleSelectShape(shape) {
    shapeModal.handleHide();
    dispatch(playCard({ card: selectedCard, player: game.activePlayer, shape, webSocket })).then((action) => {
      dispatchGameUsingWebSocket(action);
    });
    setSelectedCard({});
  }

  function handlePickAdditionalCard() {
    if (game.activePlayer.type === PLAYER_TYPES.HUMAN) dispatchPickAdditionalCards();
  }

  function handleExitGame() {
    if (game.mode === GAME_MODES.ONLINE) sessionHelper.disableStorage();
    dispatch(exitGame()).then(() => {
      history.push(ROUTE_STARTUP);
      webSocket.leaveGame({ game, player: currentPlayer });
    });
  }

  function dispatchPickPenaltyCards({ timeout = 800 } = {}) {
    setTimeout(() => {
      dispatch(pickPenaltyCards({ webSocket }));
    }, timeout);
  }

  function dispatchPickAdditionalCards({ timeout = 800 } = {}) {
    setTimeout(() => {
      dispatch(pickAdditionalCards({ webSocket }));
    }, timeout);
  }

  function dispatchGameUsingWebSocket({ payload }) {
    if (payload.game.mode !== GAME_MODES.ONLINE) return;
    if (!areObjectsEqual(payload.game, gameRef.current)) {
      webSocket.updateGame({ game: payload.game });
      gameRef.current = payload.game;
    }
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
            <Platform game={game} cardPickingEnabled={gameViewmodel.isCardPickingEnabled(game)} onPickCard={handlePickAdditionalCard} />
          </div>
        </main>
      </GameStyled>

      <Modal title="Choose shape" shown={shapeModal.shown} onHide={shapeModal.handleHide}>
        <SelectShapeForm onSelectShape={handleSelectShape} />
      </Modal>
    </>
  ) : (
    <Redirect to={ROUTE_STARTUP} />
  );
}
