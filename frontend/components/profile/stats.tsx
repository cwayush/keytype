import { Activity, BarChart3, Clock, Target } from 'lucide-react';
import { StatsGridProps } from '@/constants/type';
import StatusCard from './resCard';

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatusCard
        icon={<Activity className="size-8 mr-2 text-sky-400" />}
        title="Average WPM"
        value={stats.averageWpm}
      />
      <StatusCard
        icon={<Target className="size-8 mr-2 text-blue-800" />}
        title="Average Accuracy"
        value={`${stats.averageAccuracy}%`}
      />
      <StatusCard
        icon={<BarChart3 className="size-8 mr-2 text-amber-400" />}
        title="Tests Completed"
        value={stats.testsCompleted}
      />
      <StatusCard
        icon={<Clock className="size-8 mr-2 text-violet-400" />}
        title="Total TypingTime"
        value={stats.totalTimeTyping}
      />
    </div>
  );
};

export default StatsGrid;
