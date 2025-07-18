'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Target, Users, DollarSign, Eye, MousePointer, Clock, Zap, Brain, Cpu, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Scatter, ScatterChart, ZAxis } from 'recharts';

const COLORS = ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

const realTimeData = [
  { time: '00:00', users: 45, sales: 1200, pageViews: 890, aiPrediction: 1350 },
  { time: '04:00', users: 23, sales: 800, pageViews: 450, aiPrediction: 920 },
  { time: '08:00', users: 78, sales: 2100, pageViews: 1200, aiPrediction: 2250 },
  { time: '12:00', users: 156, sales: 4500, pageViews: 2800, aiPrediction: 4200 },
  { time: '16:00', users: 134, sales: 3800, pageViews: 2400, aiPrediction: 3950 },
  { time: '20:00', users: 89, sales: 2200, pageViews: 1600, aiPrediction: 2100 },
];

const predictiveData = [
  { month: 'Jan', actual: 4000, predicted: 4200, confidence: 95 },
  { month: 'Feb', actual: 3000, predicted: 3100, confidence: 92 },
  { month: 'Mar', actual: 5000, predicted: 4800, confidence: 88 },
  { month: 'Apr', actual: null, predicted: 5200, confidence: 85 },
  { month: 'May', actual: null, predicted: 5800, confidence: 82 },
  { month: 'Jun', actual: null, predicted: 6200, confidence: 78 },
];

const customerSegments = [
  { segment: 'VIP Customers', value: 15, revenue: 45000, color: '#8B5CF6' },
  { segment: 'Regular Customers', value: 35, revenue: 28000, color: '#EC4899' },
  { segment: 'New Customers', value: 25, revenue: 12000, color: '#06B6D4' },
  { segment: 'At-Risk Customers', value: 15, revenue: 8000, color: '#F59E0B' },
  { segment: 'Churned Customers', value: 10, revenue: 2000, color: '#EF4444' },
];

const anomalyData = [
  { date: '2024-01-01', sales: 1200, anomaly: false, severity: 0 },
  { date: '2024-01-02', sales: 1350, anomaly: false, severity: 0 },
  { date: '2024-01-03', sales: 2800, anomaly: true, severity: 85 },
  { date: '2024-01-04', sales: 1100, anomaly: false, severity: 0 },
  { date: '2024-01-05', sales: 950, anomaly: true, severity: 72 },
  { date: '2024-01-06', sales: 1400, anomaly: false, severity: 0 },
];

export function AdvancedAnalytics() {
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 234,
    conversionRate: 8.9,
    avgSessionTime: 245,
    bounceRate: 32.5,
    aiAccuracy: 94.2,
    anomaliesDetected: 3,
  });

  const [aiInsights, setAiInsights] = useState([
    { type: 'trend', message: 'Sales velocity increased 23% in last 4 hours', confidence: 92 },
    { type: 'anomaly', message: 'Unusual spike in mobile traffic detected', confidence: 87 },
    { type: 'prediction', message: 'Revenue likely to exceed target by 15% this month', confidence: 89 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeUsers: Math.max(100, prev.activeUsers + Math.floor(Math.random() * 20 - 10)),
        conversionRate: Math.max(5, Math.min(15, prev.conversionRate + (Math.random() - 0.5) * 0.5)),
        avgSessionTime: Math.max(120, prev.avgSessionTime + Math.floor(Math.random() * 20 - 10)),
        bounceRate: Math.max(20, Math.min(50, prev.bounceRate + (Math.random() - 0.5) * 2)),
        aiAccuracy: Math.max(85, Math.min(99, prev.aiAccuracy + (Math.random() - 0.5) * 1)),
        anomaliesDetected: Math.max(0, prev.anomaliesDetected + Math.floor(Math.random() * 3 - 1)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* AI-Powered Real-time Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <Eye className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{liveMetrics.activeUsers}</div>
            <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-700">
              <TrendingUp className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-700">{liveMetrics.aiAccuracy.toFixed(1)}%</div>
            <Progress value={liveMetrics.aiAccuracy} className="mt-2 [&>div]:bg-pink-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{liveMetrics.conversionRate.toFixed(1)}%</div>
            <Progress value={liveMetrics.conversionRate} className="mt-2 [&>div]:bg-blue-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{Math.floor(liveMetrics.avgSessionTime / 60)}m {liveMetrics.avgSessionTime % 60}s</div>
            <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{liveMetrics.bounceRate.toFixed(1)}%</div>
            <Progress value={100 - liveMetrics.bounceRate} className="mt-2 [&>div]:bg-yellow-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomalies</CardTitle>
            <Activity className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{liveMetrics.anomaliesDetected}</div>
            <Badge variant="destructive" className="mt-1">
              <Zap className="h-3 w-3 mr-1" />
              Detected
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Generated Insights
            <Badge variant="outline" className="ml-2">
              <Cpu className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={insight.type === 'anomaly' ? 'destructive' : insight.type === 'trend' ? 'default' : 'secondary'}>
                    {insight.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                </div>
                <p className="text-sm">{insight.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="predictive" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="realtime">Real-time Streams</TabsTrigger>
          <TabsTrigger value="segments">Customer Intelligence</TabsTrigger>
          <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="ml">ML Models</TabsTrigger>
        </TabsList>

        <TabsContent value="predictive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Predictive Revenue Forecasting
                <Badge variant="outline" className="ml-2">
                  <Brain className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="actual" fill="#8B5CF6" name="Actual Revenue" />
                  <Line type="monotone" dataKey="predicted" stroke="#EC4899" strokeWidth={3} name="AI Prediction" strokeDasharray="5 5" />
                  <Area dataKey="confidence" fill="#06B6D4" fillOpacity={0.1} name="Confidence Interval" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Real-time Data Streams
                <Badge variant="outline" className="ml-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="pageViews" stackId="1" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                  <Line type="monotone" dataKey="aiPrediction" stroke="#06B6D4" strokeWidth={2} strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segmentation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ segment, value }) => `${segment}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Segment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{segment.segment}</span>
                        <span className="text-sm font-bold">${segment.revenue.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(segment.revenue / 45000) * 100} 
                        className="h-2"
                        style={{ '--progress-background': segment.color } as any}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="anomaly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-500" />
                Anomaly Detection System
                <Badge variant="destructive" className="ml-2">
                  3 Detected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="sales" />
                  <ZAxis dataKey="severity" range={[50, 400]} />
                  <Tooltip />
                  <Scatter 
                    dataKey="sales" 
                    fill="#8B5CF6"
                  />
                  <Scatter 
                    dataKey="sales" 
                    data={anomalyData.filter(d => d.anomaly)}
                    fill="#EF4444"
                  />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {anomalyData.filter(d => d.anomaly).map((anomaly, index) => (
                  <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-red-700 dark:text-red-300">
                        Anomaly detected on {anomaly.date}
                      </span>
                      <Badge variant="destructive">
                        {anomaly.severity}% severity
                      </Badge>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Sales value: ${anomaly.sales} (unusual pattern detected)
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ml" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ML Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Sales Prediction Model</span>
                      <span className="text-sm">94.2% accuracy</span>
                    </div>
                    <Progress value={94.2} className="[&>div]:bg-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Churn Prediction Model</span>
                      <span className="text-sm">87.8% accuracy</span>
                    </div>
                    <Progress value={87.8} className="[&>div]:bg-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Demand Forecasting</span>
                      <span className="text-sm">91.5% accuracy</span>
                    </div>
                    <Progress value={91.5} className="[&>div]:bg-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Training Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-700 dark:text-green-300">Sales Model</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">Last trained: 2 hours ago</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-yellow-700 dark:text-yellow-300">Churn Model</span>
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">Training in progress... 67%</p>
                    <Progress value={67} className="mt-2 [&>div]:bg-yellow-500" />
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-blue-700 dark:text-blue-300">Demand Model</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Scheduled: Next training in 4 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}