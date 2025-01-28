import browser from 'webextension-polyfill';
import { MessageListener } from '@/utils/message';
import type { IWorkflow } from '@/dashboard/type';

const message = new MessageListener('background');

message.on('workflow:execute', async (workflowData: IWorkflow, sender) => {
  const context = workflowData.settings.execContext;
  const isMV2 = browser.runtime.getManifest().manifest_version === 2;
});
