import { Lock, Unlock, Clock, Pill, Activity, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
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
    lastTaken: string;
  };
  showLockControl?: boolean;
}

function getTimeOfDay(timeStr: string): { label: string; icon: any; color: string } {
  // Parse time string like "8:00 AM" or "8:00 PM"
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return { label: 'Other', icon: Clock, color: 'text-muted-foreground' };
  
  let hours = parseInt(match[1]);
  const ampm = match[3].toUpperCase();
  
  // Convert to 24-hour format
  if (ampm === 'PM' && hours !== 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  
  if (hours >= 5 && hours < 12) {
    return { label: 'Morning', icon: Sunrise, color: 'text-amber-500' };
  } else if (hours >= 12 && hours < 17) {
    return { label: 'Midday', icon: Sun, color: 'text-yellow-500' };
  } else if (hours >= 17 && hours < 21) {
    return { label: 'Evening', icon: Sunset, color: 'text-orange-500' };
  } else {
    return { label: 'Night', icon: Moon, color: 'text-blue-400' };
  }
}

function parseDoseTimes(schedule: string) {
  // Split by comma and get unique time periods
  const times = schedule.split(',').map(t => t.trim());
  const timeOfDayMap = new Map<string, { label: string; icon: any; color: string; time: string }>();
  
  times.forEach(time => {
    const timeOfDay = getTimeOfDay(time);
    if (!timeOfDayMap.has(timeOfDay.label)) {
      timeOfDayMap.set(timeOfDay.label, { ...timeOfDay, time });
    }
  });
  
  // Sort by time of day
  const order = ['Morning', 'Midday', 'Evening', 'Night'];
  return Array.from(timeOfDayMap.values()).sort((a, b) => 
    order.indexOf(a.label) - order.indexOf(b.label)
  );
}

export function BottleCard({ bottle, showLockControl = true }: BottleCardProps) {
  const [isLocked, setIsLocked] = useState(bottle.locked);
  
  const pillPercentage = (bottle.pillsRemaining / bottle.totalPills) * 100;
  const doseTimes = parseDoseTimes(bottle.schedule);
  
  // Simplified status: only "Taken" or "Not Yet Taken"
  const isTaken = bottle.status === 'taken';
  const isLowStock = bottle.status === 'low' || pillPercentage < 20;
  
  const statusColor = isTaken ? 'bg-green-500' : 'bg-blue-500';

  return (
    <Card className="relative overflow-hidden">
      {/* Status Indicator */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${statusColor}`} />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-base leading-tight mb-1">{bottle.name}</h3>
            <p className="text-sm text-muted-foreground leading-tight">{bottle.dosage} per dose</p>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <Badge variant={isTaken ? 'default' : 'secondary'}>
              {isTaken ? 'Taken' : 'Not Yet Taken'}
            </Badge>
            {isLowStock && (
              <Badge variant="destructive">Low Stock</Badge>
            )}
          </div>
        </div>
        
        {/* Dose Times */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {doseTimes.map((timeOfDay) => {
            const Icon = timeOfDay.icon;
            return (
              <div 
                key={timeOfDay.label}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-full"
              >
                <Icon className={`size-3 ${timeOfDay.color}`} />
                <span className="text-xs">{timeOfDay.label}</span>
              </div>
            );
          })}
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
          
          <div className="flex items-center gap-2 text-sm">
            <Activity className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Last taken:</span>
            <span>{bottle.lastTaken}</span>
          </div>
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
      </CardContent>
    </Card>
  );
}
