'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Settings, Zap, Clock, CheckCircle, AlertTriangle, Bot, Workflow, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  successRate: number;
  executionCount: number;
  category: 'inventory' | 'marketing' | 'customer' | 'finance';
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'condition' | 'action';
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
}

const mockAutomations: AutomationRule[] = [
  {
    id: '1',
    name: 'Auto Inventory Reorder',
    description: 'Automatically reorder products when stock falls below threshold',
    trigger: 'Stock level < 10 units',
    action: 'Create purchase order',
    status: 'active',
    lastRun: '2 hours ago',
    successRate: 98.5,
    executionCount: 156,
    category: 'inventory'
  },
  {
    id: '2',
    name: 'Customer Churn Prevention',
    description: 'Send personalized offers to customers at risk of churning',
    trigger: 'Churn risk > 80%',
    action: 'Send discount email',
    status: 'active',
    lastRun: '1 hour ago',
    successRate: 87.2,
    executionCount: 43,
    category: 'customer'
  },
  {
    id: '3',
    name: 'Dynamic Pricing Optimizer',
    description: 'Adjust product prices based on demand and competition',
    trigger: 'Market conditions change',
    action: 'Update pricing',
    status: 'paused',
    lastRun: '6 hours ago',
    successRate: 92.1,
    executionCount: 89,
    category: 'finance'
  },
  {
    id: '4',
    name: 'Abandoned Cart Recovery',
    description: 'Send reminder emails for abandoned shopping carts',
    trigger: 'Cart abandoned > 1 hour',
    action: 'Send recovery email',
    status: 'active',
    lastRun: '30 minutes ago',
    successRate: 76.8,
    executionCount: 234,
    category: 'marketing'
  }
];

const workflowSteps: WorkflowStep[] = [
  { id: '1', name: 'Monitor Stock Levels', type: 'trigger', status: 'completed', duration: 2 },
  { id: '2', name: 'Check Threshold', type: 'condition', status: 'completed', duration: 1 },
  { id: '3', name: 'Calculate Reorder Quantity', type: 'action', status: 'running', duration: 3 },
  { id: '4', name: 'Generate Purchase Order', type: 'action', status: 'pending' },
  { id: '5', name: 'Send to Supplier', type: 'action', status: 'pending' },
];

export function AutomationCenter() {
  const [automations, setAutomations] = useState(mockAutomations);
  const [activeWorkflows, setActiveWorkflows] = useState(12);
  const [totalExecutions, setTotalExecutions] = useState(1247);
  const dispatch = useAppDispatch();

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === id 
        ? { ...automation, status: automation.status === 'active' ? 'paused' : 'active' }
        : automation
    ));
    
    dispatch(addNotification({
      title: 'Automation Updated',
      message: 'Automation rule status changed successfully',
      type: 'success',
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'inventory': return '📦';
      case 'marketing': return '📢';
      case 'customer': return '👥';
      case 'finance': return '💰';
      default: return '⚙️';
    }
  };

  const getStepIcon = (type: string, status: string) => {
    if (status === 'running') return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>;
    if (status === 'completed') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'failed') return <AlertTriangle className="h-4 w-4 text-red-500" />;
    
    switch (type) {
      case 'trigger': return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'condition': return <Target className="h-4 w-4 text-blue-500" />;
      case 'action': return <Settings className="h-4 w-4 text-purple-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWorkflows(prev => prev + Math.floor(Math.random() * 3 - 1));
      setTotalExecutions(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Automation Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{activeWorkflows}</div>
            <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700">
              <Bot className="h-3 w-3 mr-1" />
              Running
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Zap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{totalExecutions.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+47 in last hour</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">94.2%</div>
            <Progress value={94.2} className="mt-2 [&>div]:bg-purple-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">127h</div>
            <p className="text-xs text-orange-600 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="workflows">Live Workflows</TabsTrigger>
          <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" />
                Automation Rules
                <Badge variant="outline" className="ml-2">
                  {automations.filter(a => a.status === 'active').length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automations.map((automation) => (
                  <div key={automation.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getCategoryIcon(automation.category)}</span>
                        <div>
                          <h3 className="font-medium">{automation.name}</h3>
                          <p className="text-sm text-muted-foreground">{automation.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={automation.status === 'active' ? 'default' : 'secondary'}>
                          {automation.status}
                        </Badge>
                        <Switch
                          checked={automation.status === 'active'}
                          onCheckedChange={() => toggleAutomation(automation.id)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Trigger:</span>
                        <p className="font-medium">{automation.trigger}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Action:</span>
                        <p className="font-medium">{automation.action}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Success Rate:</span>
                        <p className="font-medium">{automation.successRate}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Run:</span>
                        <p className="font-medium">{automation.lastRun}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Execution Progress</span>
                        <span>{automation.executionCount} runs</span>
                      </div>
                      <Progress value={automation.successRate} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5 text-green-500" />
                Live Workflow Execution
                <Badge variant="outline" className="ml-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                  Real-time
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border">
                  <h3 className="font-medium mb-2">Auto Inventory Reorder - Workflow #1247</h3>
                  <p className="text-sm text-muted-foreground mb-4">Triggered by: Wireless Headphones stock level (8 units)</p>
                  
                  <div className="space-y-3">
                    {workflowSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 border">
                          {getStepIcon(step.type, step.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{step.name}</span>
                            <div className="flex items-center gap-2">
                              {step.duration && (
                                <span className="text-xs text-muted-foreground">{step.duration}s</span>
                              )}
                              <Badge variant={
                                step.status === 'completed' ? 'default' :
                                step.status === 'running' ? 'secondary' :
                                step.status === 'failed' ? 'destructive' : 'outline'
                              }>
                                {step.status}
                              </Badge>
                            </div>
                          </div>
                          {step.status === 'running' && (
                            <Progress value={67} className="mt-1 h-1" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-500" />
                Visual Workflow Builder
                <Badge variant="outline" className="ml-2">
                  Drag & Drop
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                  <h3 className="font-medium">Triggers</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Stock Level', icon: '📦' },
                      { name: 'New Order', icon: '🛒' },
                      { name: 'Customer Action', icon: '👤' },
                      { name: 'Time Schedule', icon: '⏰' },
                    ].map((trigger, index) => (
                      <div key={index} className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{trigger.icon}</span>
                          <span className="text-sm font-medium">{trigger.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Conditions</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'If/Then Logic', icon: '🔀' },
                      { name: 'Value Comparison', icon: '⚖️' },
                      { name: 'Date/Time Check', icon: '📅' },
                      { name: 'Custom Formula', icon: '🧮' },
                    ].map((condition, index) => (
                      <div key={index} className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{condition.icon}</span>
                          <span className="text-sm font-medium">{condition.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Actions</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Send Email', icon: '📧' },
                      { name: 'Update Database', icon: '💾' },
                      { name: 'Create Order', icon: '📝' },
                      { name: 'API Call', icon: '🔗' },
                    ].map((action, index) => (
                      <div key={index} className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{action.icon}</span>
                          <span className="text-sm font-medium">{action.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                <div className="text-muted-foreground">
                  <Workflow className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Drag components here to build your workflow</p>
                  <Button variant="outline" className="mt-3">
                    Start Building
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}