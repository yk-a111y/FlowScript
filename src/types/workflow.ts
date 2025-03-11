import type { BuiltInNode, Edge } from '@xyflow/react';

export interface IWorkflow {
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
  isProtected?: boolean;
  isDisabled?: boolean;
  extVersion?: string;
  version?: string;
  updatedAt?: number;
  createdAt?: number;
  globalData?: string;
  drawflow: IWorkflowDrawflow;
  table?: IWorkflowTabel[];
  settings?: IWorkflowSettings;
  content?: string | null;
  connectedTable?: string | null;
  trigger?: string | null;
  dataColumns?: string[];
  folderId?: string | null;
  includedWorkflows?: Record<string, unknown>;
  date?: number;
}

export interface IWorkflowDrawflow {
  nodes: BuiltInNode[];
  edges: Edge[];
  position?: number[];
  viewport?: Record<string, number>;
  zoom: number;
}

interface IWorkflowSettings {
  blockDelay: number;
  debugMode: boolean;
  defaultColumnName: string;
  execContext: string;
  executedBlockOnWeb: boolean;
  inputAutocomplete: boolean;
  insertDefaultColumn: boolean;
  notification: boolean;
  onError: string;
  publicId: string;
  restartTimes: number;
  reuseLastState: boolean;
  saveLog: boolean;
  tabLoadTimeout?: number;
}

interface IWorkflowTabel {
  id: string;
  name: string;
  type: string;
}
