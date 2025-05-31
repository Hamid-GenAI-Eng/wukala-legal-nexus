
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Conversation {
  id: string;
  title: string;
  date: Date;
}

interface SidebarProps {
  conversations: Conversation[];
  onLogout: () => void;
}

export const Sidebar = ({ conversations, onLogout }: SidebarProps) => {
  const user = JSON.parse(localStorage.getItem("wukala_user") || "{}");

  return (
    <div className="w-80 bg-slate-800 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold mb-2">Legal Conversations</h2>
        <p className="text-slate-300 text-sm">Your AI legal assistant history</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversations.map((conversation) => (
          <Card key={conversation.id} className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <h3 className="font-semibold text-white mb-1">{conversation.title}</h3>
              <p className="text-slate-300 text-sm">
                {conversation.date.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
        
        <Button 
          variant="outline" 
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          + New Conversation
        </Button>
      </div>
      
      <div className="p-4 border-t border-slate-700">
        <div className="mb-4 text-center">
          <p className="text-slate-300 text-sm">Signed in as</p>
          <p className="text-white font-semibold">{user.name || user.email}</p>
        </div>
        
        <Button 
          onClick={onLogout}
          variant="outline" 
          className="w-full border-slate-600 text-slate-300 hover:bg-red-600 hover:text-white hover:border-red-600"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
