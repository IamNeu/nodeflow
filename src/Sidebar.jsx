const NODE_TYPES = [
  // IO
  { type: 'input',       label: 'Input',        icon: '⬇️',  color: '#3b82f6', glow: '#60a5fa', group: 'I/O' },
  { type: 'output',      label: 'Output',       icon: '⬆️',  color: '#06b6d4', glow: '#22d3ee', group: 'I/O' },
  // Models
  { type: 'gpt4o',       label: 'GPT-4o',       icon: '🟢',  color: '#10a37f', glow: '#34d399', group: 'AI Models' },
  { type: 'claude',      label: 'Claude',       icon: '🟠',  color: '#d97706', glow: '#fbbf24', group: 'AI Models' },
  { type: 'gemini',      label: 'Gemini',       icon: '🔵',  color: '#4285f4', glow: '#93c5fd', group: 'AI Models' },
  { type: 'llama',       label: 'Llama 3',      icon: '🦙',  color: '#8b5cf6', glow: '#a78bfa', group: 'AI Models' },
  { type: 'mistral',     label: 'Mistral',      icon: '💨',  color: '#f97316', glow: '#fb923c', group: 'AI Models' },
  // Functional
  { type: 'prompt',      label: 'Prompt',       icon: '✏️',  color: '#f59e0b', glow: '#fbbf24', group: 'Functional' },
  { type: 'memory',      label: 'Memory',       icon: '💾',  color: '#10b981', glow: '#34d399', group: 'Functional' },
  { type: 'rag',         label: 'RAG',          icon: '🔍',  color: '#6366f1', glow: '#818cf8', group: 'Functional' },
  { type: 'vectorstore', label: 'Vector Store', icon: '🗄️',  color: '#0ea5e9', glow: '#38bdf8', group: 'Functional' },
  { type: 'apicall',     label: 'API Call',     icon: '🌐',  color: '#14b8a6', glow: '#2dd4bf', group: 'Functional' },
  { type: 'parser',      label: 'Parser',       icon: '🔤',  color: '#a855f7', glow: '#c084fc', group: 'Functional' },
  { type: 'router',      label: 'Router',       icon: '🔀',  color: '#ec4899', glow: '#f472b6', group: 'Functional' },
  // Logic
  { type: 'condition',   label: 'Condition',    icon: '❓',  color: '#f97316', glow: '#fb923c', group: 'Logic' },
  { type: 'transform',   label: 'Transform',    icon: '⚡',  color: '#eab308', glow: '#facc15', group: 'Logic' },
  { type: 'tool',        label: 'Tool',         icon: '🔧',  color: '#ef4444', glow: '#f87171', group: 'Logic' },
]

const GROUPS = ['I/O', 'AI Models', 'Functional', 'Logic']

export default function Sidebar({ nodes, edges }) {
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/nodeType', nodeType)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div style={{
      width: 220,
      background: '#0c1020',
      borderRight: '1px solid #1e2a45',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 12px',
      gap: 4,
      overflowY: 'auto',
    }}>

      {GROUPS.map((group) => (
        <div key={group}>

          {/* Group header */}
          <div style={{
            color: '#475569', fontSize: 10,
            letterSpacing: 2, textTransform: 'uppercase',
            padding: '10px 4px 6px 4px',
          }}>
            {group}
          </div>

          {/* Nodes in this group */}
          {NODE_TYPES.filter((n) => n.group === group).map((cfg) => (
            <div
              key={cfg.type}
              draggable
              onDragStart={(e) => onDragStart(e, cfg.type)}
              style={{
                background: '#131929',
                border: `1px solid ${cfg.color}33`,
                borderRadius: 10,
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'grab',
                marginBottom: 4,
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(4px)'
                e.currentTarget.style.boxShadow = `0 0 12px ${cfg.color}44`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: 18 }}>{cfg.icon}</span>
              <div>
                <div style={{ color: cfg.glow, fontSize: 12, fontWeight: 700 }}>
                  {cfg.label}
                </div>
                <div style={{ color: '#475569', fontSize: 10 }}>drag to canvas</div>
              </div>
            </div>
          ))}

        </div>
      ))}

      {/* Stats at bottom */}
      <div style={{
        marginTop: 'auto',
        borderTop: '1px solid #1e2a45',
        paddingTop: 16,
      }}>
        <div style={{
          color: '#475569', fontSize: 10,
          letterSpacing: 2, textTransform: 'uppercase',
          marginBottom: 10,
        }}>
          Canvas Info
        </div>
        {[
          { label: 'Nodes', value: nodes, color: '#60a5fa' },
          { label: 'Edges', value: edges, color: '#a78bfa' },
        ].map((s) => (
          <div key={s.label} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '5px 0',
            borderBottom: '1px solid #1a2235',
          }}>
            <span style={{ color: '#64748b', fontSize: 12 }}>{s.label}</span>
            <span style={{ color: s.color, fontSize: 12, fontWeight: 700 }}>{s.value}</span>
          </div>
        ))}
      </div>

    </div>
  )
}