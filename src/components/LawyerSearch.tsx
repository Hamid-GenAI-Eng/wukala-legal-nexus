
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { LawyerSearchFilters } from "@/types/lawyer";

interface LawyerSearchProps {
  onSearch: (filters: LawyerSearchFilters) => void;
}

const specializations = [
  "Civil Law", "Criminal Law", "Family Law", "Property Law", 
  "Labor Law", "Constitutional Law", "Corporate Law", "Tax Law"
];

const cities = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", 
  "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
];

export const LawyerSearch = ({ onSearch }: LawyerSearchProps) => {
  const [filters, setFilters] = useState<LawyerSearchFilters>({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch({
      ...filters,
      ...(searchQuery && { specialization: searchQuery })
    });
  };

  const handleFilterChange = (key: keyof LawyerSearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>Find the Right Lawyer</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Search by specialization or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="bg-blue-900 hover:bg-blue-800">
            <Search className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select onValueChange={(value) => handleFilterChange('specialization', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={(value) => handleFilterChange('experience', parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+ years</SelectItem>
              <SelectItem value="5">5+ years</SelectItem>
              <SelectItem value="10">10+ years</SelectItem>
              <SelectItem value="15">15+ years</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={() => {
              setFilters({});
              setSearchQuery("");
              onSearch({});
            }}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Clear</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
