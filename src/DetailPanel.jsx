const CONFIG = {
  input:       { label: 'Input',        icon: '⬇️',  color: '#3b82f6', glow: '#60a5fa' },
  output:      { label: 'Output',       icon: '⬆️',  color: '#06b6d4', glow: '#22d3ee' },
  gpt4o:       { label: 'GPT-4o',       icon: '🟢',  color: '#10a37f', glow: '#34d399' },
  claude:      { label: 'Claude',       icon: '🟠',  color: '#d97706', glow: '#fbbf24' },
  gemini:      { label: 'Gemini',       icon: '🔵',  color: '#4285f4', glow: '#93c5fd' },
  llama:       { label: 'Llama 3',      icon: '🦙',  color: '#8b5cf6', glow: '#a78bfa' },
  mistral:     { label: 'Mistral',      icon: '💨',  color: '#f97316', glow: '#fb923c' },
  prompt:      { label: 'Prompt',       icon: '✏️',  color: '#f59e0b', glow: '#fbbf24' },
  memory:      { label: 'Memory',       icon: '💾',  color: '#10b981', glow: '#34d399' },
  rag:         { label: 'RAG',          icon: '🔍',  color: '#6366f1', glow: '#818cf8' },
  vectorstore: { label: 'Vector Store', icon: '🗄️',  color: '#0ea5e9', glow: '#38bdf8' },
  apicall:     { label: 'API Call',     icon: '🌐',  color: '#14b8a6', glow: '#2dd4bf' },
  parser:      { label: 'Parser',       icon: '🔤',  color: '#a855f7', glow: '#c084fc' },
  router:      { label: 'Router',       icon: '🔀',  color: '#ec4899', glow: '#f472b6' },
  condition:   { label: 'Condition',    icon: '❓',  color: '#f97316', glow: '#fb923c' },
  transform:   { label: 'Transform',   icon: '⚡',  color: '#eab308', glow: '#facc15' },
  tool:        { label: 'Tool',         icon: '🔧',  color: '#ef4444', glow: '#f87171' },
}

// which fields to show per node type
const FIELDS = {
  gpt4o:       ['systemPrompt', 'temperature', 'maxTokens', 'apiKey'],
  claude:      ['systemPrompt', 'temperature', 'maxTokens', 'apiKey'],
  gemini:      ['systemPrompt', 'temperature', 'maxTokens', 'apiKey'],
  llama:       ['systemPrompt', 'temperature', 'maxTokens'],
  mistral:     ['systemPrompt', 'temperature', 'maxTokens', 'apiKey'],
  prompt:      ['systemPrompt'],
  memory:      ['memoryType', 'maxMessages'],
  rag:         ['topK', 'threshold'],
  vectorstore: ['dimensions', 'metric'],
  apicall:     ['url', 'method', 'apiKey'],
  parser:      ['format', 'instructions'],
  router:      ['conditions'],
  condition:   ['expression'],
  transform:   ['instructions'],
  tool:        ['toolName', 'description'],
  input:       [],
  output:      [],
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        color: '#64748b', fontSize: 10,
        letterSpacing: 1.5, textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'monospace',
      }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function Input({ value, onChange, placeholder, color }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        background: `${color}11`,
        border: `1px solid ${color}33`,
        borderRadius: 8,
        padding: '8px 10px',
        color: '#e2e8f0',
        fontSize: 12,
        outline: 'none',
        boxSizing: 'border-box',
      }}
    />
  )
}

function Textarea({ value, onChange, placeholder, color }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      style={{
        width: '100%',
        background: `${color}11`,
        border: `1px solid ${color}33`,
        borderRadius: 8,
        padding: '8px 10px',
        color: '#e2e8f0',
        fontSize: 12,
        outline: 'none',
        resize: 'vertical',
        boxSizing: 'border-box',
        fontFamily: 'monospace',
      }}
    />
  )
}

function Slider({ value, onChange, min, max, step, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={onChange}
        style={{ flex: 1, accentColor: color }}
      />
      <span style={{
        color: color, fontSize: 12,
        fontWeight: 700, fontFamily: 'monospace',
        minWidth: 32, textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  )
}

export default function DetailPanel({ node, onChange, onClose }) {
  if (!node) return null

  const cfg = CONFIG[node.data.nodeType] || CONFIG['tool']
  const fields = FIELDS[node.data.nodeType] || []
  const d = node.data

  const update = (key, value) => onChange(node.id, { ...d, [key]: value })

  return (
    <div style={{
      width: 260,
      background: '#0c1020',
      borderLeft: '1px solid #1e2a45',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      flexShrink: 0,
    }}>

      {/* Header */}
      <div style={{
        padding: '16px 16px 12px',
        borderBottom: '1px solid #1e2a45',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `${cfg.color}22`,
            border: `1px solid ${cfg.color}44`,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 18,
          }}>
            {cfg.icon}
          </div>
          <div>
            <div style={{ color: cfg.glow, fontSize: 10, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase' }}>
              {cfg.label}
            </div>
            <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>
              {d.label}
            </div>
          </div>
        </div>

        {/* close button */}
        <button
          onClick={onClose}
          style={{
            background: '#1e2a45', border: 'none',
            borderRadius: 6, color: '#64748b',
            width: 26, height: 26, cursor: 'pointer',
            fontSize: 14, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>
      </div>

      {/* Fields */}
      <div style={{ padding: 16, flex: 1 }}>

        {fields.length === 0 && (
          <div style={{ color: '#334155', fontSize: 13, textAlign: 'center', marginTop: 20 }}>
            No settings for this node
          </div>
        )}

        {fields.includes('systemPrompt') && (
          <Field label="System Prompt">
            <Textarea
              value={d.systemPrompt || ''}
              onChange={(e) => update('systemPrompt', e.target.value)}
              placeholder="You are a helpful assistant..."
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('temperature') && (
          <Field label={`Temperature`}>
            <Slider
              value={d.temperature ?? 0.7}
              onChange={(e) => update('temperature', parseFloat(e.target.value))}
              min={0} max={2} step={0.1}
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('maxTokens') && (
          <Field label="Max Tokens">
            <Slider
              value={d.maxTokens ?? 1000}
              onChange={(e) => update('maxTokens', parseInt(e.target.value))}
              min={100} max={4000} step={100}
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('apiKey') && (
          <Field label="API Key">
            <Input
              value={d.apiKey || ''}
              onChange={(e) => update('apiKey', e.target.value)}
              placeholder="sk-..."
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('url') && (
          <Field label="URL">
            <Input
              value={d.url || ''}
              onChange={(e) => update('url', e.target.value)}
              placeholder="https://api.example.com"
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('method') && (
          <Field label="Method">
            <select
              value={d.method || 'GET'}
              onChange={(e) => update('method', e.target.value)}
              style={{
                width: '100%',
                background: `${cfg.color}11`,
                border: `1px solid ${cfg.color}33`,
                borderRadius: 8, padding: '8px 10px',
                color: '#e2e8f0', fontSize: 12, outline: 'none',
              }}
            >
              {['GET', 'POST', 'PUT', 'DELETE'].map(m => (
                <option key={m} value={m} style={{ background: '#0c1020' }}>{m}</option>
              ))}
            </select>
          </Field>
        )}

        {fields.includes('topK') && (
          <Field label="Top K Results">
            <Slider
              value={d.topK ?? 5}
              onChange={(e) => update('topK', parseInt(e.target.value))}
              min={1} max={20} step={1}
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('maxMessages') && (
          <Field label="Max Messages">
            <Slider
              value={d.maxMessages ?? 10}
              onChange={(e) => update('maxMessages', parseInt(e.target.value))}
              min={1} max={50} step={1}
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('instructions') && (
          <Field label="Instructions">
            <Textarea
              value={d.instructions || ''}
              onChange={(e) => update('instructions', e.target.value)}
              placeholder="Describe what this node should do..."
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('expression') && (
          <Field label="Condition Expression">
            <Input
              value={d.expression || ''}
              onChange={(e) => update('expression', e.target.value)}
              placeholder="e.g. output.length > 100"
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('toolName') && (
          <Field label="Tool Name">
            <Input
              value={d.toolName || ''}
              onChange={(e) => update('toolName', e.target.value)}
              placeholder="e.g. web_search"
              color={cfg.color}
            />
          </Field>
        )}

        {fields.includes('description') && (
          <Field label="Description">
            <Textarea
              value={d.description || ''}
              onChange={(e) => update('description', e.target.value)}
              placeholder="What does this tool do?"
              color={cfg.color}
            />
          </Field>
        )}

      </div>
    </div>
  )
}