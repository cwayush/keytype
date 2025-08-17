import { CompeProps } from '@/constants/type';
import { Card, CardContent } from '@/UI/components/card';
import Interface from './interface';
import MemberProgress from './member/memberProgress';

const Compe = ({
  members,
  //   isRaceStarted,
  //   setIsRaceStarted,
  roomData,
  raceText,
}: CompeProps) => {
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
        onProgress={onProgress}
      />
    </div>
  );
};
export default Compe;
