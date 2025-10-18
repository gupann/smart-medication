import { Users, TrendingUp, AlertTriangle, CheckCircle, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

interface CaregiverDashboardProps {
  showPatientList?: boolean;
}

export function CaregiverDashboard({ showPatientList = false }: CaregiverDashboardProps) {
  const patients = [
    {
      id: '1',
      name: 'Margaret Thompson',
      initials: 'MT',
      age: 72,
      adherenceRate: 94,
      activeMeds: 5,
      dosesDueToday: 4,
      dosesTakenToday: 3,
      alerts: [],
      status: 'good' as const,
      lastActivity: '2 hours ago',
    },
    {
      id: '2',
      name: 'Robert Chen',
      initials: 'RC',
      age: 68,
      adherenceRate: 76,
      activeMeds: 3,
      dosesDueToday: 3,
      dosesTakenToday: 2,
      alerts: ['Missed dose at 2:00 PM'],
      status: 'warning' as const,
      lastActivity: '5 hours ago',
    },
    {
      id: '3',
      name: 'Linda Martinez',
      initials: 'LM',
      age: 65,
      adherenceRate: 88,
      activeMeds: 4,
      dosesDueToday: 4,
      dosesTakenToday: 4,
      alerts: ['Low pills - Metformin (5 remaining)'],
      status: 'attention' as const,
      lastActivity: '30 minutes ago',
    },
  ];

  const overallStats = {
    totalPatients: patients.length,
    avgAdherence: Math.round(patients.reduce((acc, p) => acc + p.adherenceRate, 0) / patients.length),
    activeDoses: patients.reduce((acc, p) => acc + p.dosesDueToday, 0),
    takenDoses: patients.reduce((acc, p) => acc + p.dosesTakenToday, 0),
    alertCount: patients.reduce((acc, p) => acc + p.alerts.length, 0),
  };

  return (
    <div className="space-y-4">
      {/* Overview Stats - Mobile Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">Patients</CardDescription>
              <Users className="size-3.5 text-chart-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{overallStats.totalPatients}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">Avg. Rate</CardDescription>
              <TrendingUp className="size-3.5 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{overallStats.avgAdherence}%</div>
            <Progress value={overallStats.avgAdherence} className="h-1.5 mt-1.5" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">Today</CardDescription>
              <CheckCircle className="size-3.5 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{overallStats.takenDoses}/{overallStats.activeDoses}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Doses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs">Alerts</CardDescription>
              <AlertTriangle className="size-3.5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{overallStats.alertCount}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <div>
        <h3 className="mb-3">Patients</h3>
        <div className="space-y-3">
          {patients.map((patient) => (
            <Card key={patient.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Avatar className="size-10 shrink-0">
                      <AvatarFallback className="text-sm">{patient.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-sm truncate">{patient.name}</CardTitle>
                      <CardDescription className="text-xs">Age {patient.age} • {patient.activeMeds} meds</CardDescription>
                    </div>
                  </div>
                  
                  <div className="shrink-0">
                    {patient.status === 'good' && (
                      <Badge className="bg-green-500 hover:bg-green-600 text-xs px-2 py-0">
                        On Track
                      </Badge>
                    )}
                    {patient.status === 'warning' && (
                      <Badge variant="destructive" className="text-xs px-2 py-0">
                        Alert
                      </Badge>
                    )}
                    {patient.status === 'attention' && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-xs px-2 py-0">
                        Review
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Adherence */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Weekly Rate</span>
                    <span className="text-xs">{patient.adherenceRate}%</span>
                  </div>
                  <Progress value={patient.adherenceRate} className="h-1.5" />
                </div>

                {/* Today's Progress */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="text-lg mb-0.5">{patient.dosesTakenToday}/{patient.dosesDueToday}</div>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="text-lg mb-0.5">{patient.activeMeds}</div>
                    <p className="text-xs text-muted-foreground">Meds</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="text-lg mb-0.5">{patient.alerts.length}</div>
                    <p className="text-xs text-muted-foreground">Alerts</p>
                  </div>
                </div>

                {/* Alerts */}
                {patient.alerts.length > 0 && (
                  <div className="p-2.5 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="size-3.5 text-orange-600 dark:text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 space-y-0.5">
                        {patient.alerts.map((alert, idx) => (
                          <p key={idx} className="text-xs text-orange-900 dark:text-orange-100">
                            {alert}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    <span>{patient.lastActivity}</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 text-xs">Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
