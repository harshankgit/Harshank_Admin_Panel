'use client';

import { useState, useEffect } from 'react';
import { Shield, Lock, Key, Database, Zap, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch } from '@/hooks/useRedux';
import { addNotification } from '@/store/slices/notificationsSlice';

interface BlockchainTransaction {
  id: string;
  hash: string;
  type: 'data_integrity' | 'audit_log' | 'smart_contract' | 'token_transfer';
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed: number;
  value: string;
  from: string;
  to: string;
}

interface SmartContract {
  id: string;
  name: string;
  address: string;
  type: 'audit' | 'payment' | 'governance' | 'data';
  status: 'active' | 'paused' | 'deployed';
  executions: number;
  lastExecution: number;
}

const mockTransactions: BlockchainTransaction[] = [
  {
    id: '1',
    hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    type: 'data_integrity',
    timestamp: Date.now() - 300000,
    status: 'confirmed',
    gasUsed: 21000,
    value: '0.001 ETH',
    from: '0xAdmin',
    to: '0xDataVault'
  },
  {
    id: '2',
    hash: '0x9876543210fedcba0987654321fedcba09876543',
    type: 'audit_log',
    timestamp: Date.now() - 600000,
    status: 'confirmed',
    gasUsed: 45000,
    value: '0.002 ETH',
    from: '0xAuditor',
    to: '0xAuditContract'
  },
  {
    id: '3',
    hash: '0xabcdef1234567890abcdef1234567890abcdef12',
    type: 'smart_contract',
    timestamp: Date.now() - 120000,
    status: 'pending',
    gasUsed: 0,
    value: '0.005 ETH',
    from: '0xDeployer',
    to: '0xNewContract'
  }
];

const mockContracts: SmartContract[] = [
  {
    id: '1',
    name: 'Data Integrity Validator',
    address: '0x742d35Cc6634C0532925a3b8D4C0C8b3e6C7F8A9',
    type: 'data',
    status: 'active',
    executions: 1247,
    lastExecution: Date.now() - 180000
  },
  {
    id: '2',
    name: 'Audit Trail Logger',
    address: '0x8A9B7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0T',
    type: 'audit',
    status: 'active',
    executions: 892,
    lastExecution: Date.now() - 300000
  },
  {
    id: '3',
    name: 'Governance Token Manager',
    address: '0xF1E2D3C4B5A6978869504132785634129876543',
    type: 'governance',
    status: 'deployed',
    executions: 45,
    lastExecution: Date.now() - 3600000
  }
];

export function BlockchainIntegration() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [contracts, setContracts] = useState(mockContracts);
  const [networkStats, setNetworkStats] = useState({
    blockHeight: 18542367,
    gasPrice: 25,
    networkHashRate: '245.7 TH/s',
    totalSupply: '120,345,678 ETH'
  });
  const [securityScore, setSecurityScore] = useState(94.7);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        blockHeight: prev.blockHeight + Math.floor(Math.random() * 3),
        gasPrice: Math.max(15, prev.gasPrice + (Math.random() - 0.5) * 5)
      }));
      
      setSecurityScore(prev => Math.max(85, Math.min(99, prev + (Math.random() - 0.5) * 2)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const deployContract = (type: string) => {
    const newContract: SmartContract = {
      id: Date.now().toString(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Contract`,
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      type: type as any,
      status: 'deployed',
      executions: 0,
      lastExecution: Date.now()
    };

    setContracts(prev => [...prev, newContract]);
    
    dispatch(addNotification({
      title: 'Smart Contract Deployed',
      message: `${newContract.name} deployed successfully`,
      type: 'success',
    }));
  };

  const executeContract = (contractId: string) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? { ...contract, executions: contract.executions + 1, lastExecution: Date.now(), status: 'active' }
        : contract
    ));

    const newTransaction: BlockchainTransaction = {
      id: Date.now().toString(),
      hash: `0x${Math.random().toString(16).substr(2, 40)}`,
      type: 'smart_contract',
      timestamp: Date.now(),
      status: 'pending',
      gasUsed: Math.floor(Math.random() * 50000) + 21000,
      value: `${(Math.random() * 0.01).toFixed(4)} ETH`,
      from: '0xAdmin',
      to: contracts.find(c => c.id === contractId)?.address || '0x...'
    };

    setTransactions(prev => [newTransaction, ...prev]);

    dispatch(addNotification({
      title: 'Contract Executed',
      message: 'Smart contract execution initiated',
      type: 'info',
    }));
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'data_integrity': return <Database className="h-4 w-4 text-blue-500" />;
      case 'audit_log': return <Shield className="h-4 w-4 text-green-500" />;
      case 'smart_contract': return <Zap className="h-4 w-4 text-purple-500" />;
      case 'token_transfer': return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      default: return <Lock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Blockchain Network Status */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Block Height</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{networkStats.blockHeight.toLocaleString()}</div>
            <Badge variant="secondary" className="mt-1 bg-blue-100 text-blue-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              Synced
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gas Price</CardTitle>
            <Zap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{networkStats.gasPrice.toFixed(0)} Gwei</div>
            <p className="text-xs text-green-600 mt-1">Network optimal</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{securityScore.toFixed(1)}%</div>
            <Progress value={securityScore} className="mt-2 [&>div]:bg-purple-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <Key className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {contracts.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-orange-600 mt-1">Running smoothly</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                Blockchain Transactions
                <Badge variant="outline" className="ml-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(tx.type)}
                        <span className="font-medium text-sm capitalize">
                          {tx.type.replace('_', ' ')}
                        </span>
                      </div>
                      <Badge variant={tx.status === 'confirmed' ? 'default' : tx.status === 'pending' ? 'secondary' : 'destructive'}>
                        {tx.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Hash:</span>
                        <p className="font-mono text-xs">{tx.hash.slice(0, 10)}...</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Value:</span>
                        <p className="font-medium">{tx.value}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gas Used:</span>
                        <p className="font-medium">{tx.gasUsed.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>
                        <p className="font-medium">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-purple-500" />
                Smart Contracts
                <Badge variant="outline" className="ml-2">
                  {contracts.length} Deployed
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 md:grid-cols-4">
                <Button onClick={() => deployContract('audit')} variant="outline" size="sm">
                  Deploy Audit Contract
                </Button>
                <Button onClick={() => deployContract('payment')} variant="outline" size="sm">
                  Deploy Payment Contract
                </Button>
                <Button onClick={() => deployContract('governance')} variant="outline" size="sm">
                  Deploy Governance Contract
                </Button>
                <Button onClick={() => deployContract('data')} variant="outline" size="sm">
                  Deploy Data Contract
                </Button>
              </div>

              <div className="space-y-4">
                {contracts.map((contract) => (
                  <div key={contract.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{contract.name}</h3>
                        <p className="text-sm text-muted-foreground font-mono">
                          {contract.address.slice(0, 20)}...
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                          {contract.status}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => executeContract(contract.id)}
                          disabled={contract.status !== 'active' && contract.status !== 'deployed'}
                        >
                          Execute
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium capitalize">{contract.type}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Executions:</span>
                        <p className="font-medium">{contract.executions}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Run:</span>
                        <p className="font-medium">
                          {new Date(contract.lastExecution).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Security Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Encryption Strength</span>
                    <span className="text-sm">AES-256</span>
                  </div>
                  <Progress value={98} className="[&>div]:bg-green-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Network Security</span>
                    <span className="text-sm">{securityScore.toFixed(1)}%</span>
                  </div>
                  <Progress value={securityScore} className="[&>div]:bg-blue-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Smart Contract Audits</span>
                    <span className="text-sm">100%</span>
                  </div>
                  <Progress value={100} className="[&>div]:bg-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Security Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-700 dark:text-green-300">All Systems Secure</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    No security threats detected
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-blue-700 dark:text-blue-300">Auto-Backup Active</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    Blockchain data backed up every 10 minutes
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-purple-500" />
                    <span className="font-medium text-purple-700 dark:text-purple-300">Multi-Sig Enabled</span>
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                    3/5 signatures required for critical operations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,847</div>
                <p className="text-xs text-muted-foreground">+23% this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Gas Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">Optimized contracts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Network Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.98%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Blockchain Performance Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Transaction Throughput</h4>
                <p className="text-sm text-muted-foreground">
                  Current network is processing 15 TPS with average confirmation time of 12 seconds
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Smart Contract Efficiency</h4>
                <p className="text-sm text-muted-foreground">
                  Deployed contracts are 23% more gas-efficient than network average
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <h4 className="font-medium mb-2">Security Score Trend</h4>
                <p className="text-sm text-muted-foreground">
                  Maintaining 94%+ security score with zero critical vulnerabilities detected
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}