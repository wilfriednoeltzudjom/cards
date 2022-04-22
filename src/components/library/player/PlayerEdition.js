import React from 'react';
import PropTypes from 'prop-types';

import { playerPropType } from '../../../utilities/prop-type-schemas';
import { PLAYER_TYPES } from '../../../core/enums';

import { Icon } from '../icon';
import PlayerEditionStyled from './PlayerEdition.styled';

export function PlayerEdition({ player, position, playersCount = 0, onChange, onMoveLeft, onMoveRight }) {
  function handleChange({ target }) {
    if (onChange) onChange(target);
  }

  function handleMoveLeft() {
    if (onMoveLeft) onMoveLeft();
  }

  function handleMoveRight() {
    if (onMoveRight) onMoveRight();
  }

  return (
    <PlayerEditionStyled>
      <header>
        <section>{formatPlayerType(player)}</section>
        <section>{position}</section>
      </header>
      <main>
        <input type="text" defaultValue={player.name} disabled={player.type === PLAYER_TYPES.COMPUTER} onChange={handleChange} />
      </main>
      <footer>
        <Icon name="west" clickable disabled={position === 1} onClick={handleMoveLeft} />
        <Icon name="east" clickable disabled={position === playersCount} onClick={handleMoveRight} />
      </footer>
    </PlayerEditionStyled>
  );
}
PlayerEdition.propTypes = {
  player: playerPropType,
  position: PropTypes.number,
  playersCount: PropTypes.number,
  onChange: PropTypes.func,
  onMoveLeft: PropTypes.func,
  onMoveRight: PropTypes.func,
};

function formatPlayerType({ type }) {
  return { [PLAYER_TYPES.COMPUTER]: 'Computer', [PLAYER_TYPES.HUMAN]: 'Player' }[type];
}
