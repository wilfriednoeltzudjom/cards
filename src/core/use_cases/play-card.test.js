import { CARD_VALUES, CARD_SHAPES, CARD_COLORS, GAME_STATUSES } from '../enums';
import { createPlayersForTest, createGameForTest } from '../../tests/factories/common.factory';

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
});
