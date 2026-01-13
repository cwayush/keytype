import { JoinRoomInput, RoomInput } from "@/config/zvalidate";

export const createRoom = async (data: RoomInput) => {
  try {
    const res = await fetch("/api/room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Room creation failed", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Room API error:", err);
    return null;
  }
};

export const fetchRooms = async () => {
  try {
    const res = await fetch("/api/room", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch rooms");
    }

    return await res.json();
  } catch (err) {
    console.error("Room fetch failed:", err);
    return [];
  }
};

export const fetchRoomByCode = async (code: string) => {
  if (!code) return null;

  try {
    const res = await fetch(`/api/room/${code}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Room not found");
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to fetch room:", err);
    return null;
  }
};

export const joinRoom = async ({ code }: JoinRoomInput) => {
  try {
    const res = await fetch(`/api/room/${code}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return {
      ok: res.ok,
      data,
    };
  } catch (err) {
    console.error("Failed to join room:", err);
    return {
      ok: false,
      data: { error: "Network error" },
    };
  }
};
