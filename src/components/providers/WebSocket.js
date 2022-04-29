import React, { createContext, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import { gameJoined, gameLeft, gameUpdated } from '../../store/games/game.slice';
import { showLoading } from '../../store/ui/loading.slice';

export const WebSocketContext = createContext();

const EVENTS = {
  GAME_JOINED: 'game:joined',
  GAME_LEFT: 'game:left',
  GAME_UPDATED: 'game:updated',
  JOIN_GAME: 'game:join',
  LEAVE_GAME: 'game:leave',
  UPDATE_GAME: 'game:update',
  GET_GAME: 'game:get',
  GAME_GETTED: 'game:getted',
};

export default function webSocketProvider({ children }) {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const socket = useRef();

  const joinGame = useCallback(({ game, player }) => {
    dispatch(showLoading());
    if (socket.current.connected) socket.current.emit(EVENTS.JOIN_GAME, { game, player });
  }, []);

  const leaveGame = useCallback(({ game, player }) => {
    if (socket.current.connected) socket.current.emit(EVENTS.LEAVE_GAME, { game, player });
  }, []);

  const updateGame = useCallback(({ game }) => {
    if (socket.current.connected) socket.current.emit(EVENTS.UPDATE_GAME, { game });
  }, []);

  useEffect(() => {
    if (!socket.current) {
      try {
        socket.current = io(process.env.REACT_APP_WS_ENDPOINT, {
          transports: ['websocket', 'polling'],
        });

        socket.current.on('connect_error', () => {
          socket.current.io.opts.transports = ['websocket', 'polling'];
        });
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    if (!socket.current) return;

    const handleGameJoined = ({ game, player }) => {
      dispatch(gameJoined({ game, player }));
    };

    const handleGameGetted = () => {
      socket.current.emit(EVENTS.GAME_GETTED, { game: gameState.game, player: gameState.player });
    };

    const handleGameLeft = ({ player }) => {
      dispatch(gameLeft({ player }));
    };

    const handleGameUpdated = ({ game }) => {
      dispatch(gameUpdated({ game }));
    };

    socket.current.on(EVENTS.GET_GAME, handleGameGetted);

    socket.current.on(EVENTS.GAME_JOINED, handleGameJoined);

    socket.current.on(EVENTS.GAME_LEFT, handleGameLeft);

    socket.current.on(EVENTS.GAME_UPDATED, handleGameUpdated);

    return () => {
      socket.current.off(EVENTS.GET_GAME, handleGameGetted);
      socket.current.off(EVENTS.GAME_JOINED, handleGameJoined);
      socket.current.off(EVENTS.GAME_LEFT, handleGameLeft);
      socket.current.off(EVENTS.GAME_UPDATED, handleGameUpdated);
    };
  }, [socket.current, gameState.game, gameState.player]);

  return <WebSocketContext.Provider value={{ joinGame, leaveGame, updateGame }}>{children}</WebSocketContext.Provider>;
}
