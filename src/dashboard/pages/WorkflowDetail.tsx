import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import browser from 'webextension-polyfill';
import { Node, ReactFlowInstance, ReactFlowProvider } from '@xyflow/react';
import { executeWorkflow } from '@/workflowEngine';
import { useWorkflowStore, useIsEditingStore } from '@/store/workflow';
import { useEditingBlockStore } from '@/store/editingBlock';
import { debounce } from '@/utils/helper';
import WorkflowDetailsCard from '../components/WorkflowDetailsCard';
import WorkflowEditor from '../components/WorkflowEditor';
import WorkflowEditBlock from '../components/WorkflowEditBlock';

const WorkflowDetail = () => {
  // 从路由参数中获取workflowId
  const { id: workflowId = '' } = useParams<{ id: string }>();
  const { isEditing, setIsEditing } = useIsEditingStore();
  const { getWorkflowById, updateWorkflow } = useWorkflowStore();
  const workflow = getWorkflowById(workflowId);
  console.log('🚀 ~ WorkflowDetail ~ workflow:', workflow);

  const [editor, setEditor] = useState<ReactFlowInstance>();
  const [showSidebar, setShowSidebar] = useState(true);
  const { editingBlock, setEditingBlock } = useEditingBlockStore();

  const editorData = useMemo(() => {
    return workflow.drawflow;
  }, [workflow]);

  useEffect(() => {
    setIsEditing(false);
  }, []);

  const onEditorInit = (instance: ReactFlowInstance) => {
    console.log('🚀 ~ onEditorInit ~ instance:', instance);
    setEditor(instance);
  };

  // 初始化block编辑区
  const initEditBlock = (node: Node) => {
    console.log('🚀 ~ initEditBlock ~ node:', node);
    // const block = blocks[node.data.label as keyof typeof blocks];
    // console.log('🚀 ~ initEditBlock ~ block:', block);
    // const { editComponent, data: blockDefData, name } = block;
    // console.log('🚀 ~ initEditBlock ~ editComponent:', editComponent);
    // const blockData = defu(node.data, blockDefData);
    // console.log('🚀 ~ initEditBlock ~ blockData:', blockData);
    // setEditingBlock({
    //   ...blockData,
    //   editComponent,
    //   name,
    // });
    setEditingBlock(node);

    setShowSidebar(true);
    setIsEditing(true);
  };

  const closeEditingCard = () => {
    setIsEditing(false);
  };

  const onRunWorkflow = () => {
    executeWorkflow(workflow, {});
  };

  const onSaveWorkflow = async () => {
    try {
      const flow = editor?.toObject();
      console.log('🚀 ~ onSaveWorkflow ~ flow:', flow);
      // flow.edges = flow?.edges.map((edge) => {
      //   delete edge?.sourceNode;
      //   delete edge?.targetNode;

      //   return edge;
      // });

      // check trigger block
      const triggerBlock = flow?.nodes.find(
        (node) => node.data.label === 'trigger'
      );
      if (!triggerBlock) {
        console.error('trigger block not found');
        return;
      }

      await updateWorkflow(
        workflowId,
        {
          drawflow: flow,
          trigger: triggerBlock.data,
          version: browser.runtime.getManifest().version,
        },
        false
      );
      // await registerWorkflowTrigger(props.workflow.id, triggerBlock);
      // emit('change', { drawflow: flow });
    } catch (error) {
      console.error(error);
    }
  };

  const updateBlockData = debounce((value: any, isData = true) => {
    const { id } = editingBlock;
    const node = editor?.getNode(id);
    if (node) {
      console.log('🚀 ~ updateBlockData ~ node:', node);
      editor.setNodes((nodes: Node[]) =>
        nodes.map((node) =>
          node.id === id
            ? isData
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    ...value,
                  },
                }
              : { ...node, ...value }
            : node
        )
      );
      console.log('🚀 ~ updateBlockData ~ node:', node);
    }
  }, 200);

  return (
    <div className="workflow-detail flex">
      {/* 左侧Block区 */}
      {showSidebar && (
        <div className="workflow-left-block-area hidden md:flex w-80 flex-col border-l border-gray-100 bg-white py-6 dark:border-gray-700 dark:border-opacity-50 dark:bg-gray-800">
          {isEditing ? (
            <WorkflowEditBlock
              editingBlock={editingBlock}
              close={closeEditingCard}
              updateBlockData={updateBlockData}
            />
          ) : (
            <WorkflowDetailsCard />
          )}
        </div>
      )}
      {/* edit area */}
      <div className="relative flex-1 overflow-auto">
        {/* top func area */}
        <div className="top-func absolute left-0 top-0 z-10 flex w-full items-center p-4">
          <div onClick={onRunWorkflow}>开始</div>
          <div onClick={onSaveWorkflow}>保存</div>
        </div>
        {/* editor */}
        <div
          className="workflow-right-flow-area"
          style={{ height: '100vh', width: '100vw' }}
        >
          <ReactFlowProvider>
            <WorkflowEditor
              editorData={editorData}
              onInit={onEditorInit}
              onEdit={initEditBlock}
            />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetail;
