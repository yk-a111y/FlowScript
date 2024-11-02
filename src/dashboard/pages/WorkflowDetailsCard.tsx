import WorkflowBlockList from './WorkflowBlockList';

const WorkflowDetailsCard = () => {
  return (
    <div className="detail-card mb-2 mt-1 flex items-start px-4">
      <div className="scroll relative flex-1 overflow-auto bg-scroll px-4">
        <WorkflowBlockList />
      </div>
    </div>
  );
};

export default WorkflowDetailsCard;
