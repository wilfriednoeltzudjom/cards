import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import gameViewmodel from './game.viewmodel';
import { exitGame, pickAdditionalCards, pickPenaltyCards, playCard } from '../../../store/games/game.slice';
import { ROUTE_STARTUP } from '../../../routes';
import { isNonEmptyObject } from '../../../utilities/data-validation.helper';
import { CARD_VALUES, GAME_STATUSES, PLAYER_TYPES } from '../../../core/enums';

import { Button, Icon, Modal, Platform, Player } from '../../library';
import GameStyled from './Game.styled';
import useDisclosure from '../../hooks/useDisclosure';
import { SelectShapeForm } from './forms';

export default function Game() {
  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.gameState);
  const shapeModal = useDisclosure();
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    if (game.status === GAME_STATUSES.ENDED) return;

    const { activePlayer } = game;
    if (isNonEmptyObject(activePlayer)) {
      document.getElementById(activePlayer.id).scrollIntoView();
      if (!activePlayer.active) return;
      if (gameViewmodel.isPenaltyCardActive(game) && !gameViewmodel.includesPenaltyCards(activePlayer)) {
        if (game.penaltyEnabled) {
          setTimeout(() => {
            dispatch(pickPenaltyCards());
          }, 1000);
          return;
        }
      }
      if (!gameViewmodel.includesPlayableCards(activePlayer, game)) {
        setTimeout(() => {
          dispatch(pickAdditionalCards());
        }, 1000);
        return;
      }

      const chosenCardStrategies = {
        [PLAYER_TYPES.HUMAN]: handleHumanPlayer,
        [PLAYER_TYPES.COMPUTER]: handleComputerPlayer,
      };
      setTimeout(() => {
        chosenCardStrategies[activePlayer.type]();
      }, 1500);
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

  function handleSelectCard(card) {
    if (gameViewmodel.isPlayableCard(card, game)) {
      if (gameViewmodel.isPenaltyCardActive(game) && !gameViewmodel.isPenaltyCard(card) && game.penaltyEnabled) {
        dispatch(pickPenaltyCards());
        return;
      }

      processPlayingCardForHuman(card);
    } else dispatch(pickAdditionalCards());
  }

  function processPlayingCardForHuman(card) {
    if (card.value !== CARD_VALUES.JACK) {
      dispatch(playCard({ card, player: game.activePlayer }));
      return;
    }
    setSelectedCard(card);
    shapeModal.handleShow();
  }

  function handleSelectShape(shape) {
    shapeModal.handleHide();
    dispatch(playCard({ card: selectedCard, player: game.activePlayer, shape }));
    setSelectedCard({});
  }

  function handlePickAdditionalCard() {
    if (game.activePlayer.type === PLAYER_TYPES.HUMAN) {
      dispatch(pickAdditionalCards());
    }
  }

  function handleExitGame() {
    dispatch(exitGame());
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
