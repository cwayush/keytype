import Compe from '@/components/multiplayer/roomCode/compe';
import Header from '@/components/multiplayer/roomCode/header';
import Members from '@/components/multiplayer/roomCode/member/members';
import { motion } from 'framer-motion';

const containerVarients = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVarients = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const RoomPage = () => {
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
            <Members members={} />
          )}
        </motion.div> */}
      </div>
    </motion.div>
  );
};

export default RoomPage;
