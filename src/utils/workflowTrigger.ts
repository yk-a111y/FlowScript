import browser from 'webextension-polyfill';
import { IWorkflow } from '@/types/workflow';

export const cleanWorkflowTriggers = async (
  workflowId: string,
  triggers: IWorkflow['drawflow']['nodes']
) => {
  try {
    const alarms = await browser.alarms.getAll();
    for (const alarm of alarms) {
      if (alarm.name.includes(workflowId)) {
        await browser.alarms.clear(alarm.name);
      }
    }

    const { visitWebTriggers, onStartupTriggers, shortcuts } =
      await browser.storage.local.get([
        'shortcuts',
        'visitWebTriggers',
        'onStartupTriggers',
      ]);

    const keyboardShortcuts = Array.isArray(shortcuts) ? {} : shortcuts || {};
    Object.keys(keyboardShortcuts).forEach((shortcutId) => {
      if (!shortcutId.includes(workflowId)) return;

      delete keyboardShortcuts[shortcutId];
    });

    const startupTriggers = (onStartupTriggers || []).filter(
      (id) => !id.includes(workflowId)
    );
    const filteredVisitWebTriggers = (visitWebTriggers || []).filter(
      (item) => !item.id.includes(workflowId)
    );

    // await removeFromWorkflowQueue(workflowId);

    await browser.storage.local.set({
      shortcuts: keyboardShortcuts,
      onStartupTriggers: startupTriggers,
      visitWebTriggers: filteredVisitWebTriggers,
    });
  } catch (error) {
    console.error(error);
  }
};

export const workflowTriggersMap = {
  // interval: registerInterval,
  // date: registerSpecificDate,
  // 'cron-job': registerCronJob,
  // 'visit-web': registerVisitWeb,
  // 'on-startup': registerOnStartup,
  // 'specific-day': registerSpecificDay,
  // 'context-menu': registerContextMenu,
  // 'keyboard-shortcut': registerKeyboardShortcut,
};

export const registerWorkflowTrigger = async (
  workflowId: string,
  triggerBlock: IWorkflow['drawflow']['nodes']
) => {
  try {
    const { data } = triggerBlock;
    await cleanWorkflowTriggers(workflowId, data && data?.triggers);

    if (data.triggers) {
      for (const trigger of data.triggers) {
        const handler = workflowTriggersMap[trigger.type];
        if (handler)
          await handler(`trigger:${workflowId}:${trigger.id}`, trigger.data);
      }
    } else if (workflowTriggersMap[data.type]) {
      await workflowTriggersMap[data.type](workflowId, data);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  cleanUp: cleanWorkflowTriggers,
  register: registerWorkflowTrigger,
};
