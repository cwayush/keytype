'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/ui_temp/components/card';
import CreateRoom from '@/components/multiplayer/createRoom';
import PublicRoom from '@/components/multiplayer/publicRoom';
import { useEffect, useState, useTransition } from 'react';
import JoinRoom from '@/components/multiplayer/joinRoom';
import { Hash, LoaderPinwheel } from 'lucide-react';
import { Room } from '@/constants/type';
import { motion } from 'framer-motion';

const containerVarient = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Multiplayer = () => {
  const [isPending, startTransition] = useTransition();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/room');
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        console.log('Error fetching rooms', err);
      }
    };
    startTransition(() => {
      fetchRooms();
    });

    const interval = setInterval(fetchRooms, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={containerVarient}
      initial="hidden"
      animate="visible"
      className="min-h-screen text-neutral-200"
    >
      <div className="w-full max-w-5xl mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center pt-8"
        >
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">Multiplayer Arena</h1>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <CreateRoom />
          <JoinRoom />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Hash className="size-8 text-violet-400" />
                <span>Public Room</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <LoaderPinwheel className="animate-spin mx-auto size-10 " />
              ) : (
                <PublicRoom rooms={rooms} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Multiplayer;
