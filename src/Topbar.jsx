export default function Topbar({ onSubmit, onClear, onLayout }) {
  return (
    <div style={{
      height: 58,
      background: '#0c1020',
      borderBottom: '1px solid #1e2a45',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 0 16px #6366f155',
        }}>
          ⚡
        </div>
        <div>
          <div style={{ color: '#e2e8f0', fontWeight: 800, fontSize: 16 }}>
            Node<span style={{ color: '#6366f1' }}>flow</span>
          </div>
          <div style={{ color: '#475569', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Pipeline Builder
          </div>
        </div>
      </div>

      {/* Pipeline name */}
      <div style={{
        background: '#1e2a45',
        border: '1px solid #2d3f5e',
        borderRadius: 8,
        padding: '6px 16px',
        color: '#94a3b8',
        fontSize: 13,
        fontWeight: 500,
      }}>
        📋 My AI Pipeline
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10 }}>

        {/* ✅ NEW Auto Layout button */}
        <button
          onClick={onLayout}
          style={{
            padding: '8px 16px', borderRadius: 10,
            border: '1px solid #4ade8044',
            background: '#4ade8011',
            color: '#4ade80', fontWeight: 600,
            fontSize: 12, cursor: 'pointer',
          }}
        >
          ⚡ Auto Layout
        </button>

        <button
          onClick={onClear}
          style={{
            padding: '8px 16px', borderRadius: 10,
            border: '1px solid #f8717144',
            background: '#f8717111',
            color: '#f87171', fontWeight: 600,
            fontSize: 12, cursor: 'pointer',
          }}
        >
          🗑️ Clear
        </button>

        <button
          onClick={onSubmit}
          style={{
            padding: '8px 22px', borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', fontWeight: 700,
            fontSize: 13, cursor: 'pointer',
            boxShadow: '0 4px 16px #6366f155',
          }}
        >
          🚀 Submit Pipeline
        </button>

      </div>
    </div>
  )
}