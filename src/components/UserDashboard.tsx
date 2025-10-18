import {
  Pill,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { BottleCard } from "./BottleCard";

export function UserDashboard() {
  const bottles = [
    {
      id: "1",
      name: "Lisinopril 10mg",
      dosage: "1 pill",
      schedule: "8:00 AM",
      pillsRemaining: 23,
      totalPills: 30,
      nextDose: "8:00 AM Today",
      status: "due" as const,
      locked: false,
      lastTaken: "Yesterday 8:10 AM",
    },
    {
      id: "2",
      name: "Metformin 500mg",
      dosage: "2 pills",
      schedule: "8:00 AM, 8:00 PM",
      pillsRemaining: 45,
      totalPills: 60,
      nextDose: "8:00 PM Today",
      status: "taken" as const,
      locked: false,
      lastTaken: "8:15 AM",
    },
    {
      id: "3",
      name: "Atorvastatin 20mg",
      dosage: "1 pill",
      schedule: "9:00 PM",
      pillsRemaining: 8,
      totalPills: 30,
      nextDose: "9:00 PM Today",
      status: "low" as const,
      locked: false,
      lastTaken: "Yesterday 9:05 PM",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Quick Stats - Mobile Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">
                Doses Today
              </CardDescription>
              <Pill className="size-3.5 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3/4</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              1 remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">
                Next Dose
              </CardDescription>
              <Clock className="size-3.5 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">8:00 PM</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              in 2 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/20">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 text-orange-600 dark:text-orange-500" />
            <CardTitle className="text-sm">
              Low Pill Alert
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs">
            Atorvastatin 20mg has only 8 pills remaining. Time
            to refill soon.
          </p>
        </CardContent>
      </Card>

      {/* Active Bottles */}
      <div>
        <h3 className="mb-3">My Medications</h3>
        <div className="space-y-3">
          {bottles.map((bottle) => (
            <BottleCard key={bottle.id} bottle={bottle} />
          ))}
        </div>
      </div>
    </div>
  );
}