interface IWorkflow {
  extVersion: string;
  name: string;
  icon: string;
  table: TableColumn[];
  version: string;
  drawflow: Drawflow;
  settings: Settings;
  globalData: string;
  description: string;
  includedWorkflows: Record<string, unknown>;
}

interface TableColumn {
  id: string;
  name: string;
  type: string;
}

interface Drawflow {
  edges: Edge[];
  nodes: Node[];
  position: [number, number];
  viewport: Viewport;
  zoom: number;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
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

export default IWorkflow;
