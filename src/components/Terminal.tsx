"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TerminalLine {
  type: "command" | "output" | "blank";
  text: string;
}

interface TerminalSequence {
  command: string;
  output: TerminalLine[];
}

const SEQUENCES: TerminalSequence[] = [
  {
    command: 'agentboard add "Build REST API" --project myapp --priority p0',
    output: [
      {
        type: "output",
        text: "\u001b[green]✅\u001b[/] Created \u001b[blue][ab-001]\u001b[/] Build REST API",
      },
    ],
  },
  {
    command: "agentboard start ab-001",
    output: [
      {
        type: "output",
        text: "\u001b[yellow]🔄\u001b[/] \u001b[blue][ab-001]\u001b[/] → \u001b[cyan]IN_PROGRESS\u001b[/]",
      },
    ],
  },
  {
    command: "agentboard board",
    output: [
      {
        type: "output",
        text: "\u001b[purple]📋\u001b[/] \u001b[bold]AgentBoard\u001b[/] — 1 project, 1 task",
      },
      {
        type: "output",
        text: "  \u001b[bold]myapp\u001b[/] \u001b[muted](1 task)\u001b[/]",
      },
      {
        type: "output",
        text: "  └─ \u001b[red]🔴 P0\u001b[/] \u001b[blue][ab-001]\u001b[/] Build REST API    —    \u001b[yellow]🔄 IN_PROGRESS\u001b[/]  \u001b[muted]just now\u001b[/]",
      },
    ],
  },
];

function parseColoredText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const colorMap: Record<string, string> = {
    green: "var(--color-terminal-green)",
    blue: "var(--color-terminal-blue)",
    yellow: "var(--color-terminal-yellow)",
    red: "var(--color-terminal-red)",
    purple: "var(--color-terminal-purple)",
    cyan: "var(--color-terminal-cyan)",
    muted: "var(--color-terminal-muted)",
  };

  while (remaining.length > 0) {
    const match = remaining.match(
      /\u001b\[(green|blue|yellow|red|purple|cyan|muted|bold)\](.*?)\u001b\[\/\]/
    );
    if (!match || match.index === undefined) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (match.index > 0) {
      parts.push(
        <span key={key++}>{remaining.substring(0, match.index)}</span>
      );
    }

    const tag = match[1];
    const content = match[2];

    if (tag === "bold") {
      parts.push(
        <span key={key++} className="font-bold text-[var(--color-foreground)]">
          {content}
        </span>
      );
    } else {
      parts.push(
        <span key={key++} style={{ color: colorMap[tag] }}>
          {content}
        </span>
      );
    }

    remaining = remaining.substring(match.index + match[0].length);
  }

  return parts;
}

const TYPING_SPEED = 40;
const COMMAND_PAUSE = 600;
const OUTPUT_LINE_DELAY = 80;
const SEQUENCE_PAUSE = 1000;
const RESTART_PAUSE = 3000;

export default function Terminal({ className = "" }: { className?: string }) {
  const [displayedLines, setDisplayedLines] = useState<
    { type: "command" | "output" | "blank"; content: string; final: boolean }[]
  >([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const animationRef = useRef<{ cancelled: boolean }>({ cancelled: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, ms);
        const checkCancel = setInterval(() => {
          if (animationRef.current.cancelled) {
            clearTimeout(timer);
            clearInterval(checkCancel);
            resolve();
          }
        }, 50);
      }),
    []
  );

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const ctx = { cancelled: false };
    animationRef.current = ctx;

    async function runAnimation() {
      while (!ctx.cancelled) {
        setDisplayedLines([]);

        for (let si = 0; si < SEQUENCES.length && !ctx.cancelled; si++) {
          const seq = SEQUENCES[si];

          // Type command character by character
          for (let ci = 0; ci <= seq.command.length && !ctx.cancelled; ci++) {
            const partial = seq.command.substring(0, ci);
            setDisplayedLines((prev) => {
              const lines = prev.filter((l) => l.final);
              lines.push({ type: "command", content: partial, final: false });
              return lines;
            });
            if (ci < seq.command.length) {
              // Variable speed: faster for spaces, normal for chars
              const char = seq.command[ci];
              const delay =
                char === " "
                  ? TYPING_SPEED * 0.5
                  : char === "-"
                    ? TYPING_SPEED * 0.7
                    : TYPING_SPEED + Math.random() * 20 - 10;
              await sleep(delay);
            }
          }

          // Finalize command line
          setDisplayedLines((prev) => {
            const lines = prev.filter((l) => l.final);
            lines.push({
              type: "command",
              content: seq.command,
              final: true,
            });
            return lines;
          });

          await sleep(COMMAND_PAUSE);

          // Render output lines one by one
          for (
            let oi = 0;
            oi < seq.output.length && !ctx.cancelled;
            oi++
          ) {
            const outputLine = seq.output[oi];
            setDisplayedLines((prev) => [
              ...prev,
              {
                type: outputLine.type,
                content: outputLine.text,
                final: true,
              },
            ]);
            await sleep(OUTPUT_LINE_DELAY);
          }

          // Blank line after each sequence
          if (si < SEQUENCES.length - 1) {
            setDisplayedLines((prev) => [
              ...prev,
              { type: "blank", content: "", final: true },
            ]);
            await sleep(SEQUENCE_PAUSE);
          }
        }

        await sleep(RESTART_PAUSE);
      }
    }

    runAnimation();

    return () => {
      ctx.cancelled = true;
    };
  }, [sleep]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const isTyping = displayedLines.some((l) => !l.final);

  return (
    <div
      className={`rounded-xl border border-[var(--color-terminal-border)] bg-[var(--color-terminal-bg)] shadow-2xl shadow-black/50 overflow-hidden ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-terminal-border)] bg-[#161b22]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-xs text-[var(--color-terminal-muted)] font-mono">
          agentboard
        </span>
      </div>

      {/* Terminal content */}
      <div
        ref={containerRef}
        className="p-4 sm:p-6 font-mono text-sm sm:text-base leading-relaxed min-h-[280px] max-h-[400px] overflow-y-auto"
      >
        {displayedLines.map((line, i) => {
          if (line.type === "blank") {
            return <div key={i} className="h-5" />;
          }

          if (line.type === "command") {
            return (
              <div key={i} className="flex">
                <span className="text-[var(--color-terminal-green)] select-none mr-2 shrink-0">
                  $
                </span>
                <span className="text-[var(--color-foreground)]">
                  {line.content}
                  {!line.final && (
                    <span
                      className={`inline-block w-[8px] h-[18px] ml-[1px] align-middle translate-y-[1px] bg-[var(--color-terminal-green)] ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transition: "opacity 0.1s" }}
                    />
                  )}
                </span>
              </div>
            );
          }

          // Output line
          return (
            <div key={i} className="text-[var(--color-foreground)]">
              {parseColoredText(line.content)}
            </div>
          );
        })}

        {/* Resting cursor when not typing */}
        {!isTyping && displayedLines.length > 0 && (
          <div className="flex mt-1">
            <span className="text-[var(--color-terminal-green)] select-none mr-2">
              $
            </span>
            <span
              className={`inline-block w-[8px] h-[18px] translate-y-[1px] bg-[var(--color-terminal-green)] ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transition: "opacity 0.1s" }}
            />
          </div>
        )}

        {/* Initial cursor before animation starts */}
        {displayedLines.length === 0 && (
          <div className="flex">
            <span className="text-[var(--color-terminal-green)] select-none mr-2">
              $
            </span>
            <span
              className={`inline-block w-[8px] h-[18px] translate-y-[1px] bg-[var(--color-terminal-green)] ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transition: "opacity 0.1s" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
