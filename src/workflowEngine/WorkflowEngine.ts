import { IWorkflow } from '@/dashboard/type';

class WorkflowEngine {
  public workflow: IWorkflow;

  constructor(workflow: IWorkflow) {
    this.workflow = workflow;
  }

  async init() {
    if (this.workflow.isDisabled) return;
  }
}

export default WorkflowEngine;
