'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/ui/components/card';
import { RoomInput, roomSchema } from '@/config/zvalidate';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/ui/components/button';
import { Input } from '@/ui/components/input';
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { wordOptions } from '@/constants';
import { useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/ui/components/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/select';
import { toast } from 'sonner';

const CreateRoom = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<RoomInput>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: '',
      mode: 'words',
      modeOption: '10',
    },
  });

  const onSubmit = (data: RoomInput) => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const room = await response.json();
        router.push(`/multiplayer/room/${room.code}`);
        toast.success('Room Successfully Created');
      } catch (err) {
        console.log('Room Not Created', err);
        toast.error('Something went wrong!');
      }
    });
  };

  return (
    <Card className="bg-neutral-900/50 border-neutral-800 text-neutral-200 ">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <Plus className="size-8 text-blue-800" />
          <span>Create Room</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Room Name"
                      className="bg-neutral-800 border-neutral-700 text-neutral-200 "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-neutral-800 border-neutral-700 text-neutral-200">
                          <SelectValue placeholder="Select Mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-800 border-neutral-700 text-neutral-200">
                        <SelectItem
                          value={'words'}
                          className="text-neutral-400 cursor-pointer"
                        >
                          Words
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modeOption"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-neutral-800 border-neutral-700 text-neutral-200">
                          <SelectValue placeholder="Select ModeOption" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-neutral-800 border-neutral-700">
                        {wordOptions.map((option) => (
                          <SelectItem
                            key={option}
                            value={String(option)}
                            className="text-neutral-400 cursor-pointer"
                          >
                            {option} words
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              size="lg"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus />
                  Create Room
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateRoom;
