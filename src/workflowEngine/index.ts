import browser from 'webextension-polyfill';
import { IWorkflow } from '@/dashboard/type';
import { sendMessage } from '@/utils/message';
import { convertWorkflowData } from '@/utils/convertWorkflowData';
import WorkflowEngine from './WorkflowEngine';
import WorkflowState from './WorkflowState';
import blocksHandler from './blocksHandler';

const workflowStateStorage = {
  get() {
    return browser.storage.local
      .get('workflowStates')
      .then(({ workflowStates }) => workflowStates || []);
  },
  set(key, value) {
    const states = Object.values(value);

    return browser.storage.local.set({ workflowStates: states });
  },
};

export const workflowState = new WorkflowState({
  storage: workflowStateStorage,
});

const startWorkflowExec = (workflowData: IWorkflow, options: any) => {
  console.log('🚀 ~ startWorkflowExec ~ options:', options);
  // clone workflow data
  const clonedWorkflowData: IWorkflow = {};
  Object.keys(workflowData).forEach((key) => {
    clonedWorkflowData[key] = workflowData[key];
  });

  // convert workflow data
  const convertedWorkflow = convertWorkflowData(clonedWorkflowData);
  console.log('🚀 ~ startWorkflowExec ~ convertedWorkflow:', convertedWorkflow);

  // init workflow engine
  const engine = new WorkflowEngine(convertedWorkflow, {
    options,
    states: workflowState,
    blocksHandler: blocksHandler(),
  });

  engine.init();
};

const executeWorkflow = (workflowData: IWorkflow, options?: any) => {
  if (!workflowData || workflowData.isDisabled) return;

  const isMV2 = browser.runtime.getManifest().manifest_version === 2;
  const context = workflowData?.settings?.execContext;

  if (isMV2 || context === 'background') {
    sendMessage('workflow:execute', { ...workflowData, options }, 'background');
    return;
  }

  if (window) window.fromBackground = false;

  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(async ([tab]) => {
      if (tab && tab.url.includes(browser.runtime.getURL(''))) {
        // unfocus current window
        await browser.windows.update(tab.windowId, { focused: false });
      }

      startWorkflowExec(workflowData, options);
    });
};

export { executeWorkflow, startWorkflowExec };
