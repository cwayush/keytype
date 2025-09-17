import { Copy, Hash, Hourglass, PlayCircle, Type } from 'lucide-react';
import { MultiplayerHeaderProps } from '@/constants/type';
import { generateRandomWords } from '@/lib/utils';
import { Button } from '@/UI/components/button';
import { useSession } from 'next-auth/react';
import useWsStore from '@/store/useWsStore';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { toast } from 'sonner';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Header = ({
  roomData,
  isHost,
  isRaceStarted,
}: MultiplayerHeaderProps) => {
  const { wsref } = useWsStore((state) => state);
  const { data: session } = useSession();

  const handleStartTest = useCallback(() => {
    if (!roomData || !session?.user?.id) return;
    if (wsref?.readyState === WebSocket.OPEN) {
      try {
        const text = generateRandomWords(
          roomData.mode === 'words'
            ? roomData.modeOption
            : roomData.modeOption * 2
        );

        wsref.send(
          JSON.stringify({
            type: 'START_RACE',
            userId: session?.user.id,
            roomCode: roomData.code,
            text,
          })
        );
      } catch (err) {
        console.log('Error starting race:', err);
        toast.error('Failed to start race. Please try again.');
      }
    } else {
      toast.error('Connection lost. Reconnecting...');
    }
  }, [wsref, roomData, session?.user?.id]);

  const handleCopyInvite = useCallback(() => {
    if (!roomData) return;

    try {
      const inviteURL = `${window.location.origin}/multiplayer/room/${roomData.code}`;
      navigator.clipboard.writeText(inviteURL);
      toast.success('Invite link copied to clipboard');
    } catch (err) {
      console.error('Error copying invite link:', err);
      toast.error('Error copying invite');
    }
  }, [roomData]);

  if (!roomData) return null;

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-8 pb-4 border-b border-neutral-800"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-neutral-200 flex items-center gap-x-3">
          {roomData.name} |{' '}
          {roomData.mode === 'words' ? (
            <>
              <Type className="size-5 mr-2" />
              {roomData.modeOption} words
            </>
          ) : (
            <>
              <Hourglass className="size-5 mr-2" />
              {roomData.modeOption} seconds
            </>
          )}
        </h1>
        <div className="flex items-center gap-4 text-neutral-400">
          <div className="flex items-center gap-2">
            <Hash className="size-5" />
            <span>Room Code: {roomData.code}</span>
            <Button
              size="icon"
              variant="ghost"
              className="text-neutral-400 hover:text-violet-400"
              onClick={handleCopyInvite}
              aria-label="Copy Invite Link"
            >
              <Copy className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        {isHost && (
          <Button size="lg" disabled={isRaceStarted} onClick={handleStartTest}>
            <PlayCircle />
            {isRaceStarted ? 'Join Race' : 'Start Race'}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
