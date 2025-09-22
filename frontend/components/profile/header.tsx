import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/ui_temp/components/avatar';
import { ProfileHeaderProps } from '@/constants/type';

const Header = ({ image, name }: ProfileHeaderProps) => {
  return (
    <header className="flex items-center space-x-4">
      <div className="rounded-full bg-gradient-to-r from-blue-700 to-emerald-700 p-[4px]">
        <Avatar className="size-20 rounded-full bg-neutral-900">
          <AvatarImage src={image} />
          <AvatarFallback>
            {name.split(' ').length === 1
              ? name?.[0]
              : name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
          </AvatarFallback>
        </Avatar>
      </div>

      <h1 className="text-3xl font-bold text-neutral-200">{name}</h1>
    </header>
  );
};

export default Header;
