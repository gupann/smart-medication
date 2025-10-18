import { Lock, Unlock, Clock, Pill, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { useState } from 'react';

interface BottleCardProps {
  bottle: {
    id: string;
    name: string;
    dosage: string;
    schedule: string;
    pillsRemaining: number;
    totalPills: number;
    nextDose: string;
    status: 'taken' | 'due' | 'low' | 'missed';
    locked: boolean;
    lastTaken: string | null;
  };
  showLockControl?: boolean;
}

export function BottleCard({ bottle, showLockControl = true }: BottleCardProps) {
  const [isLocked, setIsLocked] = useState(bottle.locked);
  
  const pillPercentage = (bottle.pillsRemaining / bottle.totalPills) * 100;
  
  const statusConfig = {
    taken: { color: 'bg-green-500', text: 'Taken', badge: 'default' as const },
    due: { color: 'bg-blue-500', text: 'Due Now', badge: 'default' as const },
    low: { color: 'bg-orange-500', text: 'Low Stock', badge: 'destructive' as const },
    missed: { color: 'bg-red-500', text: 'Missed', badge: 'destructive' as const },
  };

  const config = statusConfig[bottle.status];

  return (
    <Card className="relative overflow-hidden">
      {/* Status Indicator */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${config.color}`} />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base leading-tight mb-1">{bottle.name}</h3>
            <p className="text-sm text-muted-foreground leading-tight">{bottle.dosage} per dose</p>
          </div>
          <Badge variant={config.badge} className="ml-2">{config.text}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pills Remaining */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Pills Remaining</span>
            <span className="text-sm font-medium">{bottle.pillsRemaining}/{bottle.totalPills}</span>
          </div>
          <Progress value={pillPercentage} className="h-2" />
        </div>

        {/* Schedule Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Next dose:</span>
            <span>{bottle.nextDose}</span>
          </div>
          
          {bottle.lastTaken && (
            <div className="flex items-center gap-2 text-sm">
              <Activity className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last taken:</span>
              <span>{bottle.lastTaken}</span>
            </div>
          )}
        </div>

        {/* Lock Control */}
        {showLockControl && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              {isLocked ? (
                <Lock className="size-4 text-muted-foreground" />
              ) : (
                <Unlock className="size-4 text-muted-foreground" />
              )}
              <span className="text-sm">Safety Lock</span>
            </div>
            <Switch checked={isLocked} onCheckedChange={setIsLocked} />
          </div>
        )}

        {/* Action Button */}
        <Button 
          className="w-full" 
          variant={bottle.status === 'taken' ? 'secondary' : 'default'}
          disabled={bottle.status === 'taken'}
        >
          {bottle.status === 'taken' ? 'Dose Taken' : 'Mark as Taken'}
        </Button>
      </CardContent>
    </Card>
  );
}
