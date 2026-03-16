import { useState } from 'react'
import { Handle, Position } from 'reactflow'
import { motion } from 'framer-motion'

const CONFIG = {
  // ── Inputs / Outputs ──────────────────────
  input:      { label: 'Input',        icon: '⬇️',  color: '#3b82f6', glow: '#60a5fa', group: 'io' },
  output:     { label: 'Output',       icon: '⬆️',  color: '#06b6d4', glow: '#22d3ee', group: 'io' },

  // ── AI Models ─────────────────────────────
  gpt4o:      { label: 'GPT-4o',       icon: '🟢',  color: '#10a37f', glow: '#34d399', group: 'model' },
  claude:     { label: 'Claude',       icon: '🟠',  color: '#d97706', glow: '#fbbf24', group: 'model' },
  gemini:     { label: 'Gemini',       icon: '🔵',  color: '#4285f4', glow: '#93c5fd', group: 'model' },
  llama:      { label: 'Llama 3',      icon: '🦙',  color: '#8b5cf6', glow: '#a78bfa', group: 'model' },
  mistral:    { label: 'Mistral',      icon: '💨',  color: '#f97316', glow: '#fb923c', group: 'model' },

  // ── Functional ────────────────────────────
  prompt:     { label: 'Prompt',       icon: '✏️',  color: '#f59e0b', glow: '#fbbf24', group: 'func' },
  memory:     { label: 'Memory',       icon: '💾',  color: '#10b981', glow: '#34d399', group: 'func' },
  rag:        { label: 'RAG',          icon: '🔍',  color: '#6366f1', glow: '#818cf8', group: 'func' },
  vectorstore:{ label: 'Vector Store', icon: '🗄️',  color: '#0ea5e9', glow: '#38bdf8', group: 'func' },
  apicall:    { label: 'API Call',     icon: '🌐',  color: '#14b8a6', glow: '#2dd4bf', group: 'func' },
  parser:     { label: 'Parser',       icon: '🔤',  color: '#a855f7', glow: '#c084fc', group: 'func' },
  router:     { label: 'Router',       icon: '🔀',  color: '#ec4899', glow: '#f472b6', group: 'func' },

  // ── Logic ─────────────────────────────────
  condition:  { label: 'Condition',    icon: '❓',  color: '#f97316', glow: '#fb923c', group: 'logic' },
  transform:  { label: 'Transform',   icon: '⚡',  color: '#eab308', glow: '#facc15', group: 'logic' },
  tool:       { label: 'Tool',         icon: '🔧',  color: '#ef4444', glow: '#f87171', group: 'logic' },
}

export default function OrchestratorNode({ data, selected }) {
  const cfg = CONFIG[data.nodeType] || CONFIG['tool']
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(data.label)

  const handleDoubleClick = () => setEditing(true)

  const handleBlur = () => {
    setEditing(false)
    data.label = name  // update the node label
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditing(false)
      data.label = name
    }
    if (e.key === 'Escape') {
      setEditing(false)
      setName(data.label)
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.03 }}
      style={{
        background: `linear-gradient(135deg, ${cfg.color}18 0%, ${cfg.color}08 100%)`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${selected ? cfg.glow : cfg.color + '40'}`,
        borderRadius: 16,
        padding: '12px 18px',
        minWidth: 175,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: selected
          ? `0 0 0 2px ${cfg.glow}, 0 8px 32px ${cfg.color}55, inset 0 1px 0 ${cfg.color}30`
          : `0 4px 24px ${cfg.color}22, inset 0 1px 0 ${cfg.color}20`,
      }}>

      {/* glass shine top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${cfg.glow}88, transparent)`,
      }} />

      {/* glass shine diagonal */}
      <div style={{
        position: 'absolute', top: 0, left: '-50%',
        width: '60%', height: '100%',
        background: `linear-gradient(105deg, transparent 40%, ${cfg.color}10 50%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* glow blob */}
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: 80, height: 80, borderRadius: '50%',
        background: `radial-gradient(circle, ${cfg.color}30, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* left handle */}
      <Handle type="target" position={Position.Left} style={{
        background: cfg.color,
        border: '2px solid #0f1117',
        width: 10, height: 10,
        boxShadow: `0 0 8px ${cfg.glow}`,
      }} />

      {/* content */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `linear-gradient(135deg, ${cfg.color}30, ${cfg.color}10)`,
          border: `1px solid ${cfg.color}50`,
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 18,
          boxShadow: `0 2px 8px ${cfg.color}30`,
          flexShrink: 0,
        }}>
          {cfg.icon}
        </div>

        <div>
          {/* type label */}
          <div style={{
            color: cfg.glow, fontSize: 10, fontWeight: 700,
            letterSpacing: 1.5, textTransform: 'uppercase',
            fontFamily: 'monospace',
            textShadow: `0 0 8px ${cfg.glow}88`,
          }}>
            {cfg.label}
          </div>

          {/* ✅ editable name */}
          {editing ? (
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              style={{
                background: `${cfg.color}22`,
                border: `1px solid ${cfg.color}66`,
                borderRadius: 6,
                color: '#e2e8f0',
                fontSize: 13,
                fontWeight: 600,
                padding: '2px 6px',
                outline: 'none',
                width: 110,
                marginTop: 2,
              }}
            />
          ) : (
            <div
              onDoubleClick={handleDoubleClick}
              title="Double click to rename"
              style={{
                color: '#e2e8f0', fontSize: 13,
                fontWeight: 600, marginTop: 2,
                textShadow: '0 1px 4px #00000088',
                cursor: 'text',
                borderBottom: `1px dashed ${cfg.color}44`,
                paddingBottom: 1,
              }}
            >
              {name}
            </div>
          )}
        </div>
      </div>

      {/* right handle */}
      <Handle type="source" position={Position.Right} style={{
        background: cfg.color,
        border: '2px solid #0f1117',
        width: 10, height: 10,
        boxShadow: `0 0 8px ${cfg.glow}`,
      }} />

    </motion.div>
  )
}