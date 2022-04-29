import React from 'react';
import PropTypes from 'prop-types';

import { isNonEmptyObject } from '../../../utilities/data-validation.helper';
import { joinClassNames } from '../../../utilities/styles.helper';

import IconStyled from './Icon.styled';

export function Icon({ className, style = {}, variant = 'filled', clickable = false, disabled = false, name, size = 'md', onClick }) {
  function handleClick() {
    if (clickable && !disabled && onClick) onClick();
  }

  return (
    <IconStyled
      className={joinClassNames('icon', className, getIconClassName(variant))}
      style={style}
      size={size}
      clickable={clickable}
      disabled={disabled}
      onClick={handleClick}
    >
      {getIconName(name, variant)}
    </IconStyled>
  );
}
Icon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl']),
  variant: PropTypes.oneOf(['filled', 'outline']),
  name: PropTypes.string.isRequired,
  clickable: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

function getIconClassName(variant) {
  return { filled: 'material-icons', outline: 'material-icons-outlined' }[variant];
}

function getIconName(name, variant) {
  const iconName = {
    add: 'add',
    'arrow-back': 'arrow_back_ios',
    close: 'close',
    heart: { filled: 'favorite', outline: 'favorite_border' },
    exit: 'logout',
    prize: 'emoji_events',
    offline: 'cloud_off',
  }[name];

  return (isNonEmptyObject(iconName) ? iconName[variant] : iconName) || name;
}
