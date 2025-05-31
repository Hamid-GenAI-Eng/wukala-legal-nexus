
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("wukala_user", JSON.stringify({ email }));
        toast({
          title: "Login Successful",
          description: "Welcome back to WukalaGPT!",
        });
        navigate("/chatbot");
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-screen pt-16">
        <Card className="w-full max-w-md mx-4 shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/fbaf95e8-9683-46a8-95c7-05355458b3c9.png" 
                alt="WukalaGPT" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800 font-serif">
              Welcome Back
            </CardTitle>
            <p className="text-slate-600">Sign in to your WukalaGPT account</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 font-semibold transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-900 hover:text-blue-700 font-semibold">
                  Sign up here
                </Link>
              </p>
            </div>
            
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  toast({
                    title: "Google Sign-In",
                    description: "Google authentication will be available soon!",
                  });
                }}
              >
                Continue with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
