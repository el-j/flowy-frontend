// Utility functions to convert between legacy chart format and ReactFlow format

import { Position } from '@xyflow/react';
import {
  ProjectJson,
  Nodes,
  Links,
  FlowNode,
  FlowEdge,
  Node,
  Link,
  FlowNodeData,
  Selected,
} from '../types';

/**
 * Convert legacy nodes to ReactFlow nodes
 */
export function convertNodesToFlow(legacyNodes: Nodes): FlowNode[] {
  return Object.values(legacyNodes).map((node: Node) => ({
    id: node.id,
    type: node.displayType || 'screen', // Use displayType as the node type
    position: { x: node.position.x, y: node.position.y },
    data: {
      name: node.name,
      text: node.text,
      displayType: node.displayType,
      picture: node.picture,
      picId: node.picId,
      path: node.path,
      size: node.size,
      picSize: node.picSize,
      ports: node.ports,
    } as FlowNodeData,
  }));
}

/**
 * Convert legacy links to ReactFlow edges
 */
export function convertLinksToEdges(legacyLinks: Links): FlowEdge[] {
  return Object.values(legacyLinks).map((link: Link) => ({
    id: link.id,
    source: link.from.nodeId,
    target: link.to.nodeId,
    sourceHandle: link.from.portId,
    targetHandle: link.to.portId,
    label: link.properties?.label,
    data: {
      label: link.properties?.label,
      sourcePort: link.from.portId,
      targetPort: link.to.portId,
    },
    type: 'default', // Can be customized later
  }));
}

/**
 * Convert ReactFlow nodes back to legacy format
 */
export function convertFlowToNodes(flowNodes: FlowNode[]): Nodes {
  const nodes: Nodes = {};
  flowNodes.forEach((flowNode) => {
    nodes[flowNode.id] = {
      id: flowNode.id,
      type: 'node',
      name: flowNode.data.name,
      text: flowNode.data.text,
      displayType: flowNode.data.displayType,
      path: flowNode.data.path,
      picture: flowNode.data.picture,
      picId: flowNode.data.picId,
      position: {
        x: flowNode.position.x,
        y: flowNode.position.y,
        height: flowNode.data.size?.height || 353,
        width: flowNode.data.size?.width || 500,
      },
      size: flowNode.data.size,
      picSize: flowNode.data.picSize,
      ports: flowNode.data.ports,
    };
  });
  return nodes;
}

/**
 * Convert ReactFlow edges back to legacy links format
 */
export function convertEdgesToLinks(flowEdges: FlowEdge[]): Links {
  const links: Links = {};
  flowEdges.forEach((edge) => {
    links[edge.id] = {
      id: edge.id,
      from: {
        nodeId: edge.source,
        portId: edge.sourceHandle || 'default',
      },
      to: {
        nodeId: edge.target,
        portId: edge.targetHandle || 'default',
      },
      properties: edge.data?.label ? { label: edge.data.label } : undefined,
    };
  });
  return links;
}

/**
 * Convert full ProjectJson to ReactFlow format
 */
export function convertProjectToFlow(projectJson: ProjectJson): {
  nodes: FlowNode[];
  edges: FlowEdge[];
  viewport: { x: number; y: number; zoom: number };
} {
  return {
    nodes: convertNodesToFlow(projectJson.nodes),
    edges: convertLinksToEdges(projectJson.links),
    viewport: {
      x: projectJson.offset.x,
      y: projectJson.offset.y,
      zoom: projectJson.scale || 1,
    },
  };
}

/**
 * Convert ReactFlow data back to ProjectJson
 */
export function convertFlowToProject(
  nodes: FlowNode[],
  edges: FlowEdge[],
  viewport: { x: number; y: number; zoom: number },
  selected?: Selected
): ProjectJson {
  return {
    offset: { x: viewport.x, y: viewport.y },
    nodes: convertFlowToNodes(nodes),
    links: convertEdgesToLinks(edges),
    selected: selected || {},
    hovered: {},
    scale: viewport.zoom,
  };
}

/**
 * Get handle positions for a node type
 */
export function getHandlePositions(displayType: string): {
  inputs: Array<{ id: string; position: Position }>;
  outputs: Array<{ id: string; position: Position }>;
} {
  switch (displayType) {
    case 'decision':
      return {
        inputs: [{ id: 'port1', position: Position.Top }],
        outputs: [
          { id: 'port2', position: Position.Left },
          { id: 'port3', position: Position.Right },
        ],
      };
    case 'point':
      return {
        inputs: [{ id: 'port1', position: Position.Top }],
        outputs: [{ id: 'port2', position: Position.Bottom }],
      };
    case 'screen':
    default:
      return {
        inputs: [{ id: 'port1', position: Position.Top }],
        outputs: [{ id: 'port2', position: Position.Bottom }],
      };
  }
}
