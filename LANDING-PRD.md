# PRD: AgentBoard Landing Page

## Goal
Single-page landing site for AgentBoard — the CLI task manager for AI agents. Clean, dark, dev-tool aesthetic.

## Stack
- **Next.js 15** (App Router, static export)
- **Tailwind CSS v4**
- **TypeScript**
- No backend, pure static site

## Design Direction
- Dark theme (near-black bg, light text)
- Monospace/code vibes — this is a dev tool
- Minimal — one page, no bloat
- Inspired by: Linear, Warp, Railway landing pages

## Sections (top to bottom)

### 1. Hero
- Headline: "Task management for AI agents"
- Subline: "A kanban board your agents can actually use. SQLite-backed, CLI-first, MCP-ready."
- CTA: `npm install -g agentboard` (copy-to-clipboard)
- Animated terminal showing board output (use the kanban example from README)

### 2. Why AgentBoard
3 cards:
- **Zero Config** — Single SQLite file. No server, no setup, no account.
- **CLI-First** — 16 commands. Sub-50ms. Designed for scripts and agents.
- **MCP Native** — 15 tools over stdio. Drop into Claude Code or Codex config.

### 3. Live Demo (Terminal)
Fake terminal component showing a sequence:
```
$ agentboard add "Build REST API" --project myapp --priority p0
✅ Created [ab-001] Build REST API

$ agentboard start ab-001
🔄 [ab-001] → IN_PROGRESS

$ agentboard board
📋 AgentBoard — 1 project, 1 task
  myapp (1 task)
  └─ 🔴 P0 [ab-001] Build REST API    —    🔄 IN_PROGRESS  just now
```

### 4. Commands Overview
Clean grid or table of all commands grouped by category (Tasks, Views, Agents). Use icons.

### 5. MCP Integration
Code block showing the MCP config JSON. Brief explanation.

### 6. Footer
- GitHub link
- npm link
- "Built by Andrei Petcu"
- MIT license

## Terminal Component
- Dark bg (#0d1117), green/colored text
- Typing animation for commands
- Instant output rendering after each command
- Loop or stop after full sequence

## Pages
- Just `/` — single page, no routing needed

## Build
- `next build` with `output: 'export'` for static HTML
- Should produce `out/` folder ready for deployment

## Directory
Build in `~/Projects/agentboard-site/`

## When Done
1. `npm run build` passes
2. Preview looks good (`npx serve out`)
3. `git init && git add -A && git commit -m "feat: agentboard landing page"`
4. Run: `openclaw system event --text "Done: AgentBoard landing page built — static Next.js site ready for deploy" --mode now`
