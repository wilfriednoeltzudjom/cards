import { dateHelper } from '../../tools';
import { Game, Card, Player } from '../entities';
import { CARD_VALUES, CARD_SHAPES, CARD_COLORS, GAME_STATUSES } from '../enums';

describe('Usecase - play card', () => {
  describe('case of <A>', () => {
    describe('as last card', () => {
      test('should give an additional card to the active player if there is only one player remaining', () => {
        const players = createPlayersForTest([
          { cards: [{ value: CARD_VALUES.A, shape: CARD_SHAPES.CLOVER, color: CARD_COLORS.BLACK }] },
          { cards: [{ value: CARD_VALUES.JACK, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK }] },
        ]);
        const game = createGameForTest(
          { players },
          { initialCardData: { value: CARD_VALUES.TWO, shape: CARD_SHAPES.CLOVER, color: CARD_COLORS.BLACK } }
        );
        game.play(players[0].cards[0], players[0]);

        expect(game.status).toBe(GAME_STATUSES.STARTED);
        expect(game.players[0].active).toBe(true);
        expect(game.players[0].cards).toHaveLength(1);
        expect(game.players[0].cards[0].value).not.toBe(CARD_VALUES.A);
      });

      test('should not give an additional card to the active player if there is more than two player remaining', () => {
        const players = createPlayersForTest([
          { cards: [{ value: CARD_VALUES.A, shape: CARD_SHAPES.CLOVER, color: CARD_COLORS.BLACK }] },
          { cards: [{ value: CARD_VALUES.JACK, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK }] },
          { cards: [{ value: CARD_VALUES.QUEEN, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK }] },
        ]);
        const game = createGameForTest(
          { players },
          { initialCardData: { value: CARD_VALUES.TWO, shape: CARD_SHAPES.CLOVER, color: CARD_COLORS.BLACK } }
        );
        game.play(players[0].cards[0], players[0]);

        expect(game.players[0].active).toBe(false);
        expect(game.players[0].cards).toHaveLength(0);
      });
    });
  });

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
});
