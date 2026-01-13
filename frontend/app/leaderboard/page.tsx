"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import { ScrollArea } from "@/ui/components/scrollarea";
import { LeaderboardDataType } from "@/constants/type";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { Badge } from "@/ui/components/bages";
import { motion } from "framer-motion";
import { modes, RankIcon } from "@/constants";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/table";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  CrownIcon,
  Hourglass,
  Loader,
} from "lucide-react";
import { fetchLeaderboard } from "@/actions/leaderboard";

function LeaderBoard() {
  const [countdown, setCountDown] = useState(30);
  const [isAllTime, setIsAllTime] = useState(true);
  const [selectedMode, setSelectedMode] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardDataType[]>(
    []
  );

  const fetchUsersData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setCountDown(30);
      const timeFrame = isAllTime ? "alltime" : "daily";
      const leaderboard = await fetchLeaderboard({
        selectedMode,
        timeFrame,
        limit: 10,
      });

      setLeaderboardData(leaderboard);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to fetch leaderboard");
      setLeaderboardData([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAllTime, selectedMode]);

  useEffect(() => {
    fetchUsersData();
    const countdownInterval = setInterval(() => {
      setCountDown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    const fetchInterval = setInterval(() => {
      fetchUsersData();
    }, 30000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(fetchInterval);
    };
  }, [isAllTime, selectedMode, fetchUsersData]);

  const filteredData = leaderboardData.filter((entry) =>
    entry?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const containerVariants = {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8 mt-7"
    >
      <motion.div variants={itemVariants}>
        <Card className="bg-neutral-900/50 border-neutral-800 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <CardTitle className="text-xl sm:text-2xl flex items-center space-x-3 text-neutral-200">
                <CrownIcon className="size-6 sm:size-8 text-yellow-400/70" />
                <span>Leaderboard</span>
                <Badge
                  variant="secondary"
                  className="text-xs sm:text-sm border-2 border-red-400"
                >
                  Updates in {countdown}s
                </Badge>
              </CardTitle>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="w-full flex items-center space-x-1 bg-neutral-800 rounded-md p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full text-xs sm:text-sm ${
                      isAllTime
                        ? "bg-neutral-700 text-blue-400"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setIsAllTime(true)}
                  >
                    <Activity className="size-3 sm:size-4 mr-1" />
                    All-Time
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full text-xs sm:text-sm ${
                      !isAllTime
                        ? "bg-neutral-700 text-blue-400"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setIsAllTime(false)}
                  >
                    <Hourglass className="size-3 sm:size-4 mr-1" />
                    Daily
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-neutral-800 border-neutral-700 text-blue-400 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      {selectedMode === "all"
                        ? "All Modes"
                        : selectedMode.charAt(0).toUpperCase() +
                          selectedMode.slice(1)}
                      <ChevronDown className="ml-2 size-3 sm:size-4 text-neutral-200" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-neutral-800 border-neutral-700">
                    <DropdownMenuItem
                      className="text-neutral-400 min-w-full hover:bg-neutral-900/50 cursor-pointer"
                      onClick={() => setSelectedMode("all")}
                    >
                      All Modes
                    </DropdownMenuItem>
                    {modes.map((mode) => (
                      <DropdownMenuItem
                        key={mode}
                        className="text-neutral-400 min-w-full cursor-pointer hover:bg-neutral-900/50"
                        onClick={() => setSelectedMode(mode)}
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-neutral-800 border-neutral-700 text-gray-100 w-full"
              />
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <Loader className="animate-spin mx-auto size-10 text-blue-700" />
              ) : error ? (
                <div className="text-red-400 text-center py-8">{error}</div>
              ) : (
                <ScrollArea className="h-[300px] pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-300">Rank</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">WPM</TableHead>
                        <TableHead className="text-gray-300 hidden sm:table-cell">
                          Accuracy
                        </TableHead>
                        <TableHead className="text-gray-300 hidden md:table-cell">
                          Time
                        </TableHead>
                        <TableHead className="text-gray-300 hidden lg:table-cell">
                          Mode
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((entry) => (
                        <TableRow
                          key={entry.rank}
                          className="hover:bg-neutral-800"
                        >
                          <TableCell className="text-gray-100">
                            <RankIcon rank={entry.rank} />
                          </TableCell>
                          <TableCell className="text-gray-100">
                            {entry.name}
                          </TableCell>
                          <TableCell className="text-blue-600">
                            {entry.wpm}
                          </TableCell>
                          <TableCell className="text-green-400/80 hidden sm:table-cell">
                            {entry.accuracy}%
                          </TableCell>
                          <TableCell className="text-gray-100 hidden md:table-cell">
                            {entry.time}
                          </TableCell>
                          <TableCell className="text-gray-100 hidden lg:table-cell">
                            {entry.mode}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div variants={itemVariants} className="flex justify-center">
        <Button size="lg" asChild className="w-full sm:w-auto">
          <Link href="/type">
            New Race
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default LeaderBoard;
