import browser from 'webextension-polyfill';

class WorkflowState {
  private storage;
  private key;
  private states;
  private eventListeners;
  private storageTimeout;

  constructor(storage, key: string = 'workflowState') {
    this.storage = storage;
    this.key = key;

    this.states = new Map();
    this.eventListeners = {};

    this.storageTimeout = null;
  }
}

export default WorkflowState;
