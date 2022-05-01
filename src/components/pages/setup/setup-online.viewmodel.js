import { Player } from '../../../core/entities';
import { GAME_STATUSES, PLAYER_TYPES } from '../../../core/enums';
import { isNonEmptyObject, isNullishOrEmpty, isNullish } from '../../../utilities/data-validation.helper';
import textHelper from '../../../utilities/text.helper';

function isPlayerFormValid(game, { name }) {
  if (isNullish(name) || name?.length < 2) return false;
  const { players = [] } = game;

  return !players.map((player) => textHelper.sanitize(player.name)).includes(textHelper.sanitize(name));
}

function createPlayer({ name }, game) {
  const player = Player.newInstance({ type: PLAYER_TYPES.HUMAN, name, creator: isGameCreator(game) });

  return player.toJSON();
}

function isGameCreator(game) {
  return game?.players?.length === 0;
}

function canShowDeletePlayerButton(player) {
  return player.type === PLAYER_TYPES.COMPUTER;
}

function mustRedirectToStartupPage({ game }) {
  return isNullishOrEmpty(game) || [GAME_STATUSES.CANCELLED, GAME_STATUSES.ENDED].includes(game.status);
}

function mustRedirectToGamePage({ game }) {
  return isNonEmptyObject(game) && game.status === GAME_STATUSES.STARTED;
}

function canShowSetupOnlinePageContent({ game }) {
  return isNonEmptyObject(game) && game.status === GAME_STATUSES.PENDING;
}

export default {
  isPlayerFormValid,
  createPlayer,
  canShowDeletePlayerButton,
  mustRedirectToStartupPage,
  mustRedirectToGamePage,
  canShowSetupOnlinePageContent,
};
