import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { publicRoutes, privateRoutes } from '../routes';

import AppStyled from './App.styled';
import AppUnsupported from './AppUnsupported';
import useWindowDimensions from './hooks/useWindowDimensions';

function App() {
  const { width } = useWindowDimensions();

  return canShowAppContent(width) ? (
    <>
      <AppStyled>
        <Router>
          <Switch>
            {renderPublicRoutes()}
            {renderPrivateRoutes()}
          </Switch>
        </Router>
      </AppStyled>
    </>
  ) : (
    <AppUnsupported />
  );
}

function renderPublicRoutes() {
  return publicRoutes.map(({ key, redirectTo, component: Component, ...restProps }) => {
    return (
      <Route
        key={key}
        {...restProps}
        render={(props) => {
          return redirectTo ? <Redirect to={redirectTo} /> : <Component {...props} />;
        }}
      />
    );
  });
}
function renderPrivateRoutes() {
  return privateRoutes.map(({ key, ...restProps }) => <Route key={key} {...restProps} />);
}

function canShowAppContent(width) {
  return width > 1200;
}

export default App;
