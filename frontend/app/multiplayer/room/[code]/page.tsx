'use client';

import Members from '@/components/multiplayer/roomCode/member/members';
import Header from '@/components/multiplayer/roomCode/header';
import { useEffect, useState, use, useCallback } from 'react';
import Compe from '@/components/multiplayer/roomCode/compe';
import Chat from '@/components/multiplayer/roomCode/chat';
import { Room, Member } from '@/constants/type';
import { LoaderPinwheel } from 'lucide-react';
import { useSession } from 'next-auth/react';
import useSocket from '@/hooks/useSocket';
import { motion } from 'framer-motion';

const containerVarients = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVarients = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Instead of session?.user
//http://localhost:5000/room/code/RM-105

const RoomPage = (props: { params: Promise<{ code: string }> }) => {
  const { code } = use(props.params);

  const { data: session, status } = useSession();
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [isRaceStarted, setIsRaceStarted] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [raceText, setRaceText] = useState<string>('');

  const socket = useSocket();

  useEffect(() => {
    const getRoomData = async () => {
      const response = await fetch(`/api/room/${code}`);
      const data = await response.json();
      setRoomData(data);
    };

    if (code) {
      getRoomData();
    }
  }, [code]);

  const joinRoom = useCallback(() => {
    if (status === 'loading') return;
    if (!session?.user || !socket) return;

    socket.send(
      JSON.stringify({
        type: 'JOIN_ROOM',
        userId: session?.user?.id,
        roomCode: code,
        userData: {
          name: session?.user?.name,
          image: session?.user?.image,
        },
      })
    );

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case 'ROOM_MEMBERS':
          setMembers(data.members);
          break;

        case 'START_RACE':
          setIsRaceStarted(true);
          setRaceText(data.text);
          break;

        case 'PROGRESS_UPDATE':
          setMembers((prevMembers) => {
            return prevMembers.map((member) =>
              member.id === data.userId
                ? {
                    ...member,
                    progress: {
                      wpm: data.progress.wpm,
                      accuracy: data.progress.accuracy,
                      progress: data.progress.progress,
                    },
                  }
                : member
            );
          });
          break;
      }
    };
  }, [code, socket, isRaceStarted, status]);

  useEffect(() => {
    joinRoom();
  }, [joinRoom]);

  if (status === 'loading') {
    return (
      <div className="h-screen grid place-items-center">
        <LoaderPinwheel className="animate-spin mx-auto size-10 text-yellow-400" />
      </div>
    );
  }

  const isHost = members.some(
    (member) => member.id === session?.user?.id && member.isHost
  );

  if (!roomData) {
    return <div>Loading room data...</div>;
  }

  return (
    <motion.div
      variants={containerVarients}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
        <Header
          roomData={roomData}
          isHost={isHost}
          isRaceStarted={isRaceStarted}
        />
        <motion.div
          variants={itemVarients}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {isRaceStarted ? (
            <Compe
              members={members}
              isRaceStarted={isRaceStarted}
              setIsRaceStarted={setIsRaceStarted}
              roomData={roomData}
              raceText={raceText}
            />
          ) : (
            <>
              <Chat code={code} />
              <Members members={members} />
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoomPage;
