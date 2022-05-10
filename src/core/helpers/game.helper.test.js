import gameHelper from './game.helper';
import { Card, Player } from '../entities';
import factoryHelper from '../../tools/factory.helper';
import { CARD_COLORS, CARD_SHAPES, CARD_VALUES } from '../enums';
import { createPlayersForTest } from '../../tests/factories/common.factory';

describe('helpers - game', () => {
  const shared = {};

  describe('get next active player index', () => {
    beforeEach(() => {
      shared.players = factoryHelper.generatePlayersNames({ count: 5 }).map((name) => Player.newInstance({ name }));
    });

    describe('case all players are active', () => {
      test('should return next active player index when the active player is not the last one', () => {
        const { nextActivePlayerIndex } = gameHelper.getNextActivePlayerIndex(shared.players[1], shared.players);
        expect(nextActivePlayerIndex).toBe(2);
      });

      test('should return next active player index when the active player is the last one', () => {
        const { nextActivePlayerIndex } = gameHelper.getNextActivePlayerIndex(shared.players[shared.players.length - 1], shared.players);
        expect(nextActivePlayerIndex).toBe(0);
      });

      test('should return next active player index while excluding a certain number of players', () => {
        const { nextActivePlayerIndex } = gameHelper.getNextActivePlayerIndex(shared.players[shared.players.length - 1], shared.players, {
          excludedPlayersCount: 1,
        });
        expect(nextActivePlayerIndex).toBe(1);
      });
    });

    describe('case some players are not active', () => {
      beforeEach(() => {
        shared.players = shared.players.map((player, index) => {
          if (index === 1 || index === shared.players.length - 1) player.active = false;

          return player;
        });
      });

      test('should return next active player index when the active player is not the last one', () => {
        const { nextActivePlayerIndex } = gameHelper.getNextActivePlayerIndex(shared.players[0], shared.players);
        expect(nextActivePlayerIndex).toBe(2);
      });

      test('should return next active player index while excluding a certain number of players', () => {
        const { nextActivePlayerIndex } = gameHelper.getNextActivePlayerIndex(shared.players[3], shared.players, { excludedPlayersCount: 1 });
        expect(nextActivePlayerIndex).toBe(2);
      });
    });
  });

  describe('get next direct active player index', () => {
    test('should properly return the next active player index', () => {
      const players = [true, true, false, false, false].map((active) => Player.newInstance({ active }));
      const nextDirectActivePlayerIndex = gameHelper.getNextDirectActivePlayerIndex(1, players);

      expect(nextDirectActivePlayerIndex).toBe(0);
    });
  });

  describe('choose best playable card', () => {
    test('should choose a penalty as the best playable card if there is only one remaining player with one remaining card', () => {
      const players = createPlayersForTest([
        {
          cards: [
            { value: CARD_VALUES.THREE, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
            { value: CARD_VALUES.A, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
            { value: CARD_VALUES.EIGHT, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
            { value: CARD_VALUES.SEVEN, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
          ],
        },
        { cards: [{ value: CARD_VALUES.EIGHT, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK }] },
      ]);
      const activeCard = Card.newInstance({ value: CARD_VALUES.THREE, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK });

      const { card } = gameHelper.chooseBestPlayableCard(activeCard, players[0].cards, { activePlayer: players[0], players });

      expect(card.value).toBe(CARD_VALUES.SEVEN);
    });

    test('should choose <JACK> as the best playable card if there is only one remaining player with one remaining card (without double <A>)', () => {
      const players = createPlayersForTest([
        {
          cards: [
            { value: CARD_VALUES.EIGHT, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
            { value: CARD_VALUES.A, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
            { value: CARD_VALUES.THREE, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
            { value: CARD_VALUES.JACK, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
          ],
        },
        { cards: [{ value: CARD_VALUES.EIGHT, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK }] },
      ]);
      const activeCard = Card.newInstance({ value: CARD_VALUES.JACK, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK });

      const { card } = gameHelper.chooseBestPlayableCard(activeCard, players[0].cards, {
        activePlayer: players[0],
        players,
        chosenShape: CARD_SHAPES.SPADE,
      });

      expect(card.value).toBe(CARD_VALUES.JACK);
    });

    test('should choose <A> as the best playable card if there is only one remaining player with one remaining card (with double <A>)', () => {
      const players = createPlayersForTest([
        {
          cards: [
            { value: CARD_VALUES.EIGHT, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
            { value: CARD_VALUES.A, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
            { value: CARD_VALUES.A, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
            { value: CARD_VALUES.JACK, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
          ],
        },
        { cards: [{ value: CARD_VALUES.EIGHT, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK }] },
      ]);
      const activeCard = Card.newInstance({ value: CARD_VALUES.JACK, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK });

      const { card } = gameHelper.chooseBestPlayableCard(activeCard, players[0].cards, {
        activePlayer: players[0],
        players,
        chosenShape: CARD_SHAPES.SPADE,
      });

      expect(card.value).toBe(CARD_VALUES.A);
      expect(card.shape).toBe(CARD_SHAPES.SPADE);
    });

    describe('case not including joker', () => {
      test('should properly choose best playable card', () => {
        const activeCard = Card.newInstance({ value: CARD_VALUES.FOUR, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK });
        const cards = [
          { value: CARD_VALUES.A, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
          { value: CARD_VALUES.A, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
          { value: CARD_VALUES.TEN, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
          { value: CARD_VALUES.JACK, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
          { value: CARD_VALUES.SEVEN, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
        ].map((cardData) => Card.newInstance(cardData));

        const { card } = gameHelper.chooseBestPlayableCard(activeCard, cards);

        expect(card.value).toBe(CARD_VALUES.A);
        expect(card.shape).toBe(CARD_SHAPES.SPADE);
      });
    });

    describe('case including joker', () => {
      test('should properly choose best playable card', () => {
        const activeCard = Card.newInstance({ value: CARD_VALUES.TWO, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK });
        const cards = [
          { value: CARD_VALUES.TWO, shape: CARD_SHAPES.HEART, color: CARD_COLORS.RED },
          { value: CARD_VALUES.TEN, shape: CARD_SHAPES.DIAMOND, color: CARD_COLORS.RED },
          { value: CARD_VALUES.JOKER, shape: CARD_SHAPES.HEART, color: CARD_COLORS.RED },
          { value: CARD_VALUES.SEVEN, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
          { value: CARD_VALUES.JACK, shape: CARD_SHAPES.SPADE, color: CARD_COLORS.BLACK },
        ].map((cardData) => Card.newInstance(cardData));

        const { card } = gameHelper.chooseBestPlayableCard(activeCard, cards);

        expect(card.value).toBe(CARD_VALUES.TWO);
        expect(card.shape).toBe(CARD_SHAPES.HEART);
      });
    });
  });
});
