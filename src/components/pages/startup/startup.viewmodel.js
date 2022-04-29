import { GAME_STATUSES } from '../../../core/enums';
import { isNonEmptyObject, isNullish, isValidUUID } from '../../../utilities/data-validation.helper';

function mustRedirectToRoomPage({ game }) {
  return isNonEmptyObject(game) && [GAME_STATUSES.PENDING, GAME_STATUSES.STARTED].includes(game.status);
}

function isGameFormValid({ pin }) {
  return isNullish(pin) ? false : isValidUUID(pin);
}

export default { mustRedirectToRoomPage, isGameFormValid };
