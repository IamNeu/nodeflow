import { useState, useCallback, useRef } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Background, Controls, MiniMap,
  useNodesState, useEdgesState, addEdge
} from 'reactflow'
import 'reactflow/dist/style.css'
import OrchestratorNode from './OrchestratorNode'
import GlowEdge from './GlowEdge'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import getLayoutedElements from './useLayout'
import PipelineAlert, { isDAG } from './PipelineAlert'

const nodeTypes = { orchestrator: OrchestratorNode }
const edgeTypes = { glowEdge: GlowEdge }

const initialNodes = [
  { id: '1', type: 'orchestrator', position: { x: 100, y: 150 }, data: { label: 'User Query',    nodeType: 'input'  } },
  { id: '2', type: 'orchestrator', position: { x: 380, y: 80  }, data: { label: 'System Prompt', nodeType: 'prompt' } },
  { id: '3', type: 'orchestrator', position: { x: 380, y: 240 }, data: { label: 'GPT-4o',        nodeType: 'llm'    } },
  { id: '4', type: 'orchestrator', position: { x: 660, y: 150 }, data: { label: 'Response',      nodeType: 'output' } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'glowEdge', animated: true },
  { id: 'e1-3', source: '1', target: '3', type: 'glowEdge', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'glowEdge', animated: true },
  { id: 'e3-4', source: '3', target: '4', type: 'glowEdge', animated: true },
]

let nodeId = 10

function OrchestratorApp() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [rfInstance, setRfInstance] = useState(null)
  const [alertInfo, setAlertInfo] = useState(null)
  const wrapperRef = useRef(null)

  const onConnect = useCallback(
    (params) => setEdges((eds) =>
      addEdge({ ...params, type: 'glowEdge', animated: true }, eds)
    ),
    [setEdges]
  )

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    const nodeType = e.dataTransfer.getData('application/nodeType')
    if (!nodeType || !rfInstance) return

    const bounds = wrapperRef.current.getBoundingClientRect()
    const position = rfInstance.project({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    })

    const labels = {
      input: 'Input', llm: 'LLM', prompt: 'Prompt',
      memory: 'Memory', tool: 'Tool', output: 'Output',
      transform: 'Transform', condition: 'Condition',
    }

    setNodes((nds) => [...nds, {
      id: `node_${nodeId++}`,
      type: 'orchestrator',
      position,
      data: { label: `${labels[nodeType]} ${nodeId}`, nodeType },
    }])
  }, [rfInstance, setNodes])

  const handleSubmit = () => {
    const valid = isDAG(nodes, edges)
    setAlertInfo({ valid, nodes: nodes.length, edges: edges.length })
  }

  const handleClear = () => {
    setNodes([])
    setEdges([])
  }

  const handleLayout = () => {
  const { nodes: ln, edges: le } = getLayoutedElements(nodes, edges)
  setNodes(ln)
  setEdges(le)
}

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#080b14', display: 'flex', flexDirection: 'column' }}>

<Topbar onSubmit={handleSubmit} onClear={handleClear} onLayout={handleLayout} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        <Sidebar nodes={nodes.length} edges={edges.length} />

        <div ref={wrapperRef} style={{ flex: 1, height: '100%' }}>
          <ReactFlow
            style={{ width: '100%', height: '100%' }}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={{ type: 'glowEdge', animated: true }}
            fitView
          >
            <Background variant="dots" gap={28} size={1.2} color="#1e2a45" />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

      </div>

      {alertInfo && (
        <PipelineAlert info={alertInfo} onClose={() => setAlertInfo(null)} />
      )}

    </div>
  )
}

export default function App() {
  return (
    <ReactFlowProvider>
      <OrchestratorApp />
    </ReactFlowProvider>
  )
}