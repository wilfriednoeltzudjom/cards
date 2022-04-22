import loadable from '@loadable/component';

const Startup = loadable(() => import('./components/pages/startup/Startup'));
const Rules = loadable(() => import('./components/pages/rules/Rules'));
const Setup = loadable(() => import('./components/pages/setup/Setup'));
const Game = loadable(() => import('./components/pages/game/Game'));
const Results = loadable(() => import('./components/pages/results/Results'));

export const ROUTE_STARTUP = '/startup';
export const ROUTE_RULES = '/rules';
export const ROUTE_SETUP = '/setup';
export const ROUTE_GAME = '/game';
export const ROUTE_RESULTS = '/results';

export const publicRoutes = [
  {
    key: 'home',
    path: '/',
    exact: true,
    redirectTo: ROUTE_STARTUP,
  },
  {
    key: 'startup',
    path: ROUTE_STARTUP,
    component: Startup,
  },
  {
    key: 'rules',
    path: ROUTE_RULES,
    component: Rules,
  },
  {
    key: 'setup',
    path: ROUTE_SETUP,
    component: Setup,
  },
];

export const privateRoutes = [
  {
    key: 'game',
    path: ROUTE_GAME,
    component: Game,
  },
  {
    key: 'results',
    path: ROUTE_RESULTS,
    component: Results,
  },
];
