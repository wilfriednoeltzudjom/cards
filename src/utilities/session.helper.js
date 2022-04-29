export const GAME_KEY = 'GAME_KEY';
export const PLAYER_KEY = 'PLAYER_KEY';
export const STORAGE_DISABLED_KEY = 'STORAGE_DISABLED_KEY';

function saveGame(game) {
  localStorage.setItem(GAME_KEY, JSON.stringify(game));
}

function savePlayer(player) {
  localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
}

function retrieveGame() {
  const game = localStorage.getItem(GAME_KEY);

  return game ? JSON.parse(game) : game;
}

function retrievePlayer() {
  const player = localStorage.getItem(PLAYER_KEY);

  return player ? JSON.parse(player) : player;
}

function disableStorage() {
  return localStorage.setItem(STORAGE_DISABLED_KEY, true);
}

function enableStorage() {
  return localStorage.removeItem(STORAGE_DISABLED_KEY);
}

function isStorageEnabled() {
  return !localStorage.getItem(STORAGE_DISABLED_KEY);
}

function clearSession() {
  clearGame();
  clearPlayer();
}

function clearGame() {
  localStorage.removeItem(GAME_KEY);
}

function clearPlayer() {
  localStorage.removeItem(PLAYER_KEY);
}

export default { saveGame, savePlayer, retrieveGame, retrievePlayer, clearSession, disableStorage, enableStorage, isStorageEnabled, clearPlayer };
