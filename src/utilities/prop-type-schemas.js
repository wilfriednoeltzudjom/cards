import PropTypes from 'prop-types';

export const sizePropType = PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

export const weightPropType = PropTypes.oneOf(['normal', 'bold', 'extra', 'black']);

export const childrenPropType = PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]);

export const cardPropType = PropTypes.shape({
  value: PropTypes.string,
  shape: PropTypes.string,
  color: PropTypes.string,
  covered: PropTypes.bool,
});

export const playerPropType = PropTypes.shape({
  type: PropTypes.string,
});

export const gamePropType = PropTypes.shape({});
