interface IWorkflow {
  id: string;
  name: string;
  drawflow: Drawflow;
  description?: string;
  icon?: string;
  extVersion?: string;
  version?: string;
  globalData?: string;
  createdAt?: string;
  updatedAt?: string;
  settings?: Settings;
  table?: TableColumn[];
}

interface Drawflow {
  nodes: Node[];
  edges: Edge[];
  position: [number, number];
  zoom: number;
  viewport: Viewport;
}

interface Node {
  id: string;
  label: string;
  type: string;
  data: NodeData;
}

interface NodeData {
  description: string;
  disableBlock: boolean;
  code?: string;
  url?: string;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
}

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

interface Settings {
  blockDelay: number;
  debugMode: boolean;
  onError: string;
}

interface TableColumn {
  id: string;
  name: string;
  type: string;
}

export default IWorkflow;
