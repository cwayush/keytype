import { Button } from '@/UI/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/UI/components/card';
import { Form, FormControl, FormField, FormItem } from '@/UI/components/form';
import { Input } from '@/UI/components/input';
import { Loader2, LogIn } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

const JoinRoom = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm();
  return (
    <Card className="bg-neutral-900/50 border-neutral-800 text-neutral-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3 text-2xl">
          <LogIn className="suze-8 text-sky-400" />
          <span>Join Room</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Room Code"
                      className="bg-neutral-800 border-neutral-700 text-neutral-200"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              size="lg"
              variant="secondary"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <LogIn />
                  <span>Join Room</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JoinRoom;
