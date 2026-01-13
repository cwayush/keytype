import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import { Form, FormControl, FormField, FormItem } from "@/ui/components/form";
import { JoinRoomInput, joinRoomSchema } from "@/config/zvalidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";
import { joinRoom } from "@/actions/rooms";

const JoinRoom = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<JoinRoomInput>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: JoinRoomInput) => {
    startTransition(async () => {
      const result = await joinRoom({ code: data.code });

      if (!result.ok) {
        toast.error(result.data.error || "Room Not Found");
        return;
      }

      router.push(`/multiplayer/room/${data.code}`);
      toast.success("Room Successfully Joined");
    });
  };

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
