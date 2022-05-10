import { cloneDeep } from 'lodash';
import { Player, Play, Card, Game } from '../../../core/entities';
import { GAME_MODES, GAME_STATUSES, PLAYER_TYPES } from '../../../core/enums';
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

function chooseComputerCard(player, { activePlays, chosenShape, penaltyEnabled, activePlayer, players = [] }) {
  const result = Player.fromJSON(player).chooseNextCard(formatLastPlayedCard(activePlays), {
    chosenShape,
    penaltyEnabled,
    activePlayer,
    players,
  });
  if (result.card) result.card = result.card.toJSON();

  return result;
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

function chooseBestShape(player, card) {
  return gameHelper.chooseBestShape(Player.fromJSON(player).cards, card);
}

function isPenaltyCard(card) {
  return cardHelper.isPenaltyCard(Card.fromJSON(card));
}

function isCardPickingEnabled(game, currentPlayer) {
  if (game.status === GAME_STATUSES.ENDED) return false;

  const { activePlayer = {}, mode } = game;

  return mode === GAME_MODES.OFFLINE ? activePlayer?.type === PLAYER_TYPES.HUMAN : currentPlayer?.id === activePlayer?.id;
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
