import React from 'react';
import PropTypes from 'prop-types';

import { childrenPropType } from '../../../utilities/prop-type-schemas';

import AnchorStyled from './Anchor.styled';

export function Anchor({ children, url, type = 'external' }) {
  return (
    <AnchorStyled href={url} target={getTarget(type)} rel={getRel(type)}>
      {children}
    </AnchorStyled>
  );
}
Anchor.propTypes = {
  children: childrenPropType,
  url: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['internal', 'external']),
};

function getTarget(type) {
  return { internal: '_self', external: '_blank' }[type];
}

function getRel(type) {
  return { internal: '', external: 'noopener noreferrer' }[type];
}
