import { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, Target, AlertCircle, Clock, Pill } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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

const patients = [
  { id: 'patient-1', name: 'Sarah Johnson', age: 68 },
  { id: 'patient-2', name: 'Robert Chen', age: 72 },
  { id: 'patient-3', name: 'Maria Garcia', age: 65 },
];

export function AnalyticsDashboard({ userMode }: AnalyticsDashboardProps) {
  const [selectedPatient, setSelectedPatient] = useState(patients[0].id);
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

  // Yearly trend data
  const yearlyData = [
    { month: 'Jan', adherence: 88 },
    { month: 'Feb', adherence: 90 },
    { month: 'Mar', adherence: 87 },
    { month: 'Apr', adherence: 92 },
    { month: 'May', adherence: 89 },
    { month: 'Jun', adherence: 93 },
    { month: 'Jul', adherence: 91 },
    { month: 'Aug', adherence: 94 },
    { month: 'Sep', adherence: 92 },
    { month: 'Oct', adherence: 95 },
    { month: 'Nov', adherence: 93 },
    { month: 'Dec', adherence: 92 },
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

  // Room for improvement data
  const improvementAreas = {
    worstTime: { period: 'Afternoon', adherence: 83, missedCount: 5 },
    worstDay: { day: 'Wednesday & Saturday', adherence: 75 },
    mostForgottenMeds: [
      { name: 'Metformin', missedDoses: 4, adherence: 88 },
      { name: 'Atorvastatin', missedDoses: 3, adherence: 92 },
    ],
    suggestions: [
      'Set additional reminder for afternoon doses',
      'Consider linking medication to daily routine (e.g., after lunch)',
      'Weekend adherence needs attention',
    ]
  };

  const avgAdherence = 92;
  const trend = 5; // positive trend

  const currentPatient = patients.find(p => p.id === selectedPatient);

  return (
    <div className="space-y-4">
      {/* Patient Selector for Caregiver Mode */}
      {userMode === 'caregiver' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} ({patient.age} years)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

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
          <TabsTrigger value="yearly" className="text-xs">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-3">
          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Weekly Trend</CardTitle>
              <CardDescription className="text-xs">Past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" tick={{ fontSize: 11 }} />
                  <YAxis className="text-xs" tick={{ fontSize: 11 }} />
                  <Bar dataKey="adherence" fill="#ec4899" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Summary */}
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

          {/* Medication Breakdown */}
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

          {/* Adherence Goal */}
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

          {/* Insights */}
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
                      Adherence up 5% this week
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <div className="flex gap-2">
                  <Clock className="size-4 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-blue-900 dark:text-blue-100">Time of Day Pattern</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                      Morning doses: 93% • Afternoon: 83% • Evening: 90%
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

          {/* Room for Improvement */}
          <Card className="border-orange-200 dark:border-orange-900">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-orange-600 dark:text-orange-500" />
                <CardTitle className="text-base">Room for Improvement</CardTitle>
              </div>
              <CardDescription className="text-xs">Areas to focus on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Worst Time Period */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Clock className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-1">Worst Adherence Time</p>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="text-sm">{improvementAreas.worstTime.period}</span>
                      <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                        {improvementAreas.worstTime.adherence}%
                      </Badge>
                    </div>
                    <p className="text-xs text-orange-700 dark:text-orange-400">
                      {improvementAreas.worstTime.missedCount} doses missed this week
                    </p>
                  </div>
                </div>
              </div>

              {/* Most Forgotten Medications */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Pill className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-2">Medications to Watch</p>
                    <div className="space-y-2">
                      {improvementAreas.mostForgottenMeds.map((med) => (
                        <div key={med.name} className="flex items-center justify-between gap-2">
                          <span className="text-sm">{med.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-orange-700 dark:text-orange-400">
                              {med.missedDoses} missed
                            </span>
                            <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                              {med.adherence}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Worst Days */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Calendar className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-1">Challenging Days</p>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm">{improvementAreas.worstDay.day}</span>
                      <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                        {improvementAreas.worstDay.adherence}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="pt-2 border-t border-orange-200 dark:border-orange-900">
                <p className="text-xs mb-2">💡 Suggestions:</p>
                <ul className="space-y-1.5">
                  {improvementAreas.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex gap-1.5">
                      <span className="text-orange-600 dark:text-orange-500">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-3">
          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Trend</CardTitle>
              <CardDescription className="text-xs">Adherence by week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
                    stroke="#ec4899" 
                    strokeWidth={2.5}
                    dot={{ fill: '#ec4899', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <div className="text-xl mb-0.5">116</div>
                  <p className="text-xs text-muted-foreground">Taken</p>
                </div>
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <div className="text-xl mb-0.5">4</div>
                  <p className="text-xs text-muted-foreground">Missed</p>
                </div>
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <div className="text-xl mb-0.5">23</div>
                  <p className="text-xs text-muted-foreground">Perfect Days</p>
                </div>
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <div className="text-xl mb-0.5">97%</div>
                  <p className="text-xs text-muted-foreground">Monthly</p>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs mb-1.5">Most Consistent:</p>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
                  Lisinopril (95%)
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Medication Breakdown */}
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

          {/* Adherence Goal */}
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

          {/* Insights */}
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
                  <Clock className="size-4 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-blue-900 dark:text-blue-100">Time of Day Pattern</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                      Morning doses: 93% • Afternoon: 83% • Evening: 90%
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
                      Trending towards your 95% goal
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room for Improvement */}
          <Card className="border-orange-200 dark:border-orange-900">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-orange-600 dark:text-orange-500" />
                <CardTitle className="text-base">Room for Improvement</CardTitle>
              </div>
              <CardDescription className="text-xs">Areas to focus on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Worst Time Period */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Clock className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-1">Worst Adherence Time</p>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="text-sm">{improvementAreas.worstTime.period}</span>
                      <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                        {improvementAreas.worstTime.adherence}%
                      </Badge>
                    </div>
                    <p className="text-xs text-orange-700 dark:text-orange-400">
                      {improvementAreas.worstTime.missedCount} doses missed this month
                    </p>
                  </div>
                </div>
              </div>

              {/* Most Forgotten Medications */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Pill className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-2">Medications to Watch</p>
                    <div className="space-y-2">
                      {improvementAreas.mostForgottenMeds.map((med) => (
                        <div key={med.name} className="flex items-center justify-between gap-2">
                          <span className="text-sm">{med.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-orange-700 dark:text-orange-400">
                              {med.missedDoses} missed
                            </span>
                            <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                              {med.adherence}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Worst Days */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Calendar className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-1">Challenging Days</p>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm">{improvementAreas.worstDay.day}</span>
                      <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                        {improvementAreas.worstDay.adherence}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="pt-2 border-t border-orange-200 dark:border-orange-900">
                <p className="text-xs mb-2">💡 Suggestions:</p>
                <ul className="space-y-1.5">
                  {improvementAreas.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex gap-1.5">
                      <span className="text-orange-600 dark:text-orange-500">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-3">
          {/* Yearly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Yearly Trend</CardTitle>
              <CardDescription className="text-xs">Adherence by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={yearlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs" 
                    tick={{ fontSize: 10 }}
                    interval={0}
                  />
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
                    stroke="#ec4899" 
                    strokeWidth={2.5}
                    dot={{ fill: '#ec4899', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Yearly Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Yearly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <div className="text-xl mb-0.5">1,456</div>
                  <p className="text-xs text-muted-foreground">Taken</p>
                </div>
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <div className="text-xl mb-0.5">84</div>
                  <p className="text-xs text-muted-foreground">Missed</p>
                </div>
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <div className="text-xl mb-0.5">312</div>
                  <p className="text-xs text-muted-foreground">Perfect Days</p>
                </div>
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <div className="text-xl mb-0.5">95%</div>
                  <p className="text-xs text-muted-foreground">Yearly</p>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs mb-1.5">Most Consistent:</p>
                <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
                  Lisinopril (97%)
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Medication Breakdown */}
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

          {/* Adherence Goal */}
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

          {/* Insights */}
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
                      Adherence improved 7% this year
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <div className="flex gap-2">
                  <Clock className="size-4 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-blue-900 dark:text-blue-100">Time of Day Pattern</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                      Morning doses: 93% • Afternoon: 83% • Evening: 90%
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900">
                <div className="flex gap-2">
                  <Target className="size-4 text-purple-600 dark:text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-purple-900 dark:text-purple-100">Excellent Consistency!</p>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-0.5">
                      Most months above 90% adherence
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room for Improvement */}
          <Card className="border-orange-200 dark:border-orange-900">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-orange-600 dark:text-orange-500" />
                <CardTitle className="text-base">Room for Improvement</CardTitle>
              </div>
              <CardDescription className="text-xs">Areas to focus on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Worst Time Period */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Clock className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-1">Worst Adherence Time</p>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="text-sm">{improvementAreas.worstTime.period}</span>
                      <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                        {improvementAreas.worstTime.adherence}%
                      </Badge>
                    </div>
                    <p className="text-xs text-orange-700 dark:text-orange-400">
                      Consistently challenging throughout the year
                    </p>
                  </div>
                </div>
              </div>

              {/* Most Forgotten Medications */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Pill className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-2">Medications to Watch</p>
                    <div className="space-y-2">
                      {improvementAreas.mostForgottenMeds.map((med) => (
                        <div key={med.name} className="flex items-center justify-between gap-2">
                          <span className="text-sm">{med.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-orange-700 dark:text-orange-400">
                              {med.missedDoses} missed
                            </span>
                            <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                              {med.adherence}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Worst Days */}
              <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                <div className="flex items-start gap-2.5">
                  <Calendar className="size-4 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-1">Challenging Days</p>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm">{improvementAreas.worstDay.day}</span>
                      <Badge variant="outline" className="border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-xs">
                        {improvementAreas.worstDay.adherence}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="pt-2 border-t border-orange-200 dark:border-orange-900">
                <p className="text-xs mb-2">💡 Suggestions:</p>
                <ul className="space-y-1.5">
                  {improvementAreas.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex gap-1.5">
                      <span className="text-orange-600 dark:text-orange-500">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
