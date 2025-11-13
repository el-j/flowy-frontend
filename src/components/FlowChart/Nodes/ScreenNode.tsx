import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styled from 'styled-components';
import type { NodeProps } from '@xyflow/react';
import { FlowNodeData } from '../../../types';

const NodeContainer = styled.div<{ $selected: boolean }>`
  background: white;
  border: 2px solid ${props => props.$selected ? '#3b82f6' : '#ddd'};
  border-radius: 8px;
  padding: 10px;
  min-width: 180px;
  box-shadow: ${props => props.$selected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 6px rgba(0,0,0,0.1)'};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const NodeImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const NodeName = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  color: #333;
`;

const NodeText = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const PortLabel = styled.div<{ $position: string }>`
  font-size: 10px;
  color: #888;
  position: absolute;
  ${props => props.$position === 'top' ? 'top: -20px' : 'bottom: -20px'};
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const ScreenNode: React.FC<NodeProps> = ({ data, selected, id }) => {
  const nodeData = data as unknown as FlowNodeData;
  const inputPorts = Object.entries(nodeData.ports).filter(([_, port]) => port.type === 'input');
  const outputPorts = Object.entries(nodeData.ports).filter(([_, port]) => port.type === 'output');
  
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (nodeData.onImageLoad) {
      nodeData.onImageLoad(id, e.currentTarget.clientHeight);
    }
  };

  return (
    <NodeContainer $selected={selected || false}>
      {/* Input Handles */}
      {inputPorts.map(([portId, port]) => (
        <React.Fragment key={portId}>
          <Handle
            type="target"
            position={Position.Top}
            id={portId}
            style={{ background: '#3b82f6' }}
          />
          {port.properties.value && port.properties.value !== 'nolabel' && (
            <PortLabel $position="top">{port.properties.value}</PortLabel>
          )}
        </React.Fragment>
      ))}

      {/* Node Content */}
      {nodeData.picture && nodeData.picture !== 'no_image.png' && (
        <NodeImage
          src={nodeData.path.startsWith('/') ? nodeData.path : `/${nodeData.path}`}
          alt={nodeData.name}
          onLoad={handleImageLoad}
          id={`${id}_picId`}
        />
      )}
      
      <NodeName>{nodeData.name}</NodeName>
      {nodeData.text && <NodeText>{nodeData.text}</NodeText>}

      {/* Output Handles */}
      {outputPorts.map(([portId, port]) => (
        <React.Fragment key={portId}>
          <Handle
            type="source"
            position={Position.Bottom}
            id={portId}
            style={{ background: '#10b981' }}
          />
          {port.properties.value && port.properties.value !== 'nolabel' && (
            <PortLabel $position="bottom">{port.properties.value}</PortLabel>
          )}
        </React.Fragment>
      ))}
    </NodeContainer>
  );
};

export default ScreenNode;

