import { convertWorkflowData } from '../utils/convertWorkflowData';
import { IWorkflow } from '@/dashboard/type';

const startWorkflowExec = (workflowData: IWorkflow, options: any) => {
  // clone workflow data
  const clonedWorkflowData = {};
  Object.keys(workflowData).forEach((key) => {
    clonedWorkflowData[key] = workflowData[key];
  });

  // convert workflow data
  const convertedWorkflow = convertWorkflowData(clonedWorkflowData);
  console.log('🚀 ~ startWorkflowExec ~ convertedWorkflow:', convertedWorkflow);
};

const executeWorkflow = (workflowData: IWorkflow, options: any) => {
  if (!workflowData || workflowData.isDisabled) return;
  startWorkflowExec(workflowData, options);
};

export { executeWorkflow, startWorkflowExec };
