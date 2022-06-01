import { arrayHelper, dataHelper } from '../../tools';
import factoryHelper from '../../tools/factory.helper';
import { isNonEmptyArray, isNonEmptyObject, isNullish } from '../../utilities/data-validation.helper';
import { Card, Player } from '../entities';
import { CARD_COLORS, CARD_SHAPES, CARD_VALUES, PLAYER_TYPES } from '../enums';
import cardHelper from './card.helper';

function isPlayValid(playedCard, lastPlayedCard, chosenShape) {
  if (playedCard.value === CARD_VALUES.JACK || playedCard.value === CARD_VALUES.JOKER) return true;
  if (lastPlayedCard.value === CARD_VALUES.JOKER) {
    return playedCard.color === lastPlayedCard.color || playedCard.value === CARD_VALUES.SEVEN;
  }
  if (lastPlayedCard.value === CARD_VALUES.JACK && isNullish(chosenShape)) return true;

  return chosenShape ? chosenShape === playedCard.shape : playedCard.shape === lastPlayedCard.shape || playedCard.value === lastPlayedCard.value;
}

function generateCardsSets({ cardsSetsCount = 1 } = {}) {
  return Array(cardsSetsCount).fill().map(generateCardSet).flat();
}

function generateCardSet() {
  const commonCards = generateCommonCards();
  const specialCards = generateSpecialCards();

  return [...commonCards, ...specialCards];
}

function generateCommonCards() {
  return arrayHelper
    .toArray(CARD_VALUES)
    .filter(isNotJoker)
    .flatMap((value) => {
      return arrayHelper.toArray(CARD_SHAPES).map((shape) => {
        const card = Card.newInstance({ value, shape });
        cardHelper.setCardColor(card);

        return card;
      });
    });
}

function generateSpecialCards() {
  return [CARD_COLORS.RED, CARD_COLORS.BLACK].map((color) => Card.newInstance({ value: CARD_VALUES.JOKER, color }));
}

function isNotJoker(cardValue) {
  return cardValue !== CARD_VALUES.JOKER;
}

function getPlayerRanking(game) {
  return game.players.filter((player) => player.active) + 1;
}

/**
 * Get next active player index
 * @param {*} activePlayer
 * @param {*} players
 * @param {*} param2
 * @returns
 */
function getNextActivePlayerIndex(activePlayer, players, { excludedPlayersCount = 0, reverse = false } = {}) {
  const activePlayerIndex = getActivePlayerIndex(players, activePlayer);
  const reveredPlayers = reverse ? reversePlayers(players, activePlayerIndex) : players;
  const reversedActivePlayerIndex = reveredPlayers.length > 0 ? getActivePlayerIndex(reveredPlayers, activePlayer) : -1;
  const nextActivePlayerIndex = Array(excludedPlayersCount + 1)
    .fill()
    .reduce(
      (currentActivePlayerIndex) => {
        return getNextDirectActivePlayerIndex(currentActivePlayerIndex, reveredPlayers);
      },
      reverse ? reversedActivePlayerIndex : activePlayerIndex
    );
  return { nextActivePlayerIndex, players: reveredPlayers };
}

function getActivePlayerIndex(players, activePlayer) {
  return players.findIndex((player) => player.id === activePlayer.id);
}

function getNextDirectActivePlayerIndex(activePlayerIndex, players) {
  for (let index = activePlayerIndex + 1; index !== activePlayerIndex; index++) {
    if (index === players.length) index = 0;
    if (players[index].active) return index;
  }
}

function reversePlayers(players = [], startIndex) {
  let index = startIndex;
  const reversedPlayers = [];
  while (reversedPlayers.length !== players.length) {
    if (index < 0) index = players.length - 1;
    reversedPlayers.push(players[index]);
    index--;
  }

  return reversedPlayers;
}

function toCards(plays) {
  return plays.map((play) => play.card);
}

function filterPlayableCards(cards, activeCard, chosenShape) {
  return cards.filter((card) => isPlayValid(card, activeCard, chosenShape));
}

/**
 * Choose best playable card
 * @param {*} activeCard
 * @param {*} cards
 * @param {*} chosenShape
 * @param {*} args
 * @param {*} args.activePlayer
 * @param {*} args.players
 * @returns
 */
function chooseBestPlayableCard(activeCard, cards, { chosenShape, activePlayer, players = [] } = {}) {
  if (players.length === 2 && activePlayer instanceof Player) {
    const remainingPlayer = players.find((player) => player.id !== activePlayer.id);
    if (remainingPlayer.cards.length === 1) {
      const result = chooseBestPlayableCardIfOpponentOnlyHasOneRemainingCardLeft(activeCard, cards, chosenShape);
      if (isNonEmptyObject(result)) return result;
    }
  }

  const globalTree = [];
  generatePlaysTree(activeCard, cards, chosenShape, globalTree);

  const treeBranches = orderTreeBranches(globalTree);
  const bestBranch = treeBranches[0];
  if (bestBranch[0].value === CARD_VALUES.JACK) {
    return generateResultForJack(bestBranch);
  }

  return { card: treeBranches[0][0] };
}

function chooseBestPlayableCardIfOpponentOnlyHasOneRemainingCardLeft(activeCard, cards, chosenShape) {
  const tree = [];
  generatePlaysTree(activeCard, cards, chosenShape, tree);

  const treeBranches = sortTreeBranches(tree);
  const bestBranch = filterTreeBranchesThatStartWithPenalty(treeBranches)[0];
  if (isNonEmptyArray(bestBranch)) return { card: bestBranch[0] };

  if (activeCard.value === CARD_VALUES.JACK && chosenShape && !doesIncludeBranchWithAtLeastTwoConsecutiveAsWithDifferentShapes(tree)) {
    const result = generateResultForJack(filterTreeBranchesThatStartWithJack(treeBranches)[0]);
    if (isNonEmptyObject(result)) return result;
  }
}

function generatePlaysTree(activeCard, cards, chosenShape, tree, cardTree = []) {
  const playableCards = filterPlayableCards(cards, activeCard, chosenShape);
  if (playableCards.length === 0) {
    tree.push(cardTree);
    return;
  }

  playableCards.forEach((card) => {
    let nodeChosenShape;
    const subTree = [...cardTree, card];
    if (card.value === CARD_VALUES.JACK) {
      nodeChosenShape = chooseBestShape(cards, card);
    }

    generatePlaysTree(card, filterActiveCards(cards, subTree), nodeChosenShape, tree, subTree);
  });
}

function filterActiveCards(cards, cardTree) {
  const activeCardsIds = cardTree.map((card) => card.id);

  return cards.filter((card) => !activeCardsIds.includes(card.id));
}

function chooseBestShape(cards, jackCard) {
  if (cards.length === 1) return cards[0].shape;

  const shapes = cards
    .filter((card) => card.value !== CARD_VALUES.JACK)
    .map((card) => card.shape)
    .filter(dataHelper.isValidValue);

  const chosenCard = shapes
    .map((shape) => {
      return {
        shape,
        count: shapes.reduce((count, shapeItem) => (shape === shapeItem ? count + 1 : count), 0),
      };
    })
    .sort((prevItem, nextItem) => {
      return nextItem.count - prevItem.count;
    })[0];

  return isNonEmptyObject(chosenCard) ? chosenCard.shape : jackCard.shape;
}

function orderTreeBranches(tree) {
  const sortedTree = sortTreeBranches(tree);

  return sortedTree
    .filter((branch) => branch.length === sortedTree[0].length)
    .sort((prevBranch, nextBranch) => {
      const prevBranchPenaltyCardsPositionsWeight = getPenaltyCardsPositionsWeight(prevBranch);
      const nextBranchPenaltyCardsPositionsWeight = getPenaltyCardsPositionsWeight(nextBranch);

      if (
        (getLastCardValue(prevBranch) === CARD_VALUES.A && getLastCardValue(nextBranch) !== CARD_VALUES.A) ||
        prevBranchPenaltyCardsPositionsWeight < nextBranchPenaltyCardsPositionsWeight
      )
        return 1;
      else if (
        (getLastCardValue(nextBranch) === CARD_VALUES.A && getLastCardValue(prevBranch) !== CARD_VALUES.A) ||
        prevBranchPenaltyCardsPositionsWeight > nextBranchPenaltyCardsPositionsWeight
      )
        return -1;

      return 0;
    });
}

function sortTreeBranches(tree) {
  return tree.sort((prevBranch, nextBranch) => {
    return nextBranch.length - prevBranch.length;
  });
}

function getLastCardValue(branch) {
  return branch[branch.length - 1].value;
}

function getPenaltyCardsPositionsWeight(branch) {
  return branch.reduce((accumulator, card, index) => {
    return cardHelper.isPenaltyCard(card) ? accumulator + index : accumulator;
  }, 0);
}

function filterTreeBranchesThatStartWithJack(treeBranches = []) {
  return treeBranches.filter((branch) => branch[0].value === CARD_VALUES.JACK);
}

function filterTreeBranchesThatStartWithPenalty(treeBranches = []) {
  return treeBranches.filter((branch) => [CARD_VALUES.SEVEN, CARD_VALUES.JOKER].includes(branch[0].value));
}

function generateResultForJack(bestBranch) {
  const result = {};
  if (isNonEmptyArray(bestBranch)) {
    result.card = bestBranch[0];
    if (bestBranch.length > 1) result.shape = bestBranch[1].shape || bestBranch[0].shape;

    return result;
  }

  return result;
}

function doesIncludeBranchWithAtLeastTwoConsecutiveAsWithDifferentShapes(tree) {
  return tree.some((branch) => {
    if (branch.length > 1) {
      if (branch[0].value === CARD_VALUES.A) {
        const remainingAs = branch.filter((card, index) => index > 0 && card.value === CARD_VALUES.A);
        if (remainingAs.length > 0 && remainingAs[remainingAs.length - 1].shape !== branch[0].shape) {
          return true;
        }
      }
    }

    return false;
  });
}

/**
 * Generate players
 * @returns
 */
function generatePlayers() {
  const playersCount = [1, 2, 3][Math.round(Math.random() * 3)];
  const players = Array(playersCount).fill().map(generatePlayer);
  players.push(Player.newInstance({ type: PLAYER_TYPES.HUMAN }));

  return arrayHelper.shuffle(players);
}

function generatePlayer() {
  return Player.newInstance({ type: PLAYER_TYPES.COMPUTER, name: factoryHelper.generatePlayerName() });
}

function countActivePlayers(players = []) {
  return players.filter((player) => player.active).length;
}

export default {
  isPlayValid,
  generateCardSet,
  getPlayerRanking,
  getNextActivePlayerIndex,
  toCards,
  filterPlayableCards,
  chooseBestPlayableCard,
  generatePlayers,
  getNextDirectActivePlayerIndex,
  chooseBestShape,
  generatePlayer,
  countActivePlayers,
  generateCardsSets,
};
