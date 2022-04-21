import buildCard from './card';
import buildPlayer from './player';
import buildPlay from './play';
import buildGame from './game';

import { dateHelper, arrayHelper, idHelper, dataHelper } from '../../tools';

const dependencies = { dateHelper, arrayHelper, idHelper, dataHelper };

export const Card = buildCard(dependencies);
export const Player = buildPlayer(dependencies);
export const Play = buildPlay(dependencies);
export const Game = buildGame(dependencies);
