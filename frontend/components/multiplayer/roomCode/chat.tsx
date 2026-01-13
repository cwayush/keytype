import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/card";
import { ChatMessageProps, ChatProps, Message } from "@/constants/type";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/ui/components/avatar";
import { ScrollArea } from "@/ui/components/scrollarea";
import { AvatarImage } from "@radix-ui/react-avatar";
import { MessageSquare, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import useWsStore from "@/store/useWsStore";
import { v4 as uidv4 } from "uuid";

const Chat = ({ code }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { wsref } = useWsStore((state) => state);

  const { data: session } = useSession();

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!inputMessage.trim() || !wsref || !session?.user) return;

      wsref.send(
        JSON.stringify({
          type: "SEND_MESSAGE",
          userId: session?.user.id,
          roomCode: code,
          messages: inputMessage.trim(),
        })
      );
      setInputMessage("");
    },
    [inputMessage, wsref, session, code]
  );

  useEffect(() => {
    if (!wsref) return;

    const handleWebMessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      if (data.type === "MESSAGE") {
        setMessages((prev) => [
          ...prev,
          {
            id: uidv4(),
            sender: {
              name: data.userData.name,
              image: data.userData.image,
            },
            text: data.message,
          },
        ]);
        setTimeout(scrollToBottom, 100);
      }
    };
    wsref.addEventListener("message", handleWebMessage);
    return () => wsref.removeEventListener("message", handleWebMessage);
  }, [wsref, scrollToBottom]);

  return (
    <Card className="lg:col-span-2 bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-3 text-neutral-200 text-2xl">
          <MessageSquare className="size-8 text-blue-800" />
          Chat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ScrollArea className="h-[460px] pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here"
              className="bg-neutral-800 border-neutral-700 text-neutral-200"
            />
            <Button type="submit" size="icon" disabled={!inputMessage.trim()}>
              <Send />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;

const ChatMessage = ({ message }: ChatMessageProps) => {
  const initials =
    message.sender.name.split(" ").length === 1
      ? message.sender.name[0]
      : message.sender.name
          .split(" ")
          .map((part: string) => part[0])
          .join("");
  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={message.sender.image!} alt={message.sender.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="flex itmes-center gap-2">
          <span className="font-medium text-neutral-200">
            {message.sender.name}
          </span>
        </div>
        <p className="text-neutral-300">{message.text}</p>
      </div>
    </div>
  );
};
