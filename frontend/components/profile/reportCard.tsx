import { Card, CardContent } from "@/ui/components/card";

const ReportCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}) => {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800 transition-all duration-300 hover:shadow-lg hover:bg-neutral-800/50">
      <CardContent className="flex items-center md:p-6 px-6 py-4 gap-x-2">
        {icon}
        <div className="flex md:flex-col md:gap-0 gap-4 w-full items-center md:justify-center justify-between">
          <p className="text-sm w-fit font-medium text-neutral-400 uppercase">
            {title}
          </p>
          <p className="md:text-2xl w-fit text-xl font-bold text-neutral-200">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
