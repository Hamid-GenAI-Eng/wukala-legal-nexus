
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Hero3D } from "@/components/Hero3D";
import { FeatureCard } from "@/components/FeatureCard";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-emerald-900/10"></div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/lovable-uploads/fbaf95e8-9683-46a8-95c7-05355458b3c9.png" 
                  alt="WukalaGPT Logo" 
                  className="w-16 h-16 object-contain"
                />
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 font-serif">
                  Wukala<span className="text-blue-900">GPT</span>
                </h1>
              </div>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Where law meets dominance
              </p>
              
              <p className="text-lg text-slate-500 leading-relaxed">
                Your AI Legal Assistant for Pakistani Law. Navigate complex legal matters with confidence through our advanced AI chatbot, voice search, document analysis, and multilingual support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Legal Help
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transition-all duration-300">
                    Explore Legal Resources
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4 font-serif">
              Comprehensive Legal Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Empowering legal professionals and citizens with AI-driven tools for Pakistani law
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="AI Legal Assistant"
              description="Get instant answers to your legal questions with our advanced AI chatbot trained on Pakistani law"
              icon="💬"
            />
            <FeatureCard
              title="Voice Search"
              description="Speak your legal queries in English or Urdu and get comprehensive responses"
              icon="🎤"
            />
            <FeatureCard
              title="Document Analysis"
              description="Upload contracts, FIRs, or legal documents for AI-powered analysis and insights"
              icon="📄"
            />
            <FeatureCard
              title="Bilingual Support"
              description="Full support for English and Urdu to serve all Pakistani legal professionals"
              icon="🌐"
            />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 font-serif">
                Secure & Professional Legal Platform
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Blockchain-Encrypted Storage</h3>
                    <p className="text-slate-300">Your legal documents are stored with tamper-proof blockchain encryption</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Legal Content</h3>
                    <p className="text-slate-300">Access curated legal articles, guides, and news in English and Urdu</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Advanced AI Models</h3>
                    <p className="text-slate-300">Choose from multiple AI models specialized for Pakistani legal contexts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-center">Ready to Get Started?</h3>
                  <p className="text-slate-300 text-center mb-6">
                    Join thousands of legal professionals already using WukalaGPT
                  </p>
                  <Link to="/signup" className="block">
                    <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4">
                      Start Your Legal Journey
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
