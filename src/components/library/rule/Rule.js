import React from 'react';
import PropTypes from 'prop-types';

import { htmlParserHelper } from '../../../tools';

import RuleStyled from './Rule.styled';
import { Text } from '..';

export function Rule({ position, content }) {
  return (
    <RuleStyled>
      <main>
        <Text weight="bold">{position}</Text>
        <Text>{htmlParserHelper.parseFromText(content)}</Text>
      </main>
    </RuleStyled>
  );
}
Rule.propTypes = {
  position: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};
