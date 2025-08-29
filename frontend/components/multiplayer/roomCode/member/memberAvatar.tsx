import { Avatar, AvatarFallback, AvatarImage } from '@/UI/components/avatar';
import { MemberAvatarProps } from '@/constants/type';

const MemberAvatar = ({ name, image }: MemberAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={image || ''} alt={name} />
      <AvatarFallback>
        {name.split(' ').length === 1
          ? name[0]
          : name
              .split(' ')
              .map((part) => part[0])
              .join('')}
      </AvatarFallback>
    </Avatar>
  );
};

export default MemberAvatar;
