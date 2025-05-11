
import { Link } from 'react-router-dom';
import { Gig } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface GigCardProps {
  gig: Gig;
  className?: string;
}

const GigCard = ({ gig, className }: GigCardProps) => {
  return (
    <Link to={`/gig/${gig.id}`}>
      <Card className={cn("h-full overflow-hidden transition-all hover:shadow-md", className)}>
        <div className="relative h-40 overflow-hidden">
          {gig.image ? (
            <img 
              src={gig.image} 
              alt={gig.title} 
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge className="bg-solana-purple hover:bg-solana-purple/90">
              {gig.price} SOL
            </Badge>
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-gray-800 border-0">
              {gig.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium line-clamp-1">{gig.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{gig.description}</p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <img 
                  src={gig.poster.avatar} 
                  alt={gig.poster.username} 
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs text-gray-500">{gig.poster.username}</span>
              </div>
              <span className="text-xs text-gray-500">{gig.timeEstimate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GigCard;
