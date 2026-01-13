import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/avatar";
import { MemberProgressProps } from "@/constants/type";

const MemberProgress = ({ member }: MemberProgressProps) => {
  const wpm = member.progress?.wpm || 0;
  const accuracy = member.progress?.accuracy || 0;
  const progress = member.progress?.progress || 0;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={member.image || ""} alt={member.name} />
          <AvatarFallback>
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-neutral-200">{member.name}</p>
          <div className="text-sm text-neutral-400">
            {wpm > 0 && (
              <span className="text-blue-800">{Math.round(wpm)} WPM</span>
            )}
            {accuracy > 0 && (
              <span className="text-violet-400">{Math.round(accuracy)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-blue-800 to-emerald-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MemberProgress;
