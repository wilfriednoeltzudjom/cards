import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as GithubIcon } from './assets/github.svg';
import { ReactComponent as TwitterIcon } from './assets/twitter.svg';
import { styleImageIcon, getWidth, getHeight } from './ImageIcon.styles';

const icons = {
  github: GithubIcon,
  twitter: TwitterIcon,
};

function UnStyledImageIcon({ className, style, name, size, label }) {
  const Icon = icons[name];

  return Icon ? <Icon aria-label={label} className={className} style={style} width={getWidth({ size })} height={getHeight({ size })} /> : <></>;
}
UnStyledImageIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  name: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
};

const ImageIconStyled = styleImageIcon(UnStyledImageIcon);

export function ImageIcon({ style = {}, colorScheme = 'white', size = 'md', ...restProps }) {
  return <ImageIconStyled style={style} colorScheme={colorScheme} size={size} {...restProps} />;
}

ImageIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  colorScheme: PropTypes.string,
  name: PropTypes.oneOf(['github', 'twitter']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  label: PropTypes.string,
};
