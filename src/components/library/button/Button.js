import React, { isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';

import animationHelper from '../../../utilities/animation.helper';
import { childrenPropType } from '../../../utilities/prop-type-schemas';
import { joinClassNames } from '../../../utilities/styles.helper';

import ButtonStyled from './Button.styled';
import { isNullish } from '../../../utilities/data-validation.helper';

export function Button({ icon, children, disabled = false, onClick }) {
  function handleClick(evt) {
    if (!disabled) animationHelper.createRipple(evt);
    if (onClick) {
      setTimeout(() => {
        onClick(evt);
      }, 50);
    }
  }

  return (
    <ButtonStyled className={joinClassNames(isNullish(children) ? 'action' : '')} disabled={disabled} onClick={handleClick}>
      <main>
        {isValidElement(icon) && cloneElement(icon, { className: 'icon', size: 'sm' })} {children}
      </main>
    </ButtonStyled>
  );
}
Button.propTypes = {
  icon: PropTypes.element,
  children: childrenPropType,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
