'use client';

import { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, Zap, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  potentialValue: string;
  actionable: boolean;
  category: string;
  timestamp: number;
}

interface PredictiveModel {
  name: string;
  accuracy: number;
  lastTrained: string;
  predictions: Array<{
    metric: string;
    current: number;
    predicted: number;
    change: number;
  }>;
}

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Untapped Market Segment Identified',
    description: 'AI analysis reveals 23% of your target demographic (ages 25-35) are underserved. Expanding marketing to this segment could increase revenue by $45,000 monthly.',
    impact: 'high',
    confidence: 89,
    potentialValue: '+$45,000/month',
    actionable: true,
    category: 'Marketing',
    timestamp: Date.now() - 300000
  },
  {
    id: '2',
    type: 'risk',
    title: 'Inventory Shortage Risk',
    description: 'Predictive models indicate 67% probability of stockout for Wireless Headphones within 5 days based on current sales velocity and supply chain delays.',
    impact: 'high',
    confidence: 92,
    potentialValue: '-$12,000 lost sales',
    actionable: true,
    category: 'Inventory',
    timestamp: Date.now() - 600000
  },
  {
    id: '3',
    type: 'trend',
    title: 'Emerging Product Category Trend',
    description: 'Smart home devices showing 340% growth in search volume and 156% increase in competitor sales. Market entry opportunity detected.',
    impact: 'medium',
    confidence: 78,
    potentialValue: '+$28,000 potential',
    actionable: true,
    category: 'Product Development',
    timestamp: Date.now() - 900000
  },
  {
    id: '4',
    type: 'recommendation',
    title: 'Dynamic Pricing Optimization',
    description: 'AI recommends adjusting Coffee Maker pricing to $189.99 (from $199.99) to maximize revenue. Elasticity analysis suggests 18% volume increase.',
    impact: 'medium',
    confidence: 85,
    potentialValue: '+$8,400/month',
    actionable: true,
    category: 'Pricing',
    timestamp: Date.now() - 1200000
  }
];

const predictiveModels: PredictiveModel[] = [
  {
    name: 'Revenue Forecasting',
    accuracy: 94.2,
    lastTrained: '2 hours ago',
    predictions: [
      { metric: 'Next Month Revenue', current: 45230, predicted: 52100, change: 15.2 },
      { metric: 'Quarter Revenue', current: 135690, predicted: 168400, change: 24.1 },
    ]
  },
  {
    name: 'Customer Behavior',
    accuracy: 87.8,
    lastTrained: '4 hours ago',
    predictions: [
      { metric: 'Churn Rate', current: 8.5, predicted: 6.2, change: -27.1 },
      { metric: 'Avg Order Value', current: 156.80, predicted: 172.30, change: 9.9 },
    ]
  }
];

export function SmartInsights() {
  const [insights, setInsights] = useState(mockInsights);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const dispatch = useAppDispatch();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-5 w-5 text-green-500" />;
      case 'risk': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'trend': return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'recommendation': return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      default: return <Brain className="h-5 w-5 text-purple-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleTakeAction = (insight: Insight) => {
    dispatch(addNotification({
      title: 'Action Initiated',
      message: `Started implementing: ${insight.title}`,
      type: 'success',
    }));
  };

  return (
    <div className="space-y-6">
      {/* Smart Insights Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{insights.length}</div>
            <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-700">
              <Zap className="h-3 w-3 mr-1" />
              Generated
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {insights.filter(i => i.type === 'opportunity').length}
            </div>
            <p className="text-xs text-green-600 mt-1">High impact available</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risks Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              {insights.filter(i => i.type === 'risk').length}
            </div>
            <p className="text-xs text-red-600 mt-1">Require attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Star className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {Math.round(insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length)}%
            </div>
            <Progress 
              value={insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length} 
              className="mt-2 [&>div]:bg-blue-500" 
            />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">Smart Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Models</TabsTrigger>
          <TabsTrigger value="recommendations">Action Center</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  AI-Generated Insights
                  <Badge variant="outline" className="ml-2">
                    Real-time Analysis
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div 
                      key={insight.id} 
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedInsight(insight)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getInsightIcon(insight.type)}
                          <span className="font-medium text-sm">{insight.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getImpactColor(insight.impact)}>
                            {insight.impact} impact
                          </Badge>
                          <span className="text-xs text-muted-foreground">{insight.confidence}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{insight.category}</Badge>
                        <span className="text-sm font-medium text-green-600">{insight.potentialValue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedInsight && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getInsightIcon(selectedInsight.type)}
                    Insight Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">{selectedInsight.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedInsight.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Impact Level</span>
                      <p className="font-medium capitalize">{selectedInsight.impact}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Confidence</span>
                      <p className="font-medium">{selectedInsight.confidence}%</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Potential Value</span>
                      <p className="font-medium text-green-600">{selectedInsight.potentialValue}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Category</span>
                      <p className="font-medium">{selectedInsight.category}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Confidence Score</span>
                    <Progress value={selectedInsight.confidence} className="h-2" />
                  </div>

                  {selectedInsight.actionable && (
                    <div className="pt-4 border-t">
                      <Button 
                        onClick={() => handleTakeAction(selectedInsight)}
                        className="w-full"
                      >
                        Take Action
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {predictiveModels.map((model, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{model.name}</span>
                    <Badge variant="outline">{model.accuracy}% accuracy</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Last trained: {model.lastTrained}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {model.predictions.map((prediction, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{prediction.metric}</span>
                        <Badge variant={prediction.change > 0 ? 'default' : 'destructive'}>
                          {prediction.change > 0 ? '+' : ''}{prediction.change.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Current:</span>
                          <p className="font-medium">
                            {prediction.metric.includes('Rate') ? `${prediction.current}%` : 
                             prediction.metric.includes('Value') ? `$${prediction.current}` :
                             prediction.current.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Predicted:</span>
                          <p className="font-medium">
                            {prediction.metric.includes('Rate') ? `${prediction.predicted}%` : 
                             prediction.metric.includes('Value') ? `$${prediction.predicted}` :
                             prediction.predicted.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Progress 
                        value={Math.abs(prediction.change)} 
                        className={`h-2 ${prediction.change > 0 ? '[&>div]:bg-green-500' : '[&>div]:bg-red-500'}`} 
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Actionable Recommendations
                <Badge variant="outline" className="ml-2">
                  {insights.filter(i => i.actionable).length} Available
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.filter(i => i.actionable).map((insight) => (
                  <div key={insight.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <span className="font-medium">{insight.title}</span>
                      </div>
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact} impact
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          Potential: <span className="font-medium text-green-600">{insight.potentialValue}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Confidence: <span className="font-medium">{insight.confidence}%</span>
                        </span>
                      </div>
                      <Button size="sm" onClick={() => handleTakeAction(insight)}>
                        Implement
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}