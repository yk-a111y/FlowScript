import { getBlocks } from '@/utils/getSharedData';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const WorkflowEditor = () => {
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  const blocks = getBlocks();

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </>
  );
};

export default WorkflowEditor;
