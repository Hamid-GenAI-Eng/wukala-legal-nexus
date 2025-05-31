
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LawyerSearch } from "@/components/LawyerSearch";
import { LawyerCard } from "@/components/LawyerCard";
import { LawyerProfile, LawyerSearchFilters } from "@/types/lawyer";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockLawyers: LawyerProfile[] = [
  {
    id: "1",
    userId: "lawyer1",
    name: "Ahmad Hassan",
    email: "ahmad.hassan@example.com",
    phone: "+92-300-1234567",
    specializations: ["Criminal Law", "Civil Law"],
    experience: 12,
    location: "Lahore",
    barCouncilNumber: "PBC-2011-456",
    education: "LLB from Punjab University",
    description: "Experienced criminal defense lawyer with a track record of successful cases.",
    rating: 4.8,
    totalCases: 150,
    hourlyRate: 5000,
    availability: "available",
    verified: true
  },
  {
    id: "2",
    userId: "lawyer2",
    name: "Fatima Khan",
    email: "fatima.khan@example.com",
    phone: "+92-301-2345678",
    specializations: ["Family Law", "Property Law"],
    experience: 8,
    location: "Karachi",
    barCouncilNumber: "KBC-2015-789",
    education: "LLM from Karachi University",
    description: "Specializing in family disputes and property matters with compassionate approach.",
    rating: 4.6,
    totalCases: 95,
    hourlyRate: 4000,
    availability: "available",
    verified: true
  },
  {
    id: "3",
    userId: "lawyer3",
    name: "Muhammad Ali",
    email: "m.ali@example.com",
    phone: "+92-302-3456789",
    specializations: ["Corporate Law", "Tax Law"],
    experience: 15,
    location: "Islamabad",
    barCouncilNumber: "IBC-2008-123",
    education: "LLB from Quaid-i-Azam University",
    description: "Corporate legal expert helping businesses navigate complex regulations.",
    rating: 4.9,
    totalCases: 200,
    hourlyRate: 7000,
    availability: "busy",
    verified: true
  }
];

const FindLawyers = () => {
  const [lawyers, setLawyers] = useState<LawyerProfile[]>(mockLawyers);
  const [filteredLawyers, setFilteredLawyers] = useState<LawyerProfile[]>(mockLawyers);
  const { toast } = useToast();

  const handleSearch = (filters: LawyerSearchFilters) => {
    let filtered = [...lawyers];

    if (filters.specialization) {
      filtered = filtered.filter(lawyer => 
        lawyer.specializations.some(spec => 
          spec.toLowerCase().includes(filters.specialization!.toLowerCase())
        )
      );
    }

    if (filters.location) {
      filtered = filtered.filter(lawyer => 
        lawyer.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.experience) {
      filtered = filtered.filter(lawyer => lawyer.experience >= filters.experience!);
    }

    if (filters.rating) {
      filtered = filtered.filter(lawyer => lawyer.rating >= filters.rating!);
    }

    if (filters.maxRate) {
      filtered = filtered.filter(lawyer => lawyer.hourlyRate <= filters.maxRate!);
    }

    setFilteredLawyers(filtered);
  };

  const handleContact = (lawyer: LawyerProfile) => {
    toast({
      title: "Contact Request Sent",
      description: `Your request to contact ${lawyer.name} has been sent. They will respond shortly.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4 font-serif">
              Find Expert Lawyers in Pakistan
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect with verified legal professionals specialized in Pakistani law
            </p>
          </div>
          
          <div className="mb-8">
            <LawyerSearch onSearch={handleSearch} />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={lawyer}
                onContact={handleContact}
              />
            ))}
          </div>
          
          {filteredLawyers.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                No lawyers found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search criteria to find more results.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FindLawyers;
