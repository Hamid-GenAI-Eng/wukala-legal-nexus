
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: Date;
  status: 'Encrypted' | 'Verified' | 'Processing';
  category: 'Contract' | 'Legal Notice' | 'Court Filing' | 'Personal Document' | 'Other';
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Property Sale Agreement.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: new Date("2024-01-15"),
      status: "Encrypted",
      category: "Contract"
    },
    {
      id: "2",
      name: "Legal Notice - Tenant Dispute.docx",
      type: "DOCX",
      size: "1.8 MB",
      uploadDate: new Date("2024-01-10"),
      status: "Verified",
      category: "Legal Notice"
    },
    {
      id: "3",
      name: "Court Filing - Civil Case.pdf",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: new Date("2024-01-05"),
      status: "Processing",
      category: "Court Filing"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("wukala_user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Encrypted':
        return 'bg-emerald-100 text-emerald-800';
      case 'Verified':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Contract':
        return '📄';
      case 'Legal Notice':
        return '📋';
      case 'Court Filing':
        return '⚖️';
      case 'Personal Document':
        return '🆔';
      default:
        return '📁';
    }
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.jpg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newDoc: Document = {
          id: Date.now().toString(),
          name: file.name,
          type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadDate: new Date(),
          status: 'Processing',
          category: 'Other'
        };
        
        setDocuments(prev => [newDoc, ...prev]);
        toast({
          title: "Document Uploaded",
          description: `${file.name} has been uploaded and is being encrypted with blockchain technology.`,
        });
        
        // Simulate processing completion
        setTimeout(() => {
          setDocuments(prev => prev.map(doc => 
            doc.id === newDoc.id 
              ? { ...doc, status: 'Encrypted' as const }
              : doc
          ));
          toast({
            title: "Document Encrypted",
            description: "Your document has been successfully encrypted and secured.",
          });
        }, 3000);
      }
    };
    input.click();
  };

  const handleDownload = (doc: Document) => {
    toast({
      title: "Download Started",
      description: `Downloading ${doc.name}...`,
    });
  };

  const handleDelete = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast({
      title: "Document Deleted",
      description: "Document has been permanently removed from your storage.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2 font-serif">
              Legal Document Storage
            </h1>
            <p className="text-lg text-slate-600">
              Secure, blockchain-encrypted storage for your legal documents
            </p>
          </div>
          
          <Button
            onClick={handleUpload}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 text-lg font-semibold mt-4 md:mt-0"
          >
            📤 Upload Document
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="Search documents by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md border-slate-300 focus:border-blue-500"
          />
        </div>

        {/* Security Notice */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🔐</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  Blockchain-Secured Storage
                </h3>
                <p className="text-slate-600">
                  All documents are encrypted using advanced blockchain technology, ensuring tamper-proof security and complete confidentiality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {documents.length}
              </div>
              <p className="text-slate-600">Total Documents</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {documents.filter(d => d.status === 'Encrypted').length}
              </div>
              <p className="text-slate-600">Encrypted & Secure</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-slate-600 mb-2">
                {documents.reduce((acc, doc) => acc + parseFloat(doc.size.split(' ')[0]), 0).toFixed(1)} MB
              </div>
              <p className="text-slate-600">Total Storage Used</p>
            </CardContent>
          </Card>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map(doc => (
            <Card key={doc.id} className="hover:shadow-lg transition-all duration-300 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(doc.category)}</span>
                    <div>
                      <CardTitle className="text-lg font-semibold text-slate-800 leading-tight">
                        {doc.name}
                      </CardTitle>
                      <p className="text-sm text-slate-500">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <Badge className={`${getStatusColor(doc.status)} border-0`}>
                    {doc.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {doc.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="text-sm text-slate-500 mb-4">
                  Uploaded: {doc.uploadDate.toLocaleDateString()}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleDownload(doc)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Download
                  </Button>
                  <Button
                    onClick={() => handleDelete(doc.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No Documents Found
            </h3>
            <p className="text-slate-600 mb-6">
              {searchQuery ? 'No documents match your search criteria.' : 'Upload your first document to get started.'}
            </p>
            {!searchQuery && (
              <Button
                onClick={handleUpload}
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3"
              >
                Upload Your First Document
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
