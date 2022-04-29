import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import backgroundImage from '../assets/misc/background.svg';
import { GITHUB_PROFILE, TWITTER_PROFILE } from '../config/constants';
import { publicRoutes, privateRoutes } from '../routes';

import AppStyled from './App.styled';
import AppUnsupported from './AppUnsupported';
import useWindowDimensions from './hooks/useWindowDimensions';
import { Anchor, Loading, Text } from './library';
import { ImageIcon } from './library/icon/ImageIcon';

function App() {
  const loadingState = useSelector((state) => state.loadingState);
  const { width } = useWindowDimensions();

  return canShowAppContent(width) ? (
    <>
      <AppStyled style={{ backgroundImage: `url(${backgroundImage})` }}>
        <main>
          <Router>
            <Switch>
              {renderPublicRoutes()}
              {renderPrivateRoutes()}
            </Switch>
          </Router>
        </main>
        <footer>
          <div>
            <section>
              <Text size="sm">&copy; </Text>
              <Text size="sm">{new Date().getFullYear()} (v1.0.0), Made with React by Wilfried Noel TZUDJOM</Text>
            </section>
            <section>
              <Anchor url={GITHUB_PROFILE}>
                <ImageIcon name="github" label="Github" />
              </Anchor>
              <Anchor url={TWITTER_PROFILE}>
                <ImageIcon name="twitter" label="Twitter" />
              </Anchor>
            </section>
          </div>
        </footer>
      </AppStyled>

      <Loading shown={loadingState.shown} />
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
