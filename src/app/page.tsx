import Terminal from "@/components/Terminal";
import CopyButton from "@/components/CopyButton";

const COMMAND_GROUPS = [
  {
    category: "Tasks",
    icon: "📝",
    commands: [
      { name: "add", desc: "Create a new task" },
      { name: "start", desc: "Move to in-progress" },
      { name: "done", desc: "Mark as completed" },
      { name: "block", desc: "Block with reason" },
      { name: "unblock", desc: "Resume blocked task" },
      { name: "cancel", desc: "Cancel a task" },
      { name: "comment", desc: "Add progress note" },
      { name: "update", desc: "Change any field" },
    ],
  },
  {
    category: "Views",
    icon: "📊",
    commands: [
      { name: "board", desc: "Kanban board view" },
      { name: "list", desc: "Flat list with filters" },
      { name: "show", desc: "Task detail + events" },
      { name: "summary", desc: "Quick stats" },
      { name: "stale", desc: "Stuck task detection" },
      { name: "timeline", desc: "Full event log" },
    ],
  },
  {
    category: "Agents",
    icon: "🤖",
    commands: [
      { name: "register", desc: "Register an agent" },
      { name: "heartbeat", desc: "Update last seen" },
      { name: "health", desc: "Agent status check" },
      { name: "list", desc: "All registered agents" },
    ],
  },
];

const MCP_CONFIG = `{
  "mcpServers": {
    "agentboard": {
      "command": "npx",
      "args": ["-y", "@andupetcu/agentboard", "mcp"]
    }
  }
}`;

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[var(--color-accent)] border border-[var(--color-accent-dim)]/30 bg-[var(--color-accent)]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              open source
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-center max-w-4xl mx-auto leading-[1.1]">
            Task management for{" "}
            <span className="text-[var(--color-accent)]">AI agents</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[var(--color-muted)] text-center max-w-2xl mx-auto leading-relaxed">
            A kanban board your agents can actually use.
            <br className="hidden sm:block" />{" "}
            SQLite-backed, CLI-first, MCP-ready.
          </p>

          <div className="mt-10 flex justify-center">
            <CopyButton text="npm install -g @andupetcu/agentboard" />
          </div>

          {/* Terminal */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Terminal />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* Why AgentBoard */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Why AgentBoard
        </h2>
        <p className="text-[var(--color-muted)] text-center mb-12 max-w-xl mx-auto">
          Built for the agent workflow. No fluff.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            icon="⚡"
            title="Zero Config"
            description="Single SQLite file. No server, no setup, no account."
          />
          <Card
            icon="▸"
            title="CLI-First"
            description="16 commands. Sub-50ms. Designed for scripts and agents."
          />
          <Card
            icon="◆"
            title="MCP Native"
            description="15 tools over stdio. Drop into Claude Code or Codex config."
          />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* Commands Overview */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Commands
        </h2>
        <p className="text-[var(--color-muted)] text-center mb-12 max-w-xl mx-auto">
          Everything you need, nothing you don&apos;t.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMMAND_GROUPS.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-mono text-[var(--color-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>{group.icon}</span>
                {group.category}
              </h3>
              <div className="space-y-2">
                {group.commands.map((cmd) => (
                  <div
                    key={cmd.name}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-card)] transition-colors group"
                  >
                    <code className="text-sm font-mono text-[var(--color-accent)] shrink-0">
                      {cmd.name}
                    </code>
                    <span className="text-sm text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors">
                      {cmd.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      {/* MCP Integration */}
      <section className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          MCP Integration
        </h2>
        <p className="text-[var(--color-muted)] text-center mb-12 max-w-xl mx-auto">
          Add to your{" "}
          <code className="text-sm bg-[var(--color-card)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
            claude_desktop_config.json
          </code>{" "}
          or{" "}
          <code className="text-sm bg-[var(--color-card)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
            .claude/settings.json
          </code>{" "}
          and your agent gets 15 task management tools instantly.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border border-[var(--color-terminal-border)] bg-[var(--color-terminal-bg)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-terminal-border)] bg-[#161b22]">
              <span className="text-xs text-[var(--color-terminal-muted)] font-mono">
                settings.json
              </span>
            </div>
            <pre className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <code>
                <span className="text-[var(--color-terminal-muted)]">
                  {"{\n"}
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {"  "}
                </span>
                <span className="text-[var(--color-terminal-blue)]">
                  &quot;mcpServers&quot;
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {": {\n"}
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {"    "}
                </span>
                <span className="text-[var(--color-terminal-green)]">
                  &quot;agentboard&quot;
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {": {\n"}
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {"      "}
                </span>
                <span className="text-[var(--color-terminal-blue)]">
                  &quot;command&quot;
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {": "}
                </span>
                <span className="text-[var(--color-terminal-yellow)]">
                  &quot;npx&quot;
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {",\n"}
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {"      "}
                </span>
                <span className="text-[var(--color-terminal-blue)]">
                  &quot;args&quot;
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {": ["}
                </span>
                <span className="text-[var(--color-terminal-yellow)]">
                  &quot;-y&quot;
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {", "}
                </span>
                <span className="text-[var(--color-terminal-yellow)]">
                  &quot;agentboard&quot;
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {", "}
                </span>
                <span className="text-[var(--color-terminal-yellow)]">
                  &quot;mcp&quot;
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {"]\n"}
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {"    }\n"}
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {"  }\n"}
                </span>
                <span className="text-[var(--color-terminal-muted)]">
                  {"}"}
                </span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <span className="font-mono font-bold text-[var(--color-foreground)]">
              AgentBoard
            </span>
            <span className="text-[var(--color-border)]">·</span>
            <span>Built by Andrei Petcu</span>
            <span className="text-[var(--color-border)]">·</span>
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/andupetcu/agentboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/@andupetcu/agentboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Card({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent-dim)]/40 transition-all duration-300">
      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.03)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="text-2xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
