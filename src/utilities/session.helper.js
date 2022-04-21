export const GAME_KEY = 'GAME_KEY';

function saveGame(game) {
  localStorage.setItem(GAME_KEY, JSON.stringify(game));
}

function retrieveGame() {
  const game = localStorage.getItem(GAME_KEY);

  return game ? JSON.parse(game) : game;
}

function clearSession() {
  localStorage.clear();
}

export default { saveGame, retrieveGame, clearSession };
