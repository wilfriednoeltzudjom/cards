import { useContext } from 'react';

import { WebSocketContext } from '../providers/WebSocket';

export default function () {
  const ws = useContext(WebSocketContext);

  return ws;
}
