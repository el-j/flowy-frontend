import React from 'react';
import { Handle, Position } from '@xyflow/react';
import styled from 'styled-components';
import type { NodeProps } from '@xyflow/react';
import { FlowNodeData } from '../../../types';

const DiamondContainer = styled.div<{ $selected: boolean }>`
  position: relative;
  width: 150px;
  height: 150px;
  background: white;
  border: 2px solid ${props => props.$selected ? '#3b82f6' : '#ddd'};
  transform: rotate(45deg);
  box-shadow: ${props => props.$selected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 6px rgba(0,0,0,0.1)'};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  text-align: center;
  width: 100px;
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
`;

const PortLabel = styled.div<{ $position: string }>`
  font-size: 10px;
  color: #888;
  position: absolute;
  transform: rotate(-45deg);
  white-space: nowrap;
  ${props => {
    switch (props.$position) {
      case 'top':
        return 'top: -30px; left: 50%; transform: translateX(-50%) rotate(-45deg);';
      case 'left':
        return 'left: -50px; top: 50%; transform: translateY(-50%) rotate(-45deg);';
      case 'right':
        return 'right: -50px; top: 50%; transform: translateY(-50%) rotate(-45deg);';
      default:
        return '';
    }
  }}
`;

const DecisionNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as FlowNodeData;
  const inputPort = Object.entries(nodeData.ports).find(([_, port]) => port.type === 'input');
  const outputPorts = Object.entries(nodeData.ports).filter(([_, port]) => port.type === 'output');
  
  return (
    <>
      {/* Input Handle (Top) */}
      {inputPort && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id={inputPort[0]}
            style={{ background: '#3b82f6', top: '-10px' }}
          />
          {inputPort[1].properties.value && inputPort[1].properties.value !== 'nolabel' && (
            <PortLabel $position="top">{inputPort[1].properties.value}</PortLabel>
          )}
        </>
      )}

      <DiamondContainer $selected={selected || false}>
        <ContentWrapper>
          <NodeName>{nodeData.name}</NodeName>
          {nodeData.text && <NodeText>{nodeData.text}</NodeText>}
        </ContentWrapper>
      </DiamondContainer>

      {/* Output Handles (Left and Right for yes/no) */}
      {outputPorts[0] && (
        <>
          <Handle
            type="source"
            position={Position.Left}
            id={outputPorts[0][0]}
            style={{ background: '#ef4444', left: '-10px' }}
          />
          {outputPorts[0][1].properties.value && (
            <PortLabel $position="left">{outputPorts[0][1].properties.value}</PortLabel>
          )}
        </>
      )}
      
      {outputPorts[1] && (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id={outputPorts[1][0]}
            style={{ background: '#10b981', right: '-10px' }}
          />
          {outputPorts[1][1].properties.value && (
            <PortLabel $position="right">{outputPorts[1][1].properties.value}</PortLabel>
          )}
        </>
      )}
    </>
  );
};

export default DecisionNode;

