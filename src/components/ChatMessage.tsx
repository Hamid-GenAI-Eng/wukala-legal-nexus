
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <Card className={`max-w-3xl ${
        message.isUser 
          ? 'bg-blue-900 text-white' 
          : 'bg-white shadow-sm'
      }`}>
        <CardContent className="p-4">
          <p className="text-sm leading-relaxed">{message.text}</p>
          <p className={`text-xs mt-2 ${
            message.isUser ? 'text-blue-200' : 'text-slate-500'
          }`}>
            {message.timestamp.toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
