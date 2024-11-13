import WorkflowsLocal from '../components/WorkflowsLocal';

const Workflows = () => {
  return (
    <div className="container pt-8 pb-4">
      <h1 className="text-2xl font-semibold capitalize">工作流</h1>
      <div className="flex items-start mt-8">
        {/* workflow opt */}
        <div className="workflow-opt sticky top-8 w-60 lg:block bg-slate-400">
          左侧功能模块
        </div>
        {/* workflow */}
        <div
          className="workflows-list flex-1 lg:ml-8"
          style={{ minHeight: 'calc(100vh - 8rem)' }}
        >
          {/* Top-Funcs */}
          <div className="flex flex-wrap items-center">
            <div className="grow"></div>
            <div className="mt-4 flex w-full items-center md:mt-0 md:w-auto"></div>
          </div>
          {/* workflow-list */}
          <div>
            <WorkflowsLocal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflows;
