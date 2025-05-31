import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  language: 'English' | 'Urdu';
  date: Date;
  author: string;
  readTime: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Understanding Contract Law in Pakistan",
      excerpt: "A comprehensive guide to contract formation, enforcement, and common pitfalls under Pakistani civil law.",
      category: "Civil Law",
      language: "English",
      date: new Date("2024-01-15"),
      author: "Legal Expert",
      readTime: "8 min read"
    },
    {
      id: "2",
      title: "Criminal Procedure Code: Key Updates 2024",
      excerpt: "Recent amendments to the Criminal Procedure Code and their implications for legal practice.",
      category: "Criminal Law",
      language: "English",
      date: new Date("2024-01-10"),
      author: "Criminal Law Specialist",
      readTime: "12 min read"
    },
    {
      id: "3",
      title: "Property Rights and Inheritance Laws",
      excerpt: "Navigate the complexities of property ownership and inheritance under Islamic and civil law in Pakistan.",
      category: "Property Law",
      language: "English",
      date: new Date("2024-01-05"),
      author: "Property Law Expert",
      readTime: "15 min read"
    },
    {
      id: "4",
      title: "Labour Laws and Employee Rights",
      excerpt: "Essential guide to employment law, worker protections, and dispute resolution mechanisms.",
      category: "Labor Law",
      language: "English",
      date: new Date("2024-01-01"),
      author: "Employment Lawyer",
      readTime: "10 min read"
    }
  ];

  const categories = ["Civil Law", "Criminal Law", "Property Law", "Labor Law", "Family Law", "Constitutional Law"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "all" || post.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4 font-serif">
            Legal Resources & Insights
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay informed with the latest legal news, guides, and expert analysis on Pakistani law
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search Articles
              </label>
              <Input
                placeholder="Search legal topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-slate-300 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-slate-300">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Language
              </label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="border-slate-300">
                  <SelectValue placeholder="All Languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Urdu">اردو</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 font-serif">
            Browse by Practice Area
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Card key={category} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-900 transition-colors">
                    {category}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredPosts.map(post => (
            <Card key={post.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {post.category}
                  </Badge>
                  <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                    {post.language}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 hover:text-blue-900 transition-colors font-serif">
                  <Link to={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center space-x-4">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <span>{post.date.toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-500">
              No articles found matching your criteria.
            </p>
            <p className="text-slate-400 mt-2">
              Try adjusting your search or filter options.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-900 to-slate-800 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4 font-serif">
                Need Legal Assistance?
              </h2>
              <p className="text-xl mb-8 text-slate-200">
                Get personalized legal guidance from our AI assistant
              </p>
              <Link to="/chatbot">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Chat with WukalaGPT
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
