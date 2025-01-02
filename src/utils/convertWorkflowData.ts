import { IWorkflow } from '@/dashboard/type';
import { parseJSON, findTriggerBlock } from '@/utils/helper';

const getFlowData = (workflow: IWorkflow) => {
  if (typeof workflow.drawflow === 'string') {
    return parseJSON(workflow.drawflow, {});
  }
  return workflow.drawflow;
};

const convertWorkflowData = (workflow: IWorkflow) => {
  const data = getFlowData(workflow);
  if (!data?.drawflow) return workflow;

  // check trigger block
  const triggerBlock = findTriggerBlock(data);
  if (!triggerBlock) return workflow;

  // const blocks = data.drawflow.Home.data;
  // const tracedBlocks = new Set();

  // const nodes = [];
  // const edges = [];
};

export { convertWorkflowData };
