import React from 'react';

import { formPropTypes } from '../../../../utilities/prop-type-schemas';

import { Button } from '../../../library';
import PlayerFormStyled from './PlayerForm.styled';

export default function PlayerForm({ formOptions = {}, onChange, onSubmit }) {
  const { submitEnabled = false } = formOptions;

  function handleChange({ target }) {
    if (onChange) onChange(target);
  }

  return (
    <PlayerFormStyled>
      <main>
        <input name="name" type="text" autoComplete="off" onChange={handleChange} />
      </main>
      <footer>
        <Button disabled={!submitEnabled} onClick={onSubmit}>
          Join
        </Button>
      </footer>
    </PlayerFormStyled>
  );
}
PlayerForm.propTypes = formPropTypes;
