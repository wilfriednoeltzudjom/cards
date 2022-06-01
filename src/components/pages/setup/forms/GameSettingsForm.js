import React from 'react';
import PropTypes from 'prop-types';

import { CARDS_SETS_COUNT_DEFAULT_VALUE, PLAYER_CARDS_COUNT_DEFAULT_VALUE } from '../../../../config/constants';
import { LABEL_INPUT_CARDS_SETS_COUNT, LABEL_INPUT_PLAYER_CARDS_COUNT } from '../../../../utilities/labels';

import { FormGroup, Input, Label } from '../../../library';
import GameSettingsFormStyled from './GameSettingsForm.styled';

export default function GameSettingsForm({ onChange }) {
  return (
    <GameSettingsFormStyled>
      <FormGroup>
        <Label>{LABEL_INPUT_PLAYER_CARDS_COUNT}</Label>
        <Input type="number" name="initialCardsPerPlayerCount" defaultValue={PLAYER_CARDS_COUNT_DEFAULT_VALUE} onChange={onChange} />
      </FormGroup>
      <FormGroup>
        <Label>{LABEL_INPUT_CARDS_SETS_COUNT}</Label>
        <Input type="number" name="cardsSetsCount" defaultValue={CARDS_SETS_COUNT_DEFAULT_VALUE} onChange={onChange} />
      </FormGroup>
    </GameSettingsFormStyled>
  );
}
GameSettingsForm.propTypes = {
  onChange: PropTypes.func,
};
