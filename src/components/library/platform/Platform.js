import React from 'react';
import PropTypes from 'prop-types';

import { gamePropType } from '../../../utilities/prop-type-schemas';

import PlatformStyled from './Platform.styled';
import { Card } from '../card';
import { Shape } from '../shape';

export function Platform({ game, onPickCard }) {
  const { activePlays, cards } = game;

  return (
    <PlatformStyled>
      <main>
        {activePlays.length > 0 &&
          activePlays
            .slice(activePlays.length - 2)
            .map((activePlay, index) => (
              <Card key={activePlay.id} className={index === 0 && activePlays.length > 1 ? 'rotate' : ''} card={activePlay.card} size="xl" />
            ))}
      </main>
      <aside>
        <span>{cards.length}</span>
        {cards.length > 0 && (
          <section>
            <Card card={cards[cards.length - 1]} size="md" selectable onSelect={onPickCard} />
          </section>
        )}
        {game.chosenShape && <Shape name={game.chosenShape} size="sm" animated />}
      </aside>
    </PlatformStyled>
  );
}
Platform.propTypes = {
  game: gamePropType,
  onPickCard: PropTypes.func,
};
