import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/tabs";
import { Hourglass, Trophy, Type } from "lucide-react";
import { BestScoresProps } from "@/constants/type";
import ReportCard from "./reportCard";

const BestScore = ({ allTimeBestScores }: BestScoresProps) => {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader className="pb-1">
        <CardTitle className="flex items-center space-x-3 sm:text-2xl text-md">
          <Trophy className="size-8 text-yellow-400" />
          <span className="text-neutral-200">Best Performance Records</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="words" className="w-full">
          <TabsList
            className="w-full mt-3 grid grid-cols-2 gap-2
             bg-neutral-900/60 px-2 py-2
             rounded-md border border-neutral-700/50  shadow-md"
          >
            <TabsTrigger
              value="words"
              className="h-9 px-4 rounded-md
             inline-flex items-center justify-center
             text-sm font-medium text-neutral-300
             transition-all
             data-[state=active]:bg-neutral-700
             data-[state=active]:text-blue-400
             data-[state=active]:shadow-inner"
            >
              <Type className="mr-2 size-5" />
              Words Mode
            </TabsTrigger>

            <TabsTrigger
              value="time"
              className="h-9 px-4 rounded-md
             inline-flex items-center justify-center
             text-sm font-medium text-neutral-300
             transition-all
             data-[state=active]:bg-neutral-700
             data-[state=active]:text-blue-400
             data-[state=active]:shadow-inner"
            >
              <Hourglass className="mr-2 size-5" />
              Time Mode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="words">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <ReportCard
                icon={<Type className="size-6 sm:size-8 text-violet-400" />}
                title="10 Words"
                value={`${allTimeBestScores.words["10"]} WPM`}
              />
              <ReportCard
                icon={<Type className="size-6 sm:size-8 text-violet-400" />}
                title="25 Words"
                value={`${allTimeBestScores.words["25"]} WPM`}
              />
              <ReportCard
                icon={<Type className="size-6 sm:size-8 text-violet-400" />}
                title="50 Words"
                value={`${allTimeBestScores.words["50"]} WPM`}
              />
            </div>
          </TabsContent>

          <TabsContent value="time">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <ReportCard
                icon={<Hourglass className="size-6 sm:size-8 text-sky-400" />}
                title="15 Seconds"
                value={`${allTimeBestScores.time["15s"]} WPM`}
              />
              <ReportCard
                icon={<Hourglass className="size-6 sm:size-8 text-sky-400" />}
                title="30 Seconds"
                value={`${allTimeBestScores.time["30s"]} WPM`}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BestScore;
