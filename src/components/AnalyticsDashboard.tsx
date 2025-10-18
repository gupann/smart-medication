import { TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AnalyticsDashboardProps {
  userMode: 'user' | 'caregiver';
}

export function AnalyticsDashboard({ userMode }: AnalyticsDashboardProps) {
  // Weekly adherence data
  const weeklyData = [
    { day: 'Mon', adherence: 100, doses: 4 },
    { day: 'Tue', adherence: 100, doses: 4 },
    { day: 'Wed', adherence: 75, doses: 3 },
    { day: 'Thu', adherence: 100, doses: 4 },
    { day: 'Fri', adherence: 100, doses: 4 },
    { day: 'Sat', adherence: 75, doses: 3 },
    { day: 'Sun', adherence: 100, doses: 4 },
  ];

  // Monthly trend data
  const monthlyData = [
    { week: 'Week 1', adherence: 95 },
    { week: 'Week 2', adherence: 88 },
    { week: 'Week 3', adherence: 92 },
    { week: 'Week 4', adherence: 97 },
  ];

  // Time of day analysis
  const timeAnalysis = [
    { time: 'Morning', taken: 28, missed: 2, name: 'Morning' },
    { time: 'Afternoon', taken: 25, missed: 5, name: 'Afternoon' },
    { time: 'Evening', taken: 27, missed: 3, name: 'Evening' },
  ];

  // Medication breakdown
  const medBreakdown = [
    { name: 'Lisinopril', value: 95, color: '#3b82f6' },
    { name: 'Metformin', value: 88, color: '#10b981' },
    { name: 'Atorvastatin', value: 92, color: '#f59e0b' },
  ];

  const avgAdherence = 92;
  const trend = 5; // positive trend

  return (
    <div className="space-y-4">
      {/* Summary Stats - Mobile Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Overall</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl">{avgAdherence}%</div>
              <div className="flex items-center gap-0.5 text-green-600">
                <TrendingUp className="size-3" />
                <span className="text-xs">+{trend}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Streak</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-0.5">5 days</div>
            <p className="text-xs text-muted-foreground">Perfect</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">This Month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-0.5">116/120</div>
            <p className="text-xs text-muted-foreground">4 missed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Best Time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl mb-0.5">Morning</div>
            <p className="text-xs text-muted-foreground">93%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="weekly" className="space-y-3">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
          <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Weekly Adherence Rate</CardTitle>
              <CardDescription className="text-xs">Past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" tick={{ fontSize: 11 }} />
                  <YAxis className="text-xs" tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="adherence" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Daily Dose Count</CardTitle>
              <CardDescription className="text-xs">Doses taken each day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" tick={{ fontSize: 11 }} />
                  <YAxis className="text-xs" tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="doses" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-2))', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Trend</CardTitle>
              <CardDescription className="text-xs">Adherence by week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" tick={{ fontSize: 11 }} />
                  <YAxis className="text-xs" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adherence" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2.5}
                    dot={{ fill: 'hsl(var(--chart-1))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Medication Breakdown</CardTitle>
                <CardDescription className="text-xs">Adherence by medication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {medBreakdown.map((med) => (
                    <div key={med.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm">{med.name}</span>
                        <span className="text-sm">{med.value}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all" 
                          style={{ 
                            width: `${med.value}%`,
                            backgroundColor: med.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Adherence Goal</CardTitle>
                <CardDescription className="text-xs">Track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-3 py-2">
                  <div className="relative size-32">
                    <svg className="size-full -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--muted))"
                        strokeWidth="10"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - avgAdherence / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl">{avgAdherence}%</div>
                        <p className="text-xs text-muted-foreground">Goal: 95%</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Keep it up!</p>
                    <p className="text-sm">3% from goal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Time-of-Day Analysis</CardTitle>
              <CardDescription className="text-xs">Patterns throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={timeAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fontSize: 11 }} />
                  <YAxis className="text-xs" tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="taken" fill="hsl(var(--chart-2))" name="Taken" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="missed" fill="hsl(var(--destructive))" name="Missed" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <div className="p-2.5 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="flex gap-2">
                    <TrendingUp className="size-4 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-green-900 dark:text-green-100">Great Progress!</p>
                      <p className="text-xs text-green-700 dark:text-green-300 mt-0.5">
                        Adherence up 5% this month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="flex gap-2">
                    <Calendar className="size-4 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-900 dark:text-blue-100">Afternoon Pattern</p>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                        More reminders for afternoon doses
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
                  <div className="flex gap-2">
                    <Target className="size-4 text-purple-600 dark:text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-purple-900 dark:text-purple-100">Almost There!</p>
                      <p className="text-xs text-purple-700 dark:text-purple-300 mt-0.5">
                        3 days from 7-day streak
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 bg-muted rounded-lg text-center">
                    <div className="text-xl mb-0.5">26</div>
                    <p className="text-xs text-muted-foreground">Taken</p>
                  </div>
                  <div className="p-2.5 bg-muted rounded-lg text-center">
                    <div className="text-xl mb-0.5">2</div>
                    <p className="text-xs text-muted-foreground">Missed</p>
                  </div>
                  <div className="p-2.5 bg-muted rounded-lg text-center">
                    <div className="text-xl mb-0.5">5</div>
                    <p className="text-xs text-muted-foreground">Perfect Days</p>
                  </div>
                  <div className="p-2.5 bg-muted rounded-lg text-center">
                    <div className="text-xl mb-0.5">93%</div>
                    <p className="text-xs text-muted-foreground">Weekly</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs mb-1.5">Most Consistent:</p>
                  <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
                    Lisinopril (100%)
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
