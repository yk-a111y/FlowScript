const startWorkflowExec = (workflowData, options) => {
  console.log(workflowData, options);
};

const executeWorkflow = (workflowData, options) => {
  console.log(workflowData, options);
  // 开始执行工作流
  startWorkflowExec(workflowData, options);
};

export { executeWorkflow, startWorkflowExec };
