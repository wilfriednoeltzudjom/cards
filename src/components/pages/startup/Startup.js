import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { GAME_MODES, GAME_STATUSES } from '../../../core/enums';

import { ROUTE_ROOM, ROUTE_RULES, ROUTE_SETUP } from '../../../routes';
import { createGame, getGame } from '../../../store/games/game.slice';
import { MODAL_TITLE_ENTER_GAME, MODAL_TITLE_SELECT_GAME_MODE } from '../../../utilities/labels';
import startupViewmodel from './startup.viewmodel';

import useDisclosure from '../../hooks/useDisclosure';
import useForm from '../../hooks/useForm';
import { Button, Modal, Text } from '../../library';
import SelectGameModeForm from './forms/SelectGameModeForm';
import StartupStyled from './Startup.styled';
import GameForm from './forms/GameForm';

export default function Startup() {
  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.gameState);
  const history = useHistory();
  const selectModeModal = useDisclosure();
  const selectModeForm = useForm();

  function handleOpenSelectModeModal() {
    selectModeForm.resetFormState();
    selectModeModal.handleShow();
  }

  function handleSubmitSelectModeForm() {
    const { formState } = selectModeForm;
    const startGameStrategy = {
      [GAME_MODES.OFFLINE]: startGameOffline,
      [GAME_MODES.ONLINE]: startGameOnline,
    }[formState.mode];
    if (startGameStrategy) startGameStrategy(formState);
  }

  function startGameOffline() {
    history.push(ROUTE_SETUP);
  }

  function startGameOnline(formState) {
    dispatch(createGame({ formState, onSuccess: selectModeModal.handleHide }));
  }

  const gameModal = useDisclosure();
  const gameForm = useForm();

  function handleOpenGameModal() {
    gameForm.resetFormState();
    gameModal.handleShow();
  }

  function handleSubmitGameForm() {
    const { formState } = gameForm;
    dispatch(getGame({ gameId: formState.pin, filters: { status: GAME_STATUSES.PENDING }, onSuccess: gameModal.handleHide }));
  }

  function handleRules() {
    history.push(ROUTE_RULES);
  }

  return startupViewmodel.mustRedirectToRoomPage({ game }) ? (
    <Redirect to={ROUTE_ROOM.concat(`/${game.id}`)} />
  ) : (
    <>
      <StartupStyled>
        <header>
          <Text size="xxl" weight="black">
            Cards Game
          </Text>
          <Text>A simple and fun cards game with a set of custom rules for you to enjoy yourself.</Text>
        </header>
        <main>
          <Button onClick={handleOpenSelectModeModal}>New game</Button>
          <Button onClick={handleOpenGameModal}>Join a game</Button>
          <Button disabled>Leaderboard</Button>
          <Button onClick={handleRules}>Rules</Button>
        </main>

        <Modal title={MODAL_TITLE_SELECT_GAME_MODE} shown={selectModeModal.shown} backgroundMode={4} showOverlay onHide={selectModeModal.handleHide}>
          <SelectGameModeForm formState={selectModeForm.formState} onChange={selectModeForm.handleChange} onSubmit={handleSubmitSelectModeForm} />
        </Modal>

        <Modal title={MODAL_TITLE_ENTER_GAME} shown={gameModal.shown} backgroundMode={4} showOverlay onHide={gameModal.handleHide}>
          <GameForm
            formState={gameForm.formState}
            formOptions={{ submitEnabled: startupViewmodel.isGameFormValid(gameForm.formState) }}
            onChange={gameForm.handleChange}
            onSubmit={handleSubmitGameForm}
          />
        </Modal>
      </StartupStyled>
    </>
  );
}
