import React from 'react';

import AppUnsupportedStyled from './AppUnsupported.styled';

export default function AppUnsupported() {
  return (
    <AppUnsupportedStyled>
      <h2>Unsupported screen size</h2>
      <p>This app currently only supports screens that are at least 1200px width</p>
    </AppUnsupportedStyled>
  );
}
