import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { saveProject, uploadProjectData } from '../../tools/fetchApi';

import MyFlowChart from '../../components/FlowChart';
import LeftPanel from '../../components/LeftPanel';
import useFetchApi from '../../tools/fetchApi/useFetchApi';
import {
  Project,
  ProjectJson,
  NodeDisplayType,
  Ports,
  Node as LegacyNode,
} from '../../types';

interface ProjectViewProps {
  setProjectName: (name: string) => void;
}

const emptyProject = (name: string): Project => {
  return {
    projectId: name,
    name: name,
    files: [],
    description: '',
    projectJson: {
      offset: {
        x: 0,
        y: 0,
      },
      nodes: {},
      links: {},
      selected: {},
      hovered: {},
    },
  };
};

const createNewNode = (
  nodeNr: number,
  typeId: string,
  x: number = 300,
  y: number = 100
): LegacyNode => {
  let type: NodeDisplayType = 'screen';
  let ports: Ports = {
    port1: { id: 'port1', type: 'input', connected: false, properties: { value: 'nolabel' } },
    port2: { id: 'port2', type: 'output', connected: false, properties: { value: 'nolabel' } },
  };

  switch (typeId) {
    case 'addNewDecisionNode':
      type = 'decision';
      ports = {
        port1: { id: 'port1', type: 'input', connected: false, properties: { value: 'nolabel' } },
        port2: { id: 'port2', type: 'output', connected: false, properties: { value: 'no' } },
        port3: { id: 'port3', type: 'output', connected: false, properties: { value: 'yes' } },
      };
      break;
    case 'addNewPointNode':
      type = 'point';
      ports = {
        port1: { id: 'port1', type: 'input', connected: false, properties: { value: 'nolabel' } },
        port2: { id: 'port2', type: 'output', connected: false, properties: { value: 'nolabel' } },
      };
      break;
    case 'addNewNode':
    default:
      type = 'screen';
  }

  return {
    id: `node${nodeNr}`,
    type: 'node',
    name: `node${nodeNr}`,
    text: 'Your Node Description',
    displayType: type,
    path: '/no_image.png',
    picture: 'no_image.png',
    picId: `node${nodeNr}_picId`,
    position: {
      x,
      y,
      height: 39,
      width: 146.7,
    },
    size: { width: 500, height: 353 },
    ports,
  };
};

const ProjectView: React.FC<ProjectViewProps> = ({ setProjectName }) => {
  const { projectName } = useParams<{ projectName: string }>();
  const apiUrl = `loadProject/${projectName}`;
  const loadProject = useFetchApi<Project>(apiUrl);
  
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [project, setProject] = useState<Project | undefined>();
  const [chart, setChart] = useState<ProjectJson>(emptyProject('').projectJson);
  const [smartRouting, setSmartRouting] = useState(false);
  
  const flowchartRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  // Load project data
  useEffect(() => {
    if (!loadProject || typeof loadProject === 'boolean') {
      return;
    }

    if (Array.isArray(loadProject) && loadProject.length === 0) {
      const temp = emptyProject(projectName || '');
      setProject(temp);
      setChart(temp.projectJson);
      setIsLoaded(true);
    } else if (loadProject.projectJson) {
      setProject(loadProject);
      setChart(loadProject.projectJson);
      setIsLoaded(true);
    } else {
      const temp = emptyProject(projectName || '');
      setProject(temp);
      setChart(temp.projectJson);
      setIsLoaded(true);
    }

    if (projectName) {
      setProjectName(projectName.substring(1));
    }
  }, [loadProject, projectName, setProjectName]);

  // Handle chart changes from ReactFlow
  const handleChartChange = (newChart: ProjectJson) => {
    setChart(newChart);
    if (project) {
      setProject({ ...project, projectJson: newChart });
    }
  };

  // Handle save
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!project) return;

    const projectToSave = { ...project, projectJson: chart };
    
    saveProject(project.projectId, projectToSave).then(
      (result) => {
        setProject(result);
        setChart(result.projectJson);
        setIsLoaded(true);
        setError(null);
      },
      (error) => {
        console.error('Error saving project:', error);
        setError(error.message || 'Failed to save project');
      }
    );
  };

  // Handle print (placeholder)
  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Print functionality not implemented');
  };

  // Create new node
  const createNode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const typeId = e.currentTarget.id;
    const nodeCount = Object.keys(chart.nodes).length;
    const newNodeNr = nodeCount + 1;
    
    // Calculate center position relative to viewport
    const centerX = 400;
    const centerY = 300;
    
    const newNode = createNewNode(newNodeNr, typeId, centerX, centerY);
    const newNodeId = newNode.id;
    
    const updatedChart = {
      ...chart,
      nodes: {
        ...chart.nodes,
        [newNodeId]: newNode,
      },
    };
    
    setChart(updatedChart);
    if (project) {
      setProject({ ...project, projectJson: updatedChart });
    }
  };

  // Handle smart routing toggle
  const handleChangeSmartRouting = () => {
    setSmartRouting(!smartRouting);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid" style={{ position: 'relative', height: '100vh' }}>
      {project && project.projectJson ? (
        <>
          <LeftPanel
            createNewNode={createNode}
            handleSave={handleSave}
            handlePrint={handlePrint}
          />
          
          {/* Hidden file input for image uploads */}
          <input
            ref={uploadRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
          
          <MyFlowChart
            id="projectFlowGraph"
            chartData={chart}
            onChartChange={handleChartChange}
            smartRouting={smartRouting}
            ref={flowchartRef}
          />
        </>
      ) : null}
    </div>
  );
};

export default ProjectView;
