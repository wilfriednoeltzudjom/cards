import React from 'react';
import PropTypes from 'prop-types';

import { Portal } from '../portal';
import LoadingStyled from './Loading.styled';

export function Loading({ shown = false }) {
  return (
    <Portal>
      <LoadingStyled shown={shown}>
        <div>
          <div>
            <span />
            <span />
            <span />
          </div>
        </div>
      </LoadingStyled>
    </Portal>
  );
}
Loading.propTypes = {
  shown: PropTypes.bool,
};
