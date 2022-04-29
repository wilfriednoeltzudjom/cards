import { cloneDeep } from 'lodash';
import { Player, Play, Card, Game } from '../../../core/entities';
import { GAME_STATUSES, PLAYER_TYPES } from '../../../core/enums';
import cardHelper from '../../../core/helpers/card.helper';
import gameHelper from '../../../core/helpers/game.helper';
import { isNonEmptyObject } from '../../../utilities/data-validation.helper';

function isPlayerPlaying(player, game) {
  return isNonEmptyObject(game.activePlayer) && game.activePlayer.id === player.id;
}

function includesPlayableCards(player, { chosenShape, activePlays }) {
  return Player.fromJSON(player).includesPlayableCards(formatLastPlayedCard(activePlays), chosenShape);
}

function includesPenaltyCards(player) {
  return Player.fromJSON(player).includesPenaltyCards();
}

function chooseComputerCard(player, { activePlays, chosenShape, penaltyEnabled }) {
  const cardInstance = Player.fromJSON(player).chooseNextCard(formatLastPlayedCard(activePlays), chosenShape, penaltyEnabled);

  return cardInstance ? cardInstance.toJSON() : {};
}

function formatLastPlayedCard(plays) {
  return Play.fromJSON(plays[plays.length - 1]);
}

function isPenaltyCardActive({ activePlays }) {
  return cardHelper.isPenaltyCard(formatLastPlayedCard(activePlays).card);
}

function isPlayableCard(card, { activePlays, chosenShape }) {
  return gameHelper.isPlayValid(card, activePlays[activePlays.length - 1].card, chosenShape);
}

function chooseBestShape(player) {
  return gameHelper.chooseBestShape(Player.fromJSON(player).cards);
}

function isPenaltyCard(card) {
  return cardHelper.isPenaltyCard(Card.fromJSON(card));
}

function isCardPickingEnabled(game) {
  if (game.status === GAME_STATUSES.ENDED) return false;

  const { activePlayer = {} } = game;

  return activePlayer?.type === PLAYER_TYPES.HUMAN;
}

function pickPenaltyCards(gameJSON) {
  const gameInstance = createGameFromJSON(gameJSON);
  gameInstance.pickPenaltyCards();

  return gameInstance.toJSON();
}

function pickAdditionalCards(gameJSON, cardsCount = 1) {
  const gameInstance = createGameFromJSON(gameJSON);
  gameInstance.giveActivePlayerAdditionalCards({ cardsCount });

  return gameInstance.toJSON();
}

function createGameFromJSON(gameJSON) {
  return Game.fromJSON(cloneDeep(gameJSON));
}

export default {
  isPlayerPlaying,
  includesPlayableCards,
  includesPenaltyCards,
  chooseComputerCard,
  isPenaltyCardActive,
  isPlayableCard,
  chooseBestShape,
  isPenaltyCard,
  isCardPickingEnabled,
  createGameFromJSON,
  pickPenaltyCards,
  pickAdditionalCards,
};
