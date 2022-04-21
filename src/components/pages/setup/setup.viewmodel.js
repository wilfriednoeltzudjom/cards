import { isNonEmptyString } from '../../../utilities/data-validation.helper';

function canStartGame(players) {
  return players.every((player) => isNonEmptyString(player.name));
}

export default { canStartGame };
