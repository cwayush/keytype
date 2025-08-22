import useWsStore from '@/store/useWsStore';
import { useEffect, useState } from 'react';

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { setWsRef } = useWsStore();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setWsRef(ws);
      setSocket(ws);
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setSocket(null);
    };

    return () => {
      ws.close();
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };
  }, []);

  return socket;
};

export default useSocket;
