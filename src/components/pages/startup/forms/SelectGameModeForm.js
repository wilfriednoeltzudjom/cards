import React from 'react';

import { GAME_MODES } from '../../../../core/enums';
import { isEmptyObject } from '../../../../utilities/data-validation.helper';
import { LABEL_BUTTON_START_GAME } from '../../../../utilities/labels';
import { formPropTypes } from '../../../../utilities/prop-type-schemas';
import textHelper from '../../../../utilities/text.helper';

import { Button } from '../../../library';
import SelectGameModeFormStyled from './SelectGameModeForm.styled';

export default function SelectGameModeForm({ formState, onChange, onSubmit }) {
  return (
    <SelectGameModeFormStyled noValidate onSubmit={onSubmit}>
      <main>
        {Object.values(GAME_MODES).map((mode) => (
          <div key={mode}>
            <input id={mode} type="checkbox" name="mode" value={mode} onChange={({ target }) => onChange(target)} checked={mode === formState.mode} />
            <label htmlFor={mode}>{textHelper.capitalize(mode)}</label>
          </div>
        ))}
      </main>
      <footer>
        <Button disabled={isEmptyObject(formState)} onClick={onSubmit}>
          {LABEL_BUTTON_START_GAME}
        </Button>
      </footer>
    </SelectGameModeFormStyled>
  );
}
SelectGameModeForm.propTypes = formPropTypes;
