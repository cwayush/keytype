import {
  Activity,
  Bolt,
  ChartNoAxesCombined,
  Crown,
  Keyboard,
  Swords,
  User,
  Zap,
} from "lucide-react";
import { FaAward, FaMedal, FaTrophy } from "react-icons/fa";

export const NAVLINKS = [
  {
    id: 1,
    name: "Type",
    href: "/type",
    icon: Keyboard,
  },
  {
    id: 2,
    name: "Multiplayer",
    href: "/multiplayer",
    icon: Swords,
  },
  {
    id: 3,
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Crown,
  },
  {
    id: 4,
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export const FeaturesData = [
  {
    icon: <Activity className="size-10 text-red-400" />,
    title: "Instant Typing Feedback",
    description: "See your speed and accuracy improve with real-time insights.",
  },
  {
    icon: <Swords className="size-10 text-blue-500" />,
    title: "Race Your Friends",
    description:
      "Challenge friends in live typing battles and see who types fastest.",
  },
  {
    icon: <ChartNoAxesCombined className="size-10 text-orange-400" />,
    title: "In-Depth Progress Reports",
    description:
      "Monitor your typing growth with detailed statistics over time.",
  },
  {
    icon: <Bolt className="size-10 text-purple-500" />,
    title: "Flexible Typing Modes",
    description: "Select from multiple modes tailored to your practice style.",
  },
  {
    icon: <Zap className="size-10 text-teal-400" />,
    title: "Clean & Focused Design",
    description: "Type in a distraction-free interface made for maximum focus.",
  },
];

export const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1)
    return <FaTrophy className="size-4 sm:size-5 text-yellow-400" />;
  if (rank === 2) return <FaMedal className="size-4 sm:size-5 text-gray-300" />;
  if (rank === 3)
    return <FaAward className="size-4 sm:size-5 text-orange-500" />;
  return <span className="ml-1">{rank}</span>;
};

export const ReviewsData = [
  {
    name: "Aarav K.",
    username: "aarav_k",
    image: "",
    tweet:
      "I never thought practicing typing could feel this addictive. My accuracy has improved way more than I expected!",
  },
  {
    name: "Sophia M.",
    username: "sophia_m",
    image: "",
    tweet:
      "The clean design and smooth interface make me want to practice every single day. It feels like a game, not work.",
  },
  {
    name: "James P.",
    username: "james_p",
    image: "",
    tweet:
      "I used to hate typing tests, but the challenges here actually make me excited to compete with my friends!",
  },
  {
    name: "Liam W.",
    username: "liam_w",
    image: "",
    tweet:
      "Within just two weeks, my typing speed jumped from 55 WPM to 90 WPM. The progress tracking really keeps me motivated.",
  },
  {
    name: "Isabella C.",
    username: "isabella_c",
    image: "",
    tweet:
      "I love how it gives instant feedback on mistakes. It's like having a personal coach for typing right on my screen.",
  },
];

export const messages = [
  "Training neurons… please don’t blink 👀",
  "Crunching keystrokes like popcorn 🍿",
  "Finding your weak keys ⌨️",
  "AI typing coach warming up ☕",
  "Building your personalized drill 🚀",
];

export const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Contact Us", href: "/" },
];

export const modes = ["words", "time"];
export const timeOptions = [15, 30];
export const wordOptions = [10, 25, 50];

export const DEFAULT_TEST_MODE = "time";
export const DEFAULT_TEST_MODE_OPTION = 15;

export const publicRoutes = [
  "/",
  "/leaderboard",
  "/type",
  "/api/leaderboard",
  "/api/stats",
  "/privacy-policy",
  "/terms-and-conditions",
];

export const authRoutes = ["/auth", "/auth/verification"];
export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/type";
