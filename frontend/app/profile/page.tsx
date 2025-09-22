import BestScore from "@/components/profile/bestScore";
import Header from "@/components/profile/header";
import RecentPerformance from "@/components/profile/recentPerform";
import { ReportsGrid } from "@/components/profile/reports";
import { getProfileData } from "@/actions/profile";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const { data } = await getProfileData();

  // If no user found, you can redirect to a 404 page or show a message
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">No profile data found.</h1>
      </div>
    );
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl p-6 space-y-8">
        <Header image={data.image} name={data.name} />
        <ReportsGrid stats={data.stats} />
        <BestScore allTimeBestScores={data.allTimeBestScores} />
        <RecentPerformance recentTests={data.recentTests} />
      </div>
    </main>
  );
};

export default ProfilePage;
