import { Player, Play, Card } from '../../../core/entities';
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

export default {
  isPlayerPlaying,
  includesPlayableCards,
  includesPenaltyCards,
  chooseComputerCard,
  isPenaltyCardActive,
  isPlayableCard,
  chooseBestShape,
  isPenaltyCard,
};
