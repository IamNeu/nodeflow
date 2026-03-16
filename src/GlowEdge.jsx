import { getSmoothStepPath, BaseEdge } from 'reactflow'

export default function GlowEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, selected
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
    borderRadius: 0,
  })

  return (
    <BaseEdge id={id} path={edgePath} style={{
      stroke: selected ? '#a78bfa' : '#6366f188',
      strokeWidth: selected ? 2 : 1.5,
      strokeDasharray: '6 4',
      filter: selected
        ? 'drop-shadow(0 0 4px #a78bfa)'
        : 'none',
    }} />
  )
}