import WorkflowEngine from './WorkflowEngine';

class WorkflowWorker {
  public id: string;
  private engine: WorkflowEngine;
  private settings: any;
  private blocksDetail: any;

  private windowId: string | null;
  private currentBlock: any;
  private childWorkflowId: string | null;

  private activeTab;

  constructor(id: string, engine: WorkflowEngine, options: any) {
    this.id = id;
    this.engine = engine;
    this.settings = engine.workflow.settings;
    this.blocksDetail = options.blocksDetail || {};

    this.windowId = null;
    this.currentBlock = null;
    this.childWorkflowId = null;

    this.activeTab = {
      url: '',
      frameId: 0,
      frames: {},
      groupId: null,
      id: engine.options?.tabId,
    };
  }

  init({ blockId, execParam, state }) {
    const block = this.engine.blocks[blockId];
    console.log('🚀 ~ WorkflowWorker ~ init ~ block:', block);
    this.executeBlock(block, execParam);
  }

  getBlockConnections(blockId, outputIndex = 1) {
    if (this.engine.isDestroyed) return null;

    const outputId = `${blockId}-output-${outputIndex}`;
    const connections = this.engine.connectionsMap[outputId];

    if (!connections) return null;

    return [...connections.values()];
  }

  executeNextBlocks(
    connections,
    prevBlockData,
    nextBlockBreakpointCount = null
  ) {
    console.log('🚀 ~ WorkflowWorker ~ prevBlockData:', prevBlockData);
    connections.forEach((connection) => {
      console.log(
        '🚀 ~ WorkflowWorker ~ connections.forEach ~ connection:',
        connection
      );
    });
  }

  async executeBlock(block, execParam = {}, isRetry: boolean = false) {
    console.log('🚀 ~ WorkflowWorker ~ executeBlock ~ block:', block);

    const startExecuteTime = Date.now();
    const prevBlock = this.currentBlock;
    this.currentBlock = { ...block, startedAt: startExecuteTime };

    const blockHandler = this.engine.blocksHandler[block.label];

    const handler =
      !blockHandler && this.blocksDetail[block.label].category === 'interaction'
        ? this.engine.blocksHandler.interactionBlock
        : blockHandler;

    if (!handler) {
      console.error(`${block.label} doesn't have handler`);
      // this.engine.destroy('stopped');
      return;
    }

    const { prevBlockData } = execParam;
    const refData = {
      prevBlockData,
      ...this.engine.referenceData,
      activeTabUrl: this.activeTab.url,
    };
    const replacedBlock = await templating({
      block,
      data: refData,
      isPopup: this.engine.isPopup,
      refKeys:
        isRetry || block.data.disableBlock
          ? null
          : this.blocksDetail[block.label].refDataKeys,
    });
    const blockDelay = this.settings?.blockDelay || 0;

    const executeBlocks = (blocks, data) => {
      return this.executeNextBlocks(
        blocks,
        data,
        execParam.nextBlockBreakpointCount
      );
    };

    try {
      let result;

      if (block.data.disableBlock) {
        result = {
          data: '',
          nextBlockId: this.getBlockConnections(block.id),
        };
      } else {
        const bindedHandler = handler.bind(this, replacedBlock, {
          refData,
          prevBlock,
          ...(execParam || {}),
        });
        result = await blockExecutionWrapper(bindedHandler, block.data);
        // if (this.engine.isDestroyed) return;
      }

      if (result.nextBlockId && !result.destroyWorker) {
        if (blockDelay > 0) {
          setTimeout(() => {
            executeBlocks(result.nextBlockId, result.data);
          }, blockDelay);
        } else {
          executeBlocks(result.nextBlockId, result.data);
        }
      } else {
        // this.engine.destroyWorker(this.id);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default WorkflowWorker;
