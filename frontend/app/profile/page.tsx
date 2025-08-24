import BestScore from '@/components/profile/bestScore';
import Header from '@/components/profile/header';
import RecentPerformance from '@/components/profile/recentPerform';
import StatsGrid from '@/components/profile/stats';
import {
  calculateTotalTypingTime,
  getAllTimeBestScores,
  getRecentTests,
} from '@/lib/utils';
import { Test } from '@/constants/type';
import { getalltestbyId } from '@/services/userService';

const ProfilePage = async () => {
  const response = await getalltestbyId('cme9ueg1m0000i8ao0ru3336w');
  const testsData: Test[] = response.data?.data ?? [];

  const testsCompleted = testsData.length;
  const averageWpm = testsCompleted
    ? Math.round(
        testsData.reduce((sum: number, test: Test) => sum + test.wpm, 0) /
          testsCompleted
      )
    : 0;
  const averageAccuracy = testsCompleted
    ? Number(
        (
          testsData.reduce(
            (sum: number, test: Test) => sum + test.accuracy,
            0
          ) / testsCompleted
        ).toFixed(1)
      )
    : 0;

  const data = {
    name: 'TypeMaster',
    image:
      'https://images.app.goo.gl/ctkzHprHqGHCbsGH8',
    stats: {
      averageWpm,
      averageAccuracy,
      testsCompleted,
      totalTimeTyping: calculateTotalTypingTime(testsData),
    },
    allTimeBestScores: getAllTimeBestScores(testsData),
    recentTests: getRecentTests(testsData),
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl p-6 space-y-8">
        <Header image={data.image} name={data.name} />
        <StatsGrid stats={data.stats} />
        <BestScore allTimeBestScores={data.allTimeBestScores} />
        <RecentPerformance recentTests={data.recentTests} />
      </div>
    </main>
  );
};

export default ProfilePage;
