import { Card, CardContent } from "@/ui/components/card";
import MemberProgress from "./member/memberProgress";
import { useCallback, useEffect } from "react";
import { CompeProps } from "@/constants/type";
import { useSession } from "next-auth/react";
import useWsStore from "@/store/useWsStore";
import Interface from "./interface";

const Compe = ({
  members,
  isRaceStarted,
  setIsRaceStarted,
  roomData,
  raceText,
}: CompeProps) => {
  const { wsref } = useWsStore((state) => state);

  const { data: session } = useSession();

  useEffect(() => {
    let isTypingFinished = false;

    if (members.length > 0) {
      isTypingFinished = members.every(
        (member) => member.progress?.progress === 100
      );
    }

    if (isTypingFinished) {
      setTimeout(() => {
        setIsRaceStarted(true);
      }, 5000);
    }
  }, [members, setIsRaceStarted]);

  const progUpdate = useCallback(
    (wpm: number, accuracy: number, progress: number) => {
      if (!roomData?.code || !session?.user?.id) return;

      if (isRaceStarted && wsref?.readyState === WebSocket.OPEN) {
        try {
          wsref.send(
            JSON.stringify({
              type: "UPDATE_PROGRESS",
              userId: session?.user.id,
              roomCode: roomData.code,
              progress: {
                wpm,
                accuracy,
                progress,
              },
            })
          );
        } catch (err) {
          console.log("Error updating progress:", err);
        }
      }
    },
    [isRaceStarted, roomData.code, session?.user?.id, wsref]
  );

  if (!roomData) return null;

  const sortedMembers = [...members].sort((a, b) => {
    const progressA = a.progress?.progress || 0;
    const progressB = b.progress?.progress || 0;
    return progressB - progressA;
  });

  return (
    <div className="lg:col-span-3">
      <Card className="bg-neutral-900/50 border-neutral-800 mb-6">
        <CardContent className="space-y-4 p-6">
          {sortedMembers.map((memeber) => (
            <MemberProgress key={memeber.id} member={memeber} />
          ))}
        </CardContent>
      </Card>
      <Interface
        mode={roomData.mode}
        modeOption={roomData.modeOption}
        text={raceText}
        onProgress={progUpdate}
      />
    </div>
  );
};
export default Compe;
