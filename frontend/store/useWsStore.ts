import { create } from 'zustand';

type wsStore = {
  wsref: WebSocket | null;
  setWsRef: (ws: WebSocket) => void;
};

const useWsStore = create<wsStore>((set) => ({
  wsref: null,
  setWsRef: (ws: WebSocket) => {
    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      set({ wsref: null });
    };
    set({ wsref: ws });
  },
}));

export default useWsStore;
