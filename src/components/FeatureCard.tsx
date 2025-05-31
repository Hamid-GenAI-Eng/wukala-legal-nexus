
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-slate-200 group">
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
