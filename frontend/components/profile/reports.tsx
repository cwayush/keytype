import { Activity, BarChart3, Clock, Target } from 'lucide-react';
import { ReportsGridProps } from '@/constants/type';
import  ReportCard  from './reportCard';

export const ReportsGrid = ({ stats }: ReportsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <ReportCard
        icon={<Activity className="size-8 mr-2 text-sky-400" />}
        title="Average WPM"
        value={stats.averageWpm}
      />
      <ReportCard
        icon={<Target className="size-8 mr-2 text-blue-800" />}
        title="Average Accuracy"
        value={`${stats.averageAccuracy}%`}
      />
      <ReportCard
        icon={<BarChart3 className="size-8 mr-2 text-amber-400" />}
        title="Tests Completed"
        value={stats.testsCompleted}
      />
      <ReportCard
        icon={<Clock className="size-8 mr-2 text-violet-400" />}
        title="Total TypingTime"
        value={stats.totalTimeTyping}
      />
    </div>
  );
};
