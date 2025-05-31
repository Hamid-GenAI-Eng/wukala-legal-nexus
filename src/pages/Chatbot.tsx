
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to WukalaGPT! I'm your AI legal assistant specializing in Pakistani law. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState("LegalGPT-PK");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([
    { id: "1", title: "Welcome Chat", date: new Date() }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("wukala_user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your question about "${inputText}". As your AI legal assistant for Pakistani law, I can help you understand various legal matters. This is a demo response using ${selectedModel}. In a full implementation, this would provide detailed legal guidance based on Pakistani law.`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice input feature will be available soon!",
    });
  };

  const handleAssistantMode = () => {
    toast({
      title: "Assistant Mode",
      description: "Full-screen voice assistant with 3D avatar coming soon!",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("wukala_user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        conversations={conversations}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/fbaf95e8-9683-46a8-95c7-05355458b3c9.png" 
                alt="WukalaGPT" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-2xl font-bold text-slate-800 font-serif">
                Wukala<span className="text-blue-900">GPT</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select AI Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LegalGPT-PK">LegalGPT-PK</SelectItem>
                  <SelectItem value="OpenAI GPT-4">OpenAI GPT-4</SelectItem>
                  <SelectItem value="Claude Legal">Claude Legal</SelectItem>
                  <SelectItem value="Gemini Pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="border-blue-900 text-blue-900 hover:bg-blue-50"
              >
                Apply Model
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-3xl bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-900 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-900 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-900 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-slate-500 text-sm">WukalaGPT is thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="outline"
              onClick={handleFileUpload}
              className="flex items-center space-x-2"
            >
              <span>📎</span>
              <span>Add File</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleVoiceInput}
              className="flex items-center space-x-2"
            >
              <span>🎤</span>
              <span>Voice Input</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleAssistantMode}
              className="flex items-center space-x-2 bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
            >
              <span>👋</span>
              <span>Assistant Mode</span>
            </Button>
          </div>
          
          <div className="flex space-x-4">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything about Pakistani law..."
              className="flex-1 text-lg py-3"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            toast({
              title: "File Upload",
              description: `File "${file.name}" ready for analysis!`,
            });
          }
        }}
      />
    </div>
  );
};

export default Chatbot;
