'use client';

import Compe from '@/components/multiplayer/roomCode/compe';
import Header from '@/components/multiplayer/roomCode/header';
import Members from '@/components/multiplayer/roomCode/member/members';
import Chat from '@/components/multiplayer/roomCode/chat';
import { motion } from 'framer-motion';
import { use } from 'react';
import { Room, Member } from '@/constants/type';

const containerVarients = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVarients = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

//http://localhost:5000/room/code/RM-105

const RoomPage = (props: { params: Promise<{ code: string }> }) => {
  const { code } = use(props.params);

  const [roomData, setRoomData] = useState<Room | null>(null);
  const [isRaceStarted, setIsRaceStarted] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
const [raceText, setRaceText] = useState<string>('');
  return (
    <motion.div
      variants={containerVarients}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* <Header roomData={} isHost={} isRaceStarted={} />
        <motion.div variants={itemVarients}>
          {isRaceStarted ? (
            <Compe
              members={}
              isRaceStarted={}
              setIsRaceStarted={}
              roomData={}
              raceText={}
            />
          ) : (
            <Chat code={} />
            <Members members={} />
          )}
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default RoomPage;
