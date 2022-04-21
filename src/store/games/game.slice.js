import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Card, Game, Player } from '../../core/entities';
import gameHelper from '../../core/helpers/game.helper';
import { waitFor } from '../../utilities/duration.helper';
import sessionHelper from '../../utilities/session.helper';

const initialState = {
  game: sessionHelper.retrieveGame() || {},
};

export const startGame = createAsyncThunk('games/startGame', ({ players }) => {
  const gameInstance = Game.newInstance({ cards: gameHelper.generateCardSet(), players });
  gameInstance.startGame();

  const game = gameInstance.toJSON();
  sessionHelper.saveGame(game);

  return { game };
});

export const playCard = createAsyncThunk('games/playCard', async ({ card, player, shape }, { getState }) => {
  await waitFor(500);

  const gameInstance = Game.fromJSON(getState().gameState.game);
  gameInstance.play(Card.fromJSON(card), Player.fromJSON(player), shape);

  const game = gameInstance.toJSON();
  sessionHelper.saveGame(game);

  return { game };
});

export const pickAdditionalCards = createAsyncThunk('games/pickAdditionalCard', async ({ cardsCount = 1 } = {}, { getState }) => {
  await waitFor(500);

  const gameInstance = Game.fromJSON(getState().gameState.game);
  gameInstance.giveActivePlayerAdditionalCards({ cardsCount });

  const game = gameInstance.toJSON();
  sessionHelper.saveGame(game);

  return { game };
});

export const pickPenaltyCards = createAsyncThunk('games/pickPenaltyCards', async (_, { getState }) => {
  await waitFor(500);

  const gameInstance = Game.fromJSON(getState().gameState.game);
  gameInstance.pickPenaltyCards();

  const game = gameInstance.toJSON();
  sessionHelper.saveGame(game);

  return { game };
});

export const exitGame = createAsyncThunk('games/exitGame', async () => {
  await waitFor(500);
  sessionHelper.clearSession();

  return {};
});

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startGame.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(playCard.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(pickAdditionalCards.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(pickPenaltyCards.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(exitGame.fulfilled, (state) => {
      state.game = {};
    });
  },
});

export default gameSlice.reducer;
