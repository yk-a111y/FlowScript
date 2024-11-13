import WorkflowDetailsCard from './WorkflowDetailsCard';
import WorkflowEditor from '../components/WorkflowEditor';

const WorkflowDetail = () => {
  return (
    <div>
      {/* 左侧Block区 */}
      <WorkflowDetailsCard />
      {/* 编辑区 */}
      <div
        className="flow-container"
        style={{ height: '100vh', width: '100vw' }}
      >
        <WorkflowEditor />
      </div>
    </div>
  );
};

export default WorkflowDetail;
