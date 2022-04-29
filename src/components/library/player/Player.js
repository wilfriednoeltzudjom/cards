import React from 'react';
import PropTypes from 'prop-types';

import { GAME_MODES, PLAYER_TYPES } from '../../../core/enums';
import { playerPropType } from '../../../utilities/prop-type-schemas';
import { isNullish, isValidValue } from '../../../utilities/data-validation.helper';

import { Card } from '../card';
import PlayerStyled from './Player.styled';
import { Icon } from '../icon';
import { Text } from '../text';

export function Player({ player, mode, currentPlayer = {}, playing = false, playersCount = 0, onSelect }) {
  const props = { player, playing };

  function handleSelect(card) {
    if (onSelect) onSelect(card);
  }

  return (
    <PlayerStyled id={player.id} {...props}>
      <header>
        <section>
          {player.name} {player.type === PLAYER_TYPES.COMPUTER && <Icon name="computer" />}
        </section>
        <section>{player.cards.length}</section>
      </header>
      <main>
        {extractPlayerCards(player).map((card, index) => (
          <Card
            key={card.id}
            card={card}
            size="md"
            index={index}
            covered={isCardCovered(mode, player, currentPlayer)}
            selectable={isCardSelectable(mode, player, currentPlayer)}
            onSelect={() => handleSelect(card)}
          />
        ))}
      </main>
      {canShowWinningIcon(player, playersCount) ? (
        <footer>
          <Icon name="prize" size="xxl" />
          <Text size="lg" weight="extra">
            {player.ranking}
          </Text>
        </footer>
      ) : canShowOfflineIcon(player) ? (
        <footer>
          <Icon name="offline" size="xxl" />
        </footer>
      ) : (
        <></>
      )}
    </PlayerStyled>
  );
}
Player.propTypes = {
  player: playerPropType,
  mode: PropTypes.string,
  currentPlayer: playerPropType,
  playing: PropTypes.bool,
  playersCount: PropTypes.number,
  onSelect: PropTypes.func,
};

function extractPlayerCards(player) {
  return player.type === PLAYER_TYPES.HUMAN
    ? player.cards.map((card) => {
        return { ...card, covered: false };
      })
    : player.cards;
}

function canShowWinningIcon({ ranking }, playersCount) {
  if (isNullish(ranking)) return false;

  return ranking < playersCount;
}

function canShowOfflineIcon({ ranking, leftAt }) {
  return isNullish(ranking) && isValidValue(leftAt);
}

function isCardCovered(mode, player, currentPlayer) {
  return mode === GAME_MODES.OFFLINE ? false : player.id !== currentPlayer.id;
}

function isCardSelectable(mode, player, currentPlayer) {
  if (mode === GAME_MODES.OFFLINE) return player.type === PLAYER_TYPES.HUMAN;

  return player.id === currentPlayer.id && player.type === PLAYER_TYPES.HUMAN;
}
