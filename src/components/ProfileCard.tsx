
import { User } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-solana-purple to-solana-teal" />
      <CardHeader className="flex flex-col items-center -mt-12 space-y-2 pb-2">
        <div className="p-1 bg-white rounded-full">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-24 h-24 rounded-full object-cover border-4 border-white"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.username}</h2>
          <div className="flex items-center justify-center mt-1 space-x-1">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{user.rating}</span>
            <span className="text-gray-500">({user.completedGigs} gigs)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
        </div>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Wallet</span>
            <Badge variant="outline" className="font-mono">{user.wallet}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Member since</span>
            <span>{user.dateJoined}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
