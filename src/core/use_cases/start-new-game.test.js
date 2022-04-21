import { Game, Player } from '../entities';
import { PLAYER_TYPES } from '../enums';
import factoryHelper from '../../tools/factory.helper';
import gameHelper from '../helpers/game.helper';

describe('usecase - start new game', () => {
  const shared = {};

  describe('case of two players', () => {
    beforeEach(() => {
      shared.players = factoryHelper.generatePlayersNames({ count: 2 }).map((name) => Player.newInstance({ name, type: PLAYER_TYPES.COMPUTER }));
    });

    test('should start a new game', () => {
      const game = Game.newInstance({ cards: gameHelper.generateCardSet(), players: shared.players });
      game.startGame();
    });
  });

  describe('case of more than two players', () => {});
});
