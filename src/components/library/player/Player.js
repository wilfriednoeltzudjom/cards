import React from 'react';
import PropTypes from 'prop-types';

import { PLAYER_TYPES } from '../../../core/enums';
import { playerPropType } from '../../../utilities/prop-type-schemas';

import { Card } from '../card';
import PlayerStyled from './Player.styled';
import { Icon } from '../icon';
import { Text } from '../text';
import { isValidValue } from '../../../utilities/data-validation.helper';

export function Player({ player, playing = false, onSelect }) {
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
            selectable={player.type === PLAYER_TYPES.HUMAN}
            onSelect={() => handleSelect(card)}
          />
        ))}
      </main>
      {isValidValue(player.ranking) && player.ranking <= 3 && (
        <footer>
          <Icon name="prize" size="xxl" />
          <Text size="lg" weight="extra">
            {player.ranking}
          </Text>
        </footer>
      )}
    </PlayerStyled>
  );
}
Player.propTypes = {
  player: playerPropType,
  playing: PropTypes.bool,
  onSelect: PropTypes.func,
};

function extractPlayerCards(player) {
  return player.type === PLAYER_TYPES.HUMAN
    ? player.cards.map((card) => {
        return { ...card, covered: false };
      })
    : player.cards;
}