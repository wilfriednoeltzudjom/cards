import { CARDS_SETS_COUNT_DEFAULT_VALUE, PLAYER_CARDS_COUNT_DEFAULT_VALUE, SET_CARDS_COUNT } from '../../../config/constants';
import { PLAYER_TYPES } from '../../../core/enums';
import { isNonEmptyObject, isNonEmptyString } from '../../../utilities/data-validation.helper';

function canStartGame(players, gameSettingsFormState = {}) {
  const gameSettingsValid = isNonEmptyObject(gameSettingsFormState) ? isGameSettingsFormValid(gameSettingsFormState, players) : true;

  return arePlayersProperlyEntered(players) && gameSettingsValid;
}

function arePlayersProperlyEntered(players) {
  return players.length >= 2 && players.every((player) => isNonEmptyString(player.name) && player.name.length > 2);
}

function isGameSettingsFormValid({ initialCardsPerPlayerCount, cardsSetsCount }, players) {
  if (initialCardsPerPlayerCount < 4 || initialCardsPerPlayerCount > 10 || cardsSetsCount < 1) return false;

  const totalInitialCards = initialCardsPerPlayerCount * players.length;

  return totalInitialCards < cardsSetsCount * SET_CARDS_COUNT + 2;
}

function canShowDeletePlayerButton(players, currentPlayer, currentPlayerIndex) {
  if (currentPlayer.type === PLAYER_TYPES.HUMAN) return false;

  return players.findIndex((player) => player.type === PLAYER_TYPES.COMPUTER) !== currentPlayerIndex;
}

function canDeletePlayer(player) {
  return player.type === PLAYER_TYPES.COMPUTER;
}

function getGameSettingsFormInitialState() {
  return { initialCardsPerPlayerCount: PLAYER_CARDS_COUNT_DEFAULT_VALUE, cardsSetsCount: CARDS_SETS_COUNT_DEFAULT_VALUE };
}

export default { canStartGame, canShowDeletePlayerButton, canDeletePlayer, getGameSettingsFormInitialState };
