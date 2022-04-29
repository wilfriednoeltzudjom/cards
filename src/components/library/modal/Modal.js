import React from 'react';
import PropTypes from 'prop-types';

import { childrenPropType } from '../../../utilities/prop-type-schemas';

import ModalStyled from './Modal.styled';
import ModalContainerStyled from './ModalContainer.styled';
import ModalOverlayStyled from './ModalOverlay.styled';
import { Portal } from '../portal';
import { Text } from '../text';
import { Icon } from '../icon';
import useModalDisclosure from './useModalDisclosure';

export function Modal({ title, shown, backgroundMode = 1, closable = true, showOverlay = false, children, onHide }) {
  const props = { shown, backgroundMode, closable };
  const { hasBeenShownOnce, handleHide } = useModalDisclosure({ shown, onHide });

  return (
    <Portal>
      <ModalOverlayStyled className={getModalClassName(shown, hasBeenShownOnce)} showOverlay={showOverlay}>
        <ModalContainerStyled>
          <ModalStyled className={getModalClassName(shown, hasBeenShownOnce)} {...props}>
            <header>
              <Text weight="extra">{title}</Text>
              {closable && <Icon name="close" clickable onClick={handleHide} />}
            </header>
            <main>{children}</main>
          </ModalStyled>
        </ModalContainerStyled>
      </ModalOverlayStyled>
    </Portal>
  );
}
Modal.propTypes = {
  title: PropTypes.string,
  shown: PropTypes.bool,
  backgroundMode: PropTypes.number,
  closable: PropTypes.bool,
  showOverlay: PropTypes.bool,
  children: childrenPropType,
  onHide: PropTypes.func,
};

export function getModalClassName(shown, hasBeenShownOnce) {
  return hasBeenShownOnce ? (shown ? 'shown' : 'hidden') : 'initial';
}
