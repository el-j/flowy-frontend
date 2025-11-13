import React, { useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Connection,
  EdgeChange,
  NodeChange,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
  type Node as ReactFlowNode,
  type Edge as ReactFlowEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ProjectJson, FlowNode, FlowEdge } from '../../types';
import ScreenNode from './Nodes/ScreenNode';
import DecisionNode from './Nodes/DecisionNode';
import PointNode from './Nodes/PointNode';
import {
  convertProjectToFlow,
  convertFlowToProject,
} from '../../tools/flowConverter';

// Define node types
const nodeTypes = {
  screen: ScreenNode,
  decision: DecisionNode,
  point: PointNode,
};

interface FlowChartInnerProps {
  chartData: ProjectJson;
  onChartChange: (newChart: ProjectJson) => void;
  smartRouting?: boolean;
  handleImageHeight?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  id?: string;
}

const FlowChartInner: React.FC<FlowChartInnerProps> = ({
  chartData,
  onChartChange,
  smartRouting,
  id,
}) => {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes] = React.useState<ReactFlowNode[]>([]);
  const [edges, setEdges] = React.useState<ReactFlowEdge[]>([]);
  const prevChartDataRef = useRef<ProjectJson | null>(null);

  // Convert chartData to ReactFlow format when it changes externally
  useEffect(() => {
    // Only update if chartData actually changed
    if (JSON.stringify(chartData) !== JSON.stringify(prevChartDataRef.current)) {
      const { nodes: flowNodes, edges: flowEdges, viewport } = convertProjectToFlow(chartData);
      setNodes(flowNodes as ReactFlowNode[]);
      setEdges(flowEdges as ReactFlowEdge[]);
      
      // Set viewport
      if (reactFlowInstance) {
        reactFlowInstance.setViewport(viewport);
      }
      
      prevChartDataRef.current = chartData;
    }
  }, [chartData, reactFlowInstance]);

  // Handle node changes (drag, select, etc.)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const newNodes = applyNodeChanges(changes, nodes);
      setNodes(newNodes);
      
      // Update parent with new chart data
      const viewport = reactFlowInstance?.getViewport() || { x: 0, y: 0, zoom: 1 };
      const selected = newNodes.find(n => n.selected);
      const newChart = convertFlowToProject(
        newNodes as FlowNode[],
        edges as FlowEdge[],
        viewport,
        selected ? { id: selected.id, type: 'node' } : {}
      );
      onChartChange(newChart);
    },
    [nodes, edges, reactFlowInstance, onChartChange]
  );

  // Handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const newEdges = applyEdgeChanges(changes, edges);
      setEdges(newEdges);
      
      // Update parent with new chart data
      const viewport = reactFlowInstance?.getViewport() || { x: 0, y: 0, zoom: 1 };
      const newChart = convertFlowToProject(nodes as FlowNode[], newEdges as FlowEdge[], viewport);
      onChartChange(newChart);
    },
    [nodes, edges, reactFlowInstance, onChartChange]
  );

  // Handle new connections
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdges = addEdge(
        {
          ...connection,
          id: `edge-${Date.now()}`,
          type: smartRouting ? 'smoothstep' : 'default',
        },
        edges
      );
      setEdges(newEdges);
      
      // Update parent with new chart data
      const viewport = reactFlowInstance?.getViewport() || { x: 0, y: 0, zoom: 1 };
      const newChart = convertFlowToProject(nodes as FlowNode[], newEdges as FlowEdge[], viewport);
      onChartChange(newChart);
    },
    [nodes, edges, smartRouting, reactFlowInstance, onChartChange]
  );

  // Handle viewport changes (pan, zoom)
  const onMoveEnd = useCallback(() => {
    const viewport = reactFlowInstance?.getViewport() || { x: 0, y: 0, zoom: 1 };
    const newChart = convertFlowToProject(nodes as FlowNode[], edges as FlowEdge[], viewport);
    onChartChange(newChart);
  }, [nodes, edges, reactFlowInstance, onChartChange]);

  return (
    <div id={id} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onMoveEnd={onMoveEnd}
        nodeTypes={nodeTypes}
        fitView={false}
        defaultEdgeOptions={{
          type: smartRouting ? 'smoothstep' : 'default',
          animated: false,
        }}
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'decision':
                return '#fbbf24';
              case 'point':
                return '#3b82f6';
              default:
                return '#10b981';
            }
          }}
          style={{ background: '#f8f9fa' }}
        />
      </ReactFlow>
    </div>
  );
};

// Wrapper component with ReactFlowProvider
interface FlowChartProps extends FlowChartInnerProps {}

const FlowChart = React.forwardRef<HTMLDivElement, FlowChartProps>((props, _ref) => {
  return (
    <ReactFlowProvider>
      <FlowChartInner {...props} />
    </ReactFlowProvider>
  );
});

FlowChart.displayName = 'FlowChart';

export default FlowChart;

