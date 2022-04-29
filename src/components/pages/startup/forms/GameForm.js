import React from 'react';

import { formPropTypes } from '../../../../utilities/prop-type-schemas';

import { Button } from '../../../library';
import GameFormStyled from './GameForm.styled';

export default function GameForm({ formOptions = {}, onChange, onSubmit }) {
  const { submitEnabled = false } = formOptions;

  function handleChange({ target }) {
    if (onChange) onChange(target);
  }

  return (
    <GameFormStyled>
      <main>
        <input name="pin" type="text" autoComplete="off" onChange={handleChange} />
      </main>
      <footer>
        <Button disabled={!submitEnabled} onClick={onSubmit}>
          Join room
        </Button>
      </footer>
    </GameFormStyled>
  );
}
GameForm.propTypes = formPropTypes;
