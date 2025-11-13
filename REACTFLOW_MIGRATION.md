# ReactFlow Migration Plan

## Objective
Migrate from legacy `@mrblenny/react-flow-chart` (v0.0.14, last updated 2020) to modern `@xyflow/react` (v12.9.3, actively maintained) to eliminate legacy peer dependencies and modernize the flow visualization.

## Rephrased Requirements
**Goal:** Replace the outdated @mrblenny/react-flow-chart library with the modern, well-maintained @xyflow/react (ReactFlow v12) library while:
1. Maintaining all existing functionalities from old views and components
2. Reimplementing with modern ReactFlow patterns and best practices
3. Ensuring the application works identically to the old implementation
4. Eliminating all legacy peer dependencies (React 16 compatibility issues)
5. Achieving 100% TypeScript conversion with full type safety
6. Providing better performance and developer experience

## Current State Analysis

### Old Library: @mrblenny/react-flow-chart
- **Version:** 0.0.14
- **Last Updated:** June 2020 (5+ years old)
- **Issues:**
  - Requires React 16 (peer dependency conflict)
  - No TypeScript support
  - No active maintenance
  - Limited features
  - Performance issues with large graphs
  - No official documentation

### New Library: @xyflow/react (ReactFlow v12)
- **Version:** 12.9.3
- **Last Updated:** November 2025 (actively maintained)
- **Benefits:**
  - ✅ Native TypeScript support
  - ✅ React 18 compatible
  - ✅ Actively maintained by xyflow team
  - ✅ Excellent documentation
  - ✅ Built-in features: minimap, controls, background
  - ✅ Better performance (virtual rendering)
  - ✅ Extensive customization options
  - ✅ Community support & plugins

## Current Implementation Analysis

### Files Using Old Library (8 files)
1. **src/components/FlowChart/index.js** - Main FlowChart wrapper
2. **src/components/FlowChart/Nodes/CustomNode/index.js** - Custom node component
3. **src/components/FlowChart/Nodes/CustomNode/CustomInnerNode.js** - Inner node rendering
4. **src/components/FlowChart/Nodes/CustomNode/CustomInnerNodeEdit.js** - Node editing
5. **src/components/FlowChart/Nodes/CustomNode/CustomLink.js** - Custom link/edge component
6. **src/components/FlowChart/Nodes/CustomNode/CustomPort.js** - Port/handle component
7. **src/views/ProjectView/index.js** - Main project view (559 lines)
8. **src/components/RightPanel/index.js** - Node inspector panel

### Key Features to Preserve
From analyzing the code, the current implementation has:

1. **Node Types:**
   - Screen nodes (default)
   - Decision nodes (with yes/no ports)
   - Point nodes

2. **Node Features:**
   - Custom display with images
   - Editable names and descriptions
   - Dynamic ports (input/output)
   - Port labels
   - Node positioning

3. **Link Features:**
   - Custom link styling
   - Link labels from port properties
   - Smart routing option

4. **Interactions:**
   - Drag nodes
   - Connect ports
   - Select nodes/links
   - Edit node properties
   - Add/remove ports dynamically
   - Upload images to nodes
   - Save/load project state

5. **UI Panels:**
   - Left panel: Add node buttons, save
   - Right panel: Node inspector, property editor

## Migration Strategy

### Phase 1: Setup & Planning ✅
- [x] Analyze current implementation
- [x] Research modern alternatives
- [x] Select @xyflow/react v12
- [x] Document migration plan
- [ ] Create mapping document (old API → new API)

### Phase 2: Install & Configure
- [ ] Remove @mrblenny/react-flow-chart
- [ ] Install @xyflow/react v12
- [ ] Update tsconfig for new library
- [ ] Remove --legacy-peer-deps requirement

### Phase 3: Type Definitions
- [ ] Create comprehensive types for ReactFlow
- [ ] Define Node types (ScreenNode, DecisionNode, PointNode)
- [ ] Define Edge types
- [ ] Define custom data interfaces
- [ ] Update global types.ts

### Phase 4: Core FlowChart Component
- [ ] Convert FlowChart/index.js → FlowChart/index.tsx
- [ ] Implement ReactFlow wrapper
- [ ] Set up ReactFlowProvider
- [ ] Configure controls, minimap, background
- [ ] Implement state management

### Phase 5: Custom Nodes
- [ ] Convert CustomNode to ReactFlow node format
- [ ] Implement ScreenNode component
- [ ] Implement DecisionNode component
- [ ] Implement PointNode component
- [ ] Add image display functionality
- [ ] Implement custom handles (ports)

### Phase 6: Custom Edges
- [ ] Convert CustomLink to ReactFlow edge format
- [ ] Implement edge labels
- [ ] Implement custom edge styling
- [ ] Add smart routing with ReactFlow smoothstep

### Phase 7: Node Interactions
- [ ] Implement node selection
- [ ] Implement node editing
- [ ] Implement drag & drop
- [ ] Implement connection validation
- [ ] Add/remove handles dynamically

### Phase 8: ProjectView Migration
- [ ] Convert ProjectView to TypeScript
- [ ] Update state management for ReactFlow
- [ ] Migrate node creation logic
- [ ] Migrate save/load logic
- [ ] Update event handlers
- [ ] Implement image upload

### Phase 9: Panels & UI
- [ ] Update LeftPanel for new node types
- [ ] Convert RightPanel to TypeScript
- [ ] Update NodeInspector
- [ ] Implement property editing

### Phase 10: Testing & Validation
- [ ] Test all node types
- [ ] Test all interactions
- [ ] Test save/load functionality
- [ ] Test image uploads
- [ ] Performance testing
- [ ] Cross-browser testing

### Phase 11: Cleanup
- [ ] Remove old FlowChart files
- [ ] Remove legacy dependencies
- [ ] Update documentation
- [ ] Final code review

## API Mapping: Old → New

### Main Component
```javascript
// OLD: @mrblenny/react-flow-chart
import { FlowChart, actions } from "@mrblenny/react-flow-chart";

<FlowChart
  callbacks={stateActions}
  Components={{ Node, NodeInner, Port, Link }}
  chart={chartData}
  config={{ smartRouting, showArrowHead }}
/>
```

```typescript
// NEW: @xyflow/react
import ReactFlow, { 
  Background, Controls, MiniMap,
  useNodesState, useEdgesState 
} from '@xyflow/react';

<ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  nodeTypes={nodeTypes}
  edgeTypes={edgeTypes}
>
  <Background />
  <Controls />
  <MiniMap />
</ReactFlow>
```

### Data Structure
```javascript
// OLD: chart data structure
{
  offset: { x, y },
  nodes: {
    node1: {
      id, type, name, text, displayType,
      position: { x, y },
      ports: { port1: { id, type, properties } }
    }
  },
  links: {
    link1: {
      id, from: { nodeId, portId }, to: { nodeId, portId }
    }
  },
  selected: {},
  hovered: {}
}
```

```typescript
// NEW: ReactFlow data structure
const nodes: Node[] = [
  {
    id: 'node1',
    type: 'screenNode',
    position: { x, y },
    data: {
      name, text, displayType,
      image, ports,
      onEdit, onDelete
    }
  }
];

const edges: Edge[] = [
  {
    id: 'edge1',
    source: 'node1',
    sourceHandle: 'port1',
    target: 'node2',
    targetHandle: 'port2',
    label: 'connection label'
  }
];
```

### Custom Nodes
```javascript
// OLD: Custom node component
const CustomNode = ({ node, children, ... }) => (
  <div>{children}</div>
);
```

```typescript
// NEW: ReactFlow node component
const ScreenNode: React.FC<NodeProps<ScreenNodeData>> = ({ 
  data, selected 
}) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="screen-node">
        {data.image && <img src={data.image} />}
        <div>{data.name}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};
```

## Success Criteria

- ✅ All node types work (screen, decision, point)
- ✅ Node creation, editing, deletion
- ✅ Image upload and display on nodes
- ✅ Dynamic port management
- ✅ Connection creation and deletion
- ✅ Save/load project with correct state
- ✅ Smart routing works
- ✅ Selection and hover states
- ✅ No legacy peer dependencies
- ✅ 100% TypeScript coverage
- ✅ Build completes without warnings
- ✅ All tests pass

## Timeline Estimate

- Phase 2-3: Setup & Types (2-3 hours)
- Phase 4-6: Core Components (4-5 hours)
- Phase 7-8: Interactions & ProjectView (5-6 hours)
- Phase 9: Panels (2-3 hours)
- Phase 10-11: Testing & Cleanup (2-3 hours)

**Total: 15-20 hours**

## Breaking Changes

### For Users
- **None** - Application should work identically from user perspective

### For Developers
- Different API for extending functionality
- New data structure (but migration handles conversion)
- TypeScript required for new code

## Dependencies Changes

### Remove
- `@mrblenny/react-flow-chart@^0.0.14`

### Add
- `@xyflow/react@^12.9.3` (or latest)

### Update
- Remove `--legacy-peer-deps` from npm commands
- CRACO may no longer be needed

## Risk Mitigation

1. **Data Migration:** Create adapter functions to convert old data structure to new
2. **Feature Parity:** Comprehensive testing checklist
3. **Performance:** ReactFlow v12 has better performance than old library
4. **Rollback Plan:** Keep old implementation in separate branch until validated

## Notes

- ReactFlow has excellent documentation at https://reactflow.dev
- Large community and active support
- Plugin ecosystem available for future enhancements
- Better accessibility features built-in

---
*Created: 2025-11-13*
*Status: Planning Complete - Ready for Implementation*
