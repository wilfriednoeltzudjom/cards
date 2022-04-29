import { httpClient, jsonContentTypeHeader } from '../../api';
import { GAMES_BASE_URL } from '../../api/routes';

async function createGame(formState = {}) {
  const { data } = await httpClient.post(GAMES_BASE_URL, formState, {
    headers: jsonContentTypeHeader,
  });

  return data;
}

async function getGame(gameId, filters = {}) {
  const { data } = await httpClient.get(`${GAMES_BASE_URL}/${gameId}`, { params: filters });

  return data;
}

export default { createGame, getGame };
