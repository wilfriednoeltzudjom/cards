import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Card, Game, Player } from '../../core/entities';
import { GAME_MODES, GAME_STATUSES } from '../../core/enums';
import gameHelper from '../../core/helpers/game.helper';
import { isNonEmptyObject } from '../../utilities/data-validation.helper';
import { waitFor } from '../../utilities/duration.helper';
import sessionHelper from '../../utilities/session.helper';
import { hideLoading, showLoading } from '../ui/loading.slice';
import gameService from './game.service';

const initialState = {
  game: sessionHelper.retrieveGame() || {},
  player: sessionHelper.retrievePlayer() || {},
  messages: [],
};

export const startGame = createAsyncThunk('games/startGame', ({ players, cardsSetsCount, initialCardsPerPlayerCount }) => {
  const gameInstance = Game.newInstance({
    cards: gameHelper.generateCardsSets({ cardsSetsCount }),
    players,
    initialCardsPerPlayerCount,
  });
  gameInstance.startGame();

  const game = gameInstance.toJSON();
  sessionHelper.saveGame(game);

  return { game };
});

export const startGameOnline = createAsyncThunk('games/startGameOnline', ({ webSocket }, { getState }) => {
  const gameInstance = Game.fromJSON({ ...getState().gameState.game, cards: gameHelper.generateCardSet() });
  gameInstance.startGame();

  const game = gameInstance.toJSON();
  sessionHelper.saveGame(game);
  dispatchGameUsingWebSoket(webSocket, game);

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

export const pickAdditionalCards = createAsyncThunk('games/pickAdditionalCard', async ({ cardsCount = 1, webSocket } = {}, { getState }) => {
  await waitFor(500);

  const gameInstance = Game.fromJSON(getState().gameState.game);
  gameInstance.giveActivePlayerAdditionalCards({ cardsCount });

  const game = gameInstance.toJSON();
  if (game.mode === GAME_MODES.ONLINE && webSocket) {
    webSocket.updateGame({ game });
    return {};
  }

  sessionHelper.saveGame(game);

  return { game };
});

export const pickPenaltyCards = createAsyncThunk('games/pickPenaltyCards', async ({ webSocket }, { getState }) => {
  await waitFor(500);

  const gameInstance = Game.fromJSON(getState().gameState.game);
  gameInstance.pickPenaltyCards();

  const game = gameInstance.toJSON();
  if (game.mode === GAME_MODES.ONLINE && webSocket) {
    webSocket.updateGame({ game });
    return {};
  }

  sessionHelper.saveGame(game);

  return { game };
});

export const exitGame = createAsyncThunk('games/exitGame', async () => {
  await waitFor(500);
  sessionHelper.clearSession();

  return {};
});

async function dispatchGameUsingWebSoket(webSocket, game) {
  if (game.mode === GAME_MODES.ONLINE && webSocket) {
    webSocket.updateGame({ game });
  }
}

export const createGame = createAsyncThunk('games/createGame', async ({ formState = {}, onSuccess }, { dispatch }) => {
  dispatch(showLoading());

  try {
    const { data: game } = await gameService.createGame(formState);
    if (onSuccess) onSuccess();

    return { game };
  } finally {
    dispatch(hideLoading());
  }
});

export const getGame = createAsyncThunk('games/getGame', async ({ gameId, filters = {}, onSuccess }, { dispatch }) => {
  dispatch(showLoading());

  try {
    const { data: game = {} } = await gameService.getGame(gameId, filters);
    if (onSuccess) onSuccess();
    updateOrClearSession(game);

    return { game };
  } finally {
    dispatch(hideLoading());
  }
});

export const gameJoined = createAsyncThunk('games/gameJoined', async ({ game, player }, { dispatch }) => {
  dispatch(hideLoading());

  sessionHelper.saveGame(game);
  sessionHelper.savePlayer(player);

  return { game, player };
});

export const gameLeft = createAsyncThunk('games/gameLeft', async () => {
  sessionHelper.clearPlayer();

  return {};
});

export const gameUpdated = createAsyncThunk('games/gameUpdated', async ({ game }) => {
  if (sessionHelper.isStorageEnabled()) {
    updateOrClearSession(game);

    return { game };
  }

  return {};
});

export const getMessages = createAsyncThunk('games/getMessages', async ({ game }, { dispatch }) => {
  dispatch(showLoading());

  try {
    const { data: messages } = await gameService.getMessages(game.id);

    return { messages };
  } finally {
    dispatch(hideLoading());
  }
});

function updateOrClearSession(game) {
  if (game.status === GAME_STATUSES.CANCELLED) {
    sessionHelper.clearSession();
  } else sessionHelper.saveGame(game);
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    refreshMessages(state, action) {
      state.messages = action.payload.messages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startGame.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(startGameOnline.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(playCard.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(pickAdditionalCards.fulfilled, (state, action) => {
      if (isNonEmptyObject(action.payload.game)) {
        state.game = action.payload.game;
      }
    });
    builder.addCase(pickPenaltyCards.fulfilled, (state, action) => {
      if (isNonEmptyObject(action.payload.game)) {
        state.game = action.payload.game;
      }
    });
    builder.addCase(exitGame.fulfilled, (state) => {
      state.game = {};
      state.player = {};
      state.messages = [];
    });
    builder.addCase(createGame.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(getGame.fulfilled, (state, action) => {
      state.game = action.payload.game;
    });
    builder.addCase(gameJoined.fulfilled, (state, action) => {
      state.game = action.payload.game;
      state.player = action.payload.player;
    });
    builder.addCase(gameLeft, (state) => {
      state.player = {};
    });
    builder.addCase(gameUpdated.fulfilled, (state, action) => {
      if (isNonEmptyObject(action.payload.game)) {
        state.game = action.payload.game;
      }
    });

    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload.messages;
    });
  },
});

export const { refreshMessages } = gameSlice.actions;
export default gameSlice.reducer;
