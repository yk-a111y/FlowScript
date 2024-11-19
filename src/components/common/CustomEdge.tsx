import {
  BaseEdge,
  BaseEdgeProps,
  getBezierPath,
  getSmoothStepPath,
  Position,
} from '@xyflow/react';
import { useMemo } from 'react';

interface CustomEdgeProps extends BaseEdgeProps {
  sourceX: number;
  sourceY: number;
  sourcePosition: Position;
  targetX: number;
  targetY: number;
  targetPosition: Position;
}

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  style,
  label,
  markerEnd,
}: CustomEdgeProps) => {
  console.log('🚀 ~ markerEnd:', markerEnd);
  const path = useMemo(() => {
    const options = {
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    };

    return sourceX > targetX
      ? getSmoothStepPath(options)
      : getBezierPath(options);
  }, [sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition]);
  return (
    <BaseEdge
      id={id}
      path={path[0]}
      style={style}
      markerEnd="arrowclosed"
      label={label}
      labelX={path[1]}
      labelY={path[2]}
      labelStyle={{ fill: 'white' }}
      labelBgStyle={{ fill: '#3b82f6' }}
      labelShowBg={true}
      labelBgPadding={[2, 4]}
      labelBgBorderRadius={2}
    />
  );
};

export default CustomEdge;
