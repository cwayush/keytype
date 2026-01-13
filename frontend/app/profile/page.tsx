"use client";

import { useEffect, useState } from "react";
import BestScore from "@/components/profile/bestScore";
import Header from "@/components/profile/header";
import RecentPerformance from "@/components/profile/recentPerform";
import { ReportsGrid } from "@/components/profile/reports";
import { getProfileData } from "@/actions/profile";
import { AILoader } from "@/components/typing/reusecomp";

const ProfilePage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileData();
        setData(res.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <AILoader message="Getting things ready for you… 🚀" />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          {error ?? "No profile data found"}
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 ">
      <div className="w-full max-w-5xl p-6 space-y-8 ">
        <Header image={data.image} name={data.name} />
        <ReportsGrid stats={data.stats} />
        <BestScore allTimeBestScores={data.allTimeBestScores} />
        <RecentPerformance recentTests={data.recentTests} />
      </div>
    </main>
  );
};

export default ProfilePage;
