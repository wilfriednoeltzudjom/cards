import { dateHelper } from '../../tools';
import { Game, Card, Player } from '../../core/entities';
import { CARD_VALUES, CARD_SHAPES, CARD_COLORS, GAME_STATUSES } from '../../core/enums';

function createGameForTest(gameInitData, { startGame = true, initialCardData = {} }) {
  const game = Game.newInstance(gameInitData);
  if (startGame) startGameForTest(game, initialCardData);

  return game;
}

function startGameForTest(game, initialCardData, cardsInitData = getDefaultCardsInitData()) {
  game.status = GAME_STATUSES.STARTED;
  game.startedAt = dateHelper.currentDate();
  game.setInitialCard(Card.newInstance(initialCardData), cardsInitData.map(createCardForTest));
}

function createPlayersForTest(playersInitData = []) {
  return playersInitData.map(createPlayerForTest);
}

function createPlayerForTest({ cards }) {
  return Player.newInstance({ cards: cards.map(createCardForTest) });
}

function createCardForTest(cardInitData) {
  return Card.newInstance(cardInitData);
}

function getDefaultCardsInitData() {
  const pairs = [
    { shape: CARD_SHAPES.CLOVER, color: CARD_COLORS.BLACK },
    { shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
    { shape: CARD_SHAPES.HEART, color: CARD_COLORS.RED },
    { shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
  ];

  return [CARD_VALUES.NINE, CARD_VALUES.TEN].flatMap((value) => {
    const cards = pairs.map((pair) => ({ ...pair, value }));

    return cards;
  });
}

export { createGameForTest, createPlayersForTest };
