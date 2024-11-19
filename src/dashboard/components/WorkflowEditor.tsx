import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Edge,
  EdgeChange,
  MiniMap,
  NodeChange,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { IWorkflowDrawflow } from '../type';
import { useCallback, useEffect, useMemo } from 'react';
import BlockBasic from '@/components/block/BlockBasic';
import CustomEdge from '@/components/common/CustomEdge';

interface WorkflowEditorProps {
  editorData: IWorkflowDrawflow;
  onInit: (instance: ReactFlowInstance) => void;
}

const WorkflowEditor = ({ editorData, onInit }: WorkflowEditorProps) => {
  // Init nodes and edges
  const { nodes: initialNodes, edges: initialEdges } = editorData;
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  // register flow events
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds) as typeof nds);
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params: Edge) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // Init editor instance
  const editorInstance = useReactFlow();

  // fetch nodeTypes
  const nodeTypes = useMemo(() => ({ BlockBasic }), []);
  const edgeTypes = useMemo(() => ({ 'custom-edge': CustomEdge }), []);

  useEffect(() => {
    applyFlowData();
    window.addEventListener('mousedown', onMousedown, true);
    onInit(editorInstance);

    return () => {
      window.removeEventListener('mousedown', onMousedown, true);
    };
  }, []);

  const applyFlowData = () => {};

  const onMousedown = (event: MouseEvent) => {
    if (event.shiftKey) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <div
      className="workflow-editor focus:outline-none"
      style={{ height: 'calc(100vh - 40px)' }}
    >
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap className="hidden md:block" />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
