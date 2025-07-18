"use client";

import { useState, useEffect, useRef } from "react";
import {
  Brain,
  Zap,
  Activity,
  Target,
  Layers,
  TrendingUp,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/hooks/useRedux";
import { addNotification } from "@/store/slices/notificationsSlice";

type NeuronType = "input" | "output" | "hidden" | "conv" | "pool" | "dropout";
interface Neuron {
  id: string;
  layer: number;
  position: {
    x: number;
    y: number;
  };
  activation: number;
  bias: number;
  type: NeuronType;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  weight: number;
  active: boolean;
}

interface NetworkLayer {
  id: string;
  name: string;
  type: "input" | "hidden" | "output" | "conv" | "pool" | "dropout";
  neurons: number;
  activation: string;
}

export function NeuralNetworkVisualizer() {
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [layers, setLayers] = useState<NetworkLayer[]>([
    {
      id: "1",
      name: "Input Layer",
      type: "input",
      neurons: 784,
      activation: "linear",
    },
    {
      id: "2",
      name: "Hidden Layer 1",
      type: "hidden",
      neurons: 128,
      activation: "relu",
    },
    {
      id: "3",
      name: "Hidden Layer 2",
      type: "hidden",
      neurons: 64,
      activation: "relu",
    },
    {
      id: "4",
      name: "Output Layer",
      type: "output",
      neurons: 10,
      activation: "softmax",
    },
  ]);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [networkStats, setNetworkStats] = useState({
    accuracy: 94.7,
    loss: 0.023,
    epoch: 156,
    learningRate: 0.001,
  });
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeNetwork();
  }, [layers]);

  useEffect(() => {
    if (canvasRef.current) {
      drawNetwork();
    }
  }, [neurons, connections, animationSpeed]);

  useEffect(() => {
    if (isTraining) {
      startTraining();
    } else {
      stopTraining();
    }
  }, [isTraining]);

  const initializeNetwork = () => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];

    // Create neurons for each layer
    layers.forEach((layer, layerIndex) => {
      const neuronsInLayer = Math.min(layer.neurons, 20); // Limit for visualization

      for (let i = 0; i < neuronsInLayer; i++) {
        newNeurons.push({
          id: `${layer.id}-${i}`,
          layer: layerIndex,
          position: {
            x: (layerIndex + 1) * 150,
            y: (i + 1) * (400 / (neuronsInLayer + 1)),
          },
          activation: Math.random(),
          bias: (Math.random() - 0.5) * 2,
          type: layer.type, // safe now due to updated types
        });
      }
    });

    // Create connections between adjacent layers
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayerNeurons = newNeurons.filter(
        (n) => n.layer === layerIndex
      );
      const nextLayerNeurons = newNeurons.filter(
        (n) => n.layer === layerIndex + 1
      );

      currentLayerNeurons.forEach((fromNeuron) => {
        nextLayerNeurons.forEach((toNeuron) => {
          newConnections.push({
            id: `${fromNeuron.id}-${toNeuron.id}`,
            from: fromNeuron.id,
            to: toNeuron.id,
            weight: (Math.random() - 0.5) * 2,
            active: false,
          });
        });
      });
    }

    setNeurons(newNeurons);
    setConnections(newConnections);
  };

  const drawNetwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw connections
    connections.forEach((connection) => {
      const fromNeuron = neurons.find((n) => n.id === connection.from);
      const toNeuron = neurons.find((n) => n.id === connection.to);

      if (fromNeuron && toNeuron) {
        ctx.beginPath();
        ctx.moveTo(fromNeuron.position.x, fromNeuron.position.y);
        ctx.lineTo(toNeuron.position.x, toNeuron.position.y);

        const opacity = connection.active ? 0.8 : 0.2;
        const weight = Math.abs(connection.weight);
        ctx.strokeStyle =
          connection.weight > 0
            ? `rgba(34, 197, 94, ${opacity})`
            : `rgba(239, 68, 68, ${opacity})`;
        ctx.lineWidth = Math.max(0.5, weight * 2);
        ctx.stroke();
      }
    });

    // Draw neurons
    neurons.forEach((neuron) => {
      ctx.beginPath();
      ctx.arc(neuron.position.x, neuron.position.y, 8, 0, 2 * Math.PI);

      // Color based on activation and type
      let color;
      switch (neuron.type) {
        case "input":
          color = `rgba(59, 130, 246, ${0.3 + neuron.activation * 0.7})`;
          break;
        case "hidden":
          color = `rgba(168, 85, 247, ${0.3 + neuron.activation * 0.7})`;
          break;
        case "output":
          color = `rgba(34, 197, 94, ${0.3 + neuron.activation * 0.7})`;
          break;
        default:
          color = `rgba(156, 163, 175, ${0.3 + neuron.activation * 0.7})`;
      }

      ctx.fillStyle = color;
      ctx.fill();

      // Add glow effect for highly activated neurons
      if (neuron.activation > 0.8) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Draw layer labels
    layers.forEach((layer, index) => {
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(layer.name, (index + 1) * 150, 30);
    });
  };

  const startTraining = () => {
    setTrainingProgress(0);

    const trainingInterval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(trainingInterval);
          setIsTraining(false);
          dispatch(
            addNotification({
              title: "Training Complete",
              message: "Neural network training finished successfully",
              type: "success",
            })
          );
          return 100;
        }
        return prev + Math.random() * 5;
      });

      // Update network stats during training
      setNetworkStats((prev) => ({
        accuracy: Math.min(99.9, prev.accuracy + Math.random() * 0.1),
        loss: Math.max(0.001, prev.loss - Math.random() * 0.001),
        epoch: prev.epoch + 1,
        learningRate: prev.learningRate,
      }));

      // Animate neuron activations
      setNeurons((prev) =>
        prev.map((neuron) => ({
          ...neuron,
          activation: Math.random(),
        }))
      );

      // Animate connections
      setConnections((prev) =>
        prev.map((connection) => ({
          ...connection,
          active: Math.random() > 0.7,
          weight: connection.weight + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 100 / animationSpeed);

    return () => clearInterval(trainingInterval);
  };

  const stopTraining = () => {
    setTrainingProgress(0);
  };

  const addLayer = () => {
    const newLayer: NetworkLayer = {
      id: Date.now().toString(),
      name: `Hidden Layer ${
        layers.filter((l) => l.type === "hidden").length + 1
      }`,
      type: "hidden",
      neurons: 64,
      activation: "relu",
    };

    // Insert before output layer
    const outputIndex = layers.findIndex((l) => l.type === "output");
    const newLayers = [...layers];
    newLayers.splice(outputIndex, 0, newLayer);
    setLayers(newLayers);
  };

  const removeLayer = (layerId: string) => {
    setLayers((prev) =>
      prev.filter(
        (l) => l.id !== layerId && l.type !== "input" && l.type !== "output"
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Neural Network Header */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Neural Network Visualizer
            <Badge variant="outline" className="ml-2">
              {isTraining ? (
                <>
                  <Activity className="h-3 w-3 mr-1 animate-pulse" />
                  Training
                </>
              ) : (
                "Ready"
              )}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {networkStats.accuracy.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {networkStats.loss.toFixed(4)}
              </div>
              <div className="text-xs text-muted-foreground">Loss</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {networkStats.epoch}
              </div>
              <div className="text-xs text-muted-foreground">Epoch</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {networkStats.learningRate}
              </div>
              <div className="text-xs text-muted-foreground">Learning Rate</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsTraining(!isTraining)}
              variant={isTraining ? "destructive" : "default"}
              className="flex-1"
            >
              {isTraining ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-pulse" />
                  Stop Training
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Start Training
                </>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Label htmlFor="speed">Speed:</Label>
              <Slider
                id="speed"
                value={[animationSpeed]}
                onValueChange={(value) => setAnimationSpeed(value[0])}
                max={5}
                min={0.1}
                step={0.1}
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">
                {animationSpeed}x
              </span>
            </div>
          </div>

          {isTraining && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Training Progress</span>
                <span className="text-sm text-muted-foreground">
                  {trainingProgress.toFixed(0)}%
                </span>
              </div>
              <Progress
                value={trainingProgress}
                className="[&>div]:bg-purple-500"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="visualization" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Network Visualization</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Live Network Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <canvas
                ref={canvasRef}
                className="w-full h-96 border rounded-lg bg-black"
                style={{ maxWidth: "100%" }}
              />

              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Input Neurons</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Hidden Neurons</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Output Neurons</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="architecture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-green-500" />
                Network Architecture
                <Button onClick={addLayer} size="sm" className="ml-auto">
                  Add Layer
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {layers.map((layer, index) => (
                  <div key={layer.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            layer.type === "input"
                              ? "default"
                              : layer.type === "output"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {layer.type}
                        </Badge>
                        <span className="font-medium">{layer.name}</span>
                      </div>
                      {layer.type === "hidden" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeLayer(layer.id)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Neurons:</span>
                        <p className="font-medium">
                          {layer.neurons.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Activation:
                        </span>
                        <p className="font-medium capitalize">
                          {layer.activation}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Parameters:
                        </span>
                        <p className="font-medium">
                          {index > 0
                            ? (
                                layers[index - 1].neurons * layer.neurons
                              ).toLocaleString()
                            : "0"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Training Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Accuracy</span>
                    <span className="text-sm">
                      {networkStats.accuracy.toFixed(2)}%
                    </span>
                  </div>
                  <Progress
                    value={networkStats.accuracy}
                    className="[&>div]:bg-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Loss Reduction</span>
                    <span className="text-sm">
                      {((1 - networkStats.loss) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <Progress
                    value={(1 - networkStats.loss) * 100}
                    className="[&>div]:bg-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Training Progress
                    </span>
                    <span className="text-sm">
                      {Math.min(100, (networkStats.epoch / 200) * 100).toFixed(
                        0
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={Math.min(100, (networkStats.epoch / 200) * 100)}
                    className="[&>div]:bg-purple-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Network Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      Total Neurons:
                    </span>
                    <p className="font-medium text-lg">
                      {layers
                        .reduce((sum, layer) => sum + layer.neurons, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Total Connections:
                    </span>
                    <p className="font-medium text-lg">
                      {connections.length.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Active Connections:
                    </span>
                    <p className="font-medium text-lg">
                      {connections
                        .filter((c) => c.active)
                        .length.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Network Depth:
                    </span>
                    <p className="font-medium text-lg">
                      {layers.length} layers
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    Performance Insights
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Network converging well with current architecture</li>
                    <li>• Optimal learning rate for current dataset</li>
                    <li>• No signs of overfitting detected</li>
                    <li>• Gradient flow is stable across all layers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
