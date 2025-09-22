import useWsStore from "@/store/useWsStore";
import { useEffect, useState } from "react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { setWsRef } = useWsStore((state) => state);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("✅ WebSocket connected:", WS_URL);
      setWsRef(ws);
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("❌ WebSocket closed");
      setSocket(null);
    };

    ws.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};

export default useSocket;
