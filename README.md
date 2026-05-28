# NodeFlow — Visual Agentic AI Orchestration Engine

> Design and run multi-agent AI pipelines visually — no code required.

🔗 **[Live Demo](https://nodeflow-nu.vercel.app)** | Built with React · ReactFlow · Node.js · OpenAI API · Claude API

---

## What is NodeFlow?

NodeFlow is a visual AI orchestration platform that lets you design, connect, and run multi-agent AI pipelines using a drag-and-drop canvas — think LangGraph meets a visual node editor.

Most AI orchestration tools are either too code-heavy for non-technical users or too limited for complex workflows. NodeFlow bridges that gap with a **visual-first approach**.

---

## ✨ Features

- 🎨 **Visual DAG Canvas** — Drag-and-drop node editor built with ReactFlow for designing multi-agent pipelines
- 🤖 **Multi-Agent Architecture** — Planner-executor-critic agent design with parent-child node relationships
- 🧠 **Persistent Memory Nodes** — Long-running agent workflows with context preserved across steps
- ⚡ **Custom Execution Engine** — Node.js engine manages state and context across sequential LLM calls
- 🔌 **Multi-Provider LLM Support** — OpenAI, Azure OpenAI, and Claude API out of the box
- 🔒 **Secure Proxy Layer** — API key management across multiple providers
- 🔄 **Error Recovery** — Protocols for handling non-deterministic AI outputs gracefully

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, ReactFlow, TypeScript, Vite |
| Backend | Node.js, Express |
| AI | OpenAI API, Claude API|
| Styling | TailwindCSS |
| Deployment | Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/IamNeu/nodeflow.git
cd nodeflow

# Install dependencies
npm install

# Add your API keys
cp .env.example .env
# Add OPENAI_API_KEY and ANTHROPIC_API_KEY to .env

# Start the dev server
npm run dev
```

---

## 🎯 Use Cases

- Build customer support agents with escalation logic
- Chain research → summarize → format pipelines
- Design multi-step document processing workflows
- Prototype agentic systems without writing orchestration code

---

## 🗺 Roadmap

- [ ] RAG pipeline nodes with vector database support
- [ ] Export pipelines as executable code
- [ ] Team collaboration features
- [ ] Template library for common agent patterns

---

## 👩‍💻 Author

**Neeru Nayak** — AI Engineer specializing in Agentic AI, LLM Orchestration & Fintech

- 🔗 [LinkedIn](https://linkedin.com/in/neeru-nayak-a280b416)
- 🌐 [Wellfound](https://wellfound.com/u/neeru-nayak)
- 📧 neerusometimes@gmail.com

---

⭐ If you find this interesting, give it a star!
