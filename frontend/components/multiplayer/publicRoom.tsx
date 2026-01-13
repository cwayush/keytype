import { Card, CardContent } from "@/ui/components/card";
import { ScrollArea } from "@/ui/components/scrollarea";
import { Hourglass, Loader2, Type } from "lucide-react";
import { Button } from "@/ui/components/button";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Room } from "@/constants/type";
import { toast } from "sonner";
import { joinRoom } from "@/actions/rooms";

const PublicRoom = ({ rooms }: { rooms: Room[] }) => {
  const [isPending, startTransition] = useTransition();
  const [roomId, setRoomId] = useState<string | null>(null);
  const router = useRouter();

  const handleJoinRoom = async (roomCode: string, roomId: string) => {
    setRoomId(roomId);
    startTransition(async () => {
      try {
        const result = await joinRoom({ code: roomCode });

        if (!result.ok) {
          toast.error(result.data.error || "Room Not Found");
          return;
        }

        router.push(`/multiplayer/room/${roomCode}`);
        toast.success("Joined room successfully!");
      } catch (error) {
        console.log("Failed to join room", error);
        toast.error("Failed to join room");
      } finally {
        setRoomId(null);
      }
    });
  };

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="bg-neutral-900/50 border-neutral-800 text-neutral-200"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4 text-lg ">
                <h3 className=" text-neutral-200">{room.name}</h3>
                <p className="text-blue-800 flex items-center">
                  {room.mode === "words" ? (
                    <>
                      <Type className="size-5 mr-2" />
                      {room.modeOption} words
                    </>
                  ) : (
                    <>
                      <Hourglass className="size-5 mr-2" />
                      {room.modeOption} seconds
                    </>
                  )}
                </p>
              </div>
              <Button
                size="lg"
                className="from-violet-500 to-violet-600 hover:from-violet-700 hover:to-violet-800"
                onClick={() => handleJoinRoom(room.code, room.id)}
                disabled={isPending && roomId === room.id}
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
        {rooms.length === 0 && (
          <div className="text-center text-neutral-400">No rooms available</div>
        )}
      </div>
    </ScrollArea>
  );
};

export default PublicRoom;
