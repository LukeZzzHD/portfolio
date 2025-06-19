"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";

interface FileSystemNode {
  name: string;
  type: "file" | "directory";
  children?: { [key: string]: FileSystemNode };
}

const fileSystem: FileSystemNode = {
  name: "root",
  type: "directory",
  children: {
    Users: {
      name: "Users",
      type: "directory",
      children: {
        user: {
          name: "user",
          type: "directory",
          children: {
            Desktop: {
              name: "Desktop",
              type: "directory",
              children: {
                "project1.txt": { name: "project1.txt", type: "file" },
                "notes.md": { name: "notes.md", type: "file" },
              },
            },
            Documents: {
              name: "Documents",
              type: "directory",
              children: {
                work: {
                  name: "work",
                  type: "directory",
                  children: {
                    "report.pdf": { name: "report.pdf", type: "file" },
                  },
                },
                personal: {
                  name: "personal",
                  type: "directory",
                  children: {},
                },
              },
            },
            Downloads: {
              name: "Downloads",
              type: "directory",
              children: {
                "installer.dmg": { name: "installer.dmg", type: "file" },
              },
            },
          },
        },
      },
    },
    Applications: {
      name: "Applications",
      type: "directory",
      children: {
        "Safari.app": { name: "Safari.app", type: "file" },
        "Terminal.app": { name: "Terminal.app", type: "file" },
      },
    },
  },
};

interface HistoryEntry {
  command: string;
  output: string[];
  isError?: boolean;
}

export default function Terminal() {
  const [currentPath, setCurrentPath] = useState(["Users", "user"]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "",
      output: [
        "Last login: Mon Dec 16 16:49:57 on ttys000",
        'Welcome to Terminal! Type "help" to see available commands.',
        "",
      ],
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  const getCurrentNode = (): FileSystemNode | null => {
    let current = fileSystem;
    for (const segment of currentPath) {
      if (current?.children?.[segment]) {
        current = current.children[segment];
      } else {
        return null;
      }
    }
    return current;
  };

  const getPathString = (): string => {
    return `/${currentPath.join("/")}`;
  };

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    const parts = trimmedCommand.split(" ").filter((part) => part.length > 0);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    let output: string[] = [];
    let isError = false;

    switch (cmd) {
      case "ls": {
        const currentNode = getCurrentNode();
        if (currentNode?.children) {
          const items = Object.values(currentNode.children);
          if (items.length === 0) {
            output = [""];
          } else {
            const directories = items
              .filter((item) => item.type === "directory")
              .map((item) => item.name);
            const files = items
              .filter((item) => item.type === "file")
              .map((item) => item.name);
            output = [...directories, ...files];
          }
        } else {
          output = ["ls: cannot access directory"];
          isError = true;
        }
        break;
      }

      case "cd":
        if (args.length === 0) {
          setCurrentPath(["Users", "user"]);
          output = [""];
        } else {
          const target = args[0];
          if (target === "..") {
            if (currentPath.length > 0) {
              setCurrentPath(currentPath.slice(0, -1));
            }
            output = [""];
          } else if (target === "/") {
            setCurrentPath([]);
            output = [""];
          } else if (target?.startsWith("/")) {
            const newPath = target
              .split("/")
              .filter((segment) => segment.length > 0);
            let testNode = fileSystem;
            let validPath = true;

            for (const segment of newPath) {
              if (testNode?.children?.[segment]?.type === "directory") {
                testNode = testNode.children[segment];
              } else {
                validPath = false;
                break;
              }
            }

            if (validPath) {
              setCurrentPath(newPath);
              output = [""];
            } else {
              output = [`cd: no such file or directory: ${target}`];
              isError = true;
            }
          } else {
            const currentNode = getCurrentNode();
            if (
              typeof target === "string" &&
              currentNode?.children?.[target]?.type === "directory"
            ) {
              setCurrentPath([...currentPath, target]);
              output = [""];
            } else {
              output = [`cd: no such file or directory: ${target}`];
              isError = true;
            }
          }
        }
        break;

      case "pwd":
        output = [getPathString()];
        break;

      case "clear":
        setHistory([]);
        return;

      case "help":
        output = [
          "Available commands:",
          "",
          "  ls              List directory contents",
          "  cd <directory>  Change directory",
          "  pwd             Print working directory",
          "  clear           Clear terminal screen",
          "  list-projects   Show available projects",
          "  contact         Display contact information",
          "  about           Show information about this terminal",
          "  help            Show this help message",
          "",
          "Navigation:",
          "  cd ..           Go to parent directory",
          "  cd /            Go to root directory",
          "  cd ~            Go to home directory",
          "",
          "Keyboard shortcuts:",
          "  Cmd+K           Clear terminal screen",
          "  ↑/↓             Navigate command history",
        ];
        break;

      case "list-projects":
        output = [
          "Available Projects:",
          "",
          "  1. Portfolio Website - A modern React portfolio",
          "  2. E-commerce Platform - Full-stack shopping solution",
          "  3. Task Manager - Productivity application",
          "  4. Weather App - Real-time weather dashboard",
          "  5. Chat Application - Real-time messaging system",
          "",
          'Use "contact" command to discuss project details.',
        ];
        break;

      case "contact":
        output = [
          "Contact Information:",
          "",
          "  Email:    hello@example.com",
          "  Phone:    +1 (555) 123-4567",
          "  Website:  https://example.com",
          "  LinkedIn: https://linkedin.com/in/example",
          "  GitHub:   https://github.com/example",
          "",
          "Available for freelance projects and consultations.",
        ];
        break;

      case "about":
        output = [
          "macOS Terminal Simulator v1.0",
          "",
          "This is a web-based terminal emulator that mimics the",
          "behavior of the macOS Terminal application. It features:",
          "",
          "  • File system navigation (ls, cd, pwd)",
          "  • Command history with arrow key navigation",
          "  • Custom commands for project information",
          "  • Keyboard shortcuts (Cmd+K for clear)",
          "  • Realistic terminal styling and behavior",
          "",
          "Built with React and Next.js for demonstration purposes.",
        ];
        break;

      default:
        output = [`zsh: command not found: ${cmd}`];
        isError = true;
        break;
    }

    const newEntry: HistoryEntry = {
      command: trimmedCommand,
      output,
      isError,
    };

    setHistory((prev) => [...prev, newEntry]);
    setCommandHistory((prev) => [...prev, trimmedCommand]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        const command = commandHistory[newIndex];
        if (command !== undefined) {
          setInput(command);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          const command = commandHistory[newIndex];
          if (command !== undefined) {
            setInput(command);
          }
        }
      }
    } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-3">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600"
            />
            <button
              type="button"
              className="h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
            />
            <button
              type="button"
              className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600"
            />
          </div>
          <div className="font-medium text-gray-300 text-sm">Terminal</div>
          <div className="w-16" />
        </div>

        <div
          ref={terminalRef}
          className="h-96 cursor-text overflow-y-auto rounded-b-lg bg-black p-4 font-mono text-green-400 text-sm"
          onClick={handleTerminalClick}
          onKeyDown={handleTerminalClick}
        >
          {history.map((entry, index) => (
            <div key={`history-${index}-${entry.command}`} className="mb-2">
              {entry.command && (
                <div className="flex">
                  <span className="text-blue-400">user@terminal</span>
                  <span className="text-white">:</span>
                  <span className="text-purple-400">{getPathString()}</span>
                  <span className="text-white">$&nbsp;</span>
                  <span className="text-white">{entry.command}</span>
                </div>
              )}
              {entry.output.map((line, lineIndex) => (
                <div
                  key={`output-${index}-${lineIndex}-${line}`}
                  className={entry.isError ? "text-red-400" : "text-green-400"}
                >
                  {line}
                </div>
              ))}
            </div>
          ))}

          <div className="flex">
            <span className="text-blue-400">user@terminal</span>
            <span className="text-white">:</span>
            <span className="text-purple-400">{getPathString()}</span>
            <span className="text-white">$&nbsp;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent font-mono text-white outline-none"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="mt-4 text-gray-600 text-sm">
          <p>
            <strong>Available commands:</strong> list-projects, contact, about
          </p>
          <p>
            <strong>Navigation:</strong> ls, cd, pwd, clear
          </p>
          <p>
            <strong>Shortcuts:</strong> Cmd+K to clear, ↑/↓ for history
          </p>
        </div>
      </div>
    </div>
  );
}
