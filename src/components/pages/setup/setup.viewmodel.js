import { PLAYER_TYPES } from '../../../core/enums';
import { isNonEmptyString } from '../../../utilities/data-validation.helper';

function canStartGame(players) {
  return players.every((player) => isNonEmptyString(player.name) && player.name.length > 2);
}

function canShowDeletePlayerButton(players, currentPlayer, currentPlayerIndex) {
  if (currentPlayer.type === PLAYER_TYPES.HUMAN) return false;

  return players.findIndex((player) => player.type === PLAYER_TYPES.COMPUTER) !== currentPlayerIndex;
}

function canDeletePlayer(player) {
  return player.type === PLAYER_TYPES.COMPUTER;
}

export default { canStartGame, canShowDeletePlayerButton, canDeletePlayer };
