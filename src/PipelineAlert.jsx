function isDAG(nodes, edges) {
  const adj = {}
  nodes.forEach((n) => (adj[n.id] = []))
  edges.forEach((e) => adj[e.source]?.push(e.target))

  const visited = new Set()
  const stack = new Set()

  function dfs(id) {
    if (stack.has(id)) return false
    if (visited.has(id)) return true
    visited.add(id)
    stack.add(id)
    for (const neighbor of adj[id] || []) {
      if (!dfs(neighbor)) return false
    }
    stack.delete(id)
    return true
  }

  return nodes.every((n) => dfs(n.id))
}

export { isDAG }

export default function PipelineAlert({ info, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 28, left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      minWidth: 380,
      background: 'linear-gradient(135deg, #0f1117ee, #1a1d2eee)',
      border: `1.5px solid ${info.valid ? '#34d399' : '#f87171'}`,
      borderRadius: 18,
      padding: '24px 32px',
      backdropFilter: 'blur(20px)',
      boxShadow: info.valid
        ? '0 8px 40px #10b98155'
        : '0 8px 40px #ef444455',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <div style={{ fontSize: 32 }}>
          {info.valid ? '✅' : '⛔'}
        </div>
        <div>
          <div style={{
            color: info.valid ? '#34d399' : '#f87171',
            fontSize: 18, fontWeight: 800,
          }}>
            Pipeline {info.valid ? 'Submitted!' : 'Invalid!'}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>
            {info.valid
              ? 'Your DAG is valid and ready to run'
              : 'Graph contains a cycle — not a valid DAG'}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 18 }}>
        {[
          { label: 'DAG',   value: String(info.valid), color: info.valid ? '#34d399' : '#f87171' },
          { label: 'Nodes', value: info.nodes,         color: '#60a5fa' },
          { label: 'Edges', value: info.edges,         color: '#a78bfa' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: `${stat.color}11`,
            border: `1px solid ${stat.color}33`,
            borderRadius: 12,
            padding: '12px 16px',
            textAlign: 'center',
          }}>
            <div style={{ color: stat.color, fontSize: 22, fontWeight: 800, fontFamily: 'monospace' }}>
              {stat.value}
            </div>
            <div style={{ color: '#64748b', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Dismiss */}
      <button
        onClick={onClose}
        style={{
          width: '100%', padding: '10px',
          borderRadius: 10, border: 'none',
          background: info.valid ? '#34d39922' : '#f8717122',
          color: info.valid ? '#34d399' : '#f87171',
          fontWeight: 700, fontSize: 14, cursor: 'pointer',
        }}
      >
        Dismiss
      </button>

    </div>
  )
}