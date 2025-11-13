// Core types for the Flowy application

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface PositionWithSize extends Position {
  width: number;
  height: number;
}

export interface PortProperties {
  value: string;
}

export interface Port {
  id: string;
  type: 'input' | 'output';
  connected: boolean;
  from?: string;
  to?: string;
  position?: Position;
  properties: PortProperties;
}

export type Ports = Record<string, Port>;

export interface PicSize {
  height: number;
  width: number;
}

export type NodeDisplayType = 'screen' | 'decision' | 'point';

export interface Node {
  id: string;
  type: string;
  name: string;
  text: string;
  displayType: NodeDisplayType;
  path: string;
  picture: string;
  picId: string;
  position: PositionWithSize;
  size: Size;
  picSize?: PicSize;
  ports: Ports;
}

export type Nodes = Record<string, Node>;

export interface LinkProperties {
  label?: string;
}

export interface LinkEndpoint {
  nodeId: string;
  portId: string;
}

export interface Link {
  id: string;
  from: LinkEndpoint;
  to: LinkEndpoint;
  properties?: LinkProperties;
}

export type Links = Record<string, Link>;

export interface Selected {
  id?: string;
  type?: 'node' | 'link' | string;
}

export interface Hovered {
  id?: string;
  type?: string;
}

export interface ChartOffset {
  x: number;
  y: number;
}

export interface ProjectJson {
  offset: ChartOffset;
  nodes: Nodes;
  links: Links;
  selected: Selected;
  hovered: Hovered;
  scale?: number;
}

export interface Project {
  projectId: string;
  name: string;
  files: string[];
  description: string;
  projectJson: ProjectJson;
}

export type Projects = Record<string, Project>;

export interface SearchResults {
  [projectName: string]: Project;
}

// API Response types
export interface ApiError {
  message: string;
  status?: number;
}

// Component Props types
export interface NavbarProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectName: string | null;
}

export interface RouteProps {
  searchResults: SearchResults;
  setProjectName: (name: string) => void;
  projectName?: string | null;
}

export interface ChartComponentProps {
  chartData: ProjectJson;
  stateActions?: any;
  smartRouting?: boolean;
  handleImageHeight?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  id?: string;
}
