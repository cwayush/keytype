'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/UI/components/card';
import { ScrollArea } from '@/UI/components/scrollarea';
import { MembersProps } from '@/constants/type';
import MemberAvatar from './memberAvatar';
import { User } from 'lucide-react';

const Members = ({ members }: MembersProps) => {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-3 text-neutral-200 text-2xl">
          <User className="size-8 text-sky-400" />
          Typists ({Members.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[460px]">
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-center p-2 rounded-lg hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MemberAvatar name={member.name} image={member.image || ''} />
                  <div>
                    <p className="font-medium text-neutral-200">
                      {member.name}
                    </p>
                    {member.isHost && (
                      <span className="text-xs text-violet-400">Host</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Members;
