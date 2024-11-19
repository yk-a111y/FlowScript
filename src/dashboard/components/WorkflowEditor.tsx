import {
  addEdge,
  Background,
  BackgroundVariant,
  MiniMap,
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
// import { getBlocks } from '@/utils/getSharedData';

interface WorkflowEditorProps {
  editorData: IWorkflowDrawflow;
  workflowId?: string;
  onInit: (instance: ReactFlowInstance) => void;
}

const WorkflowEditor = ({
  editorData,
  workflowId = 'editor',
  onInit,
}: WorkflowEditorProps) => {
  // Init nodes and edges
  const { nodes: initialNodes, edges: initialEdges } = editorData;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  console.log('🚀 ~ nodes:', nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  console.log('🚀 ~ edges:', edges);

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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

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
