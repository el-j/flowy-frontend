import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styled from 'styled-components';
import type { NodeProps } from '@xyflow/react';
import { FlowNodeData } from '../../../types';

const CircleContainer = styled.div<{ $selected: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  border: 2px solid ${props => props.$selected ? '#3b82f6' : '#ddd'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.$selected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 6px rgba(0,0,0,0.1)'};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const NodeContent = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #333;
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

const PointNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as FlowNodeData;
  const inputPort = Object.entries(nodeData.ports).find(([_, port]) => port.type === 'input');
  const outputPort = Object.entries(nodeData.ports).find(([_, port]) => port.type === 'output');
  
  return (
    <>
      {/* Input Handle (Top) */}
      {inputPort && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id={inputPort[0]}
            style={{ background: '#3b82f6', top: '-5px' }}
          />
          {inputPort[1].properties.value && inputPort[1].properties.value !== 'nolabel' && (
            <PortLabel $position="top">{inputPort[1].properties.value}</PortLabel>
          )}
        </>
      )}

      <CircleContainer $selected={selected || false}>
        <NodeContent>{nodeData.name}</NodeContent>
      </CircleContainer>

      {/* Output Handle (Bottom) */}
      {outputPort && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id={outputPort[0]}
            style={{ background: '#10b981', bottom: '-5px' }}
          />
          {outputPort[1].properties.value && outputPort[1].properties.value !== 'nolabel' && (
            <PortLabel $position="bottom">{outputPort[1].properties.value}</PortLabel>
          )}
        </>
      )}
    </>
  );
};

export default PointNode;

