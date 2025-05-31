
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Briefcase, Clock } from "lucide-react";
import { LawyerProfile } from "@/types/lawyer";

interface LawyerCardProps {
  lawyer: LawyerProfile;
  onContact: (lawyer: LawyerProfile) => void;
}

export const LawyerCard = ({ lawyer, onContact }: LawyerCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
            {lawyer.profileImage ? (
              <img src={lawyer.profileImage} alt={lawyer.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-xl font-semibold text-slate-600">
                {lawyer.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-slate-800">{lawyer.name}</h3>
              {lawyer.verified && (
                <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{lawyer.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{lawyer.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {lawyer.specializations.slice(0, 3).map((spec, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-slate-600">
              <Briefcase className="w-4 h-4" />
              <span>{lawyer.experience} years experience</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-slate-600" />
              <Badge variant={lawyer.availability === 'available' ? 'default' : 'secondary'} className="text-xs">
                {lawyer.availability}
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-slate-600 line-clamp-2">
            {lawyer.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm">
              <span className="text-slate-600">Rate: </span>
              <span className="font-semibold text-slate-800">Rs. {lawyer.hourlyRate}/hour</span>
            </div>
            <Button 
              onClick={() => onContact(lawyer)}
              className="bg-blue-900 hover:bg-blue-800 text-white"
            >
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
