import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const FILE_SYSTEM = {
  "/home/jorge": ["about.txt", "skills.txt", "projects", "contact.txt"],
  "/home/jorge/projects": [
    "weather-app.txt",
    "ecommerce.txt",
    "ai-chess.txt",
    "quiz.txt",
    "calculator.txt",
    "chatbot.txt",
  ],
};

const FILE_CONTENT = {
  "about.txt":
    "Jorge Patricio Santamaría Cherrez\nIngeniero en Sistemas\nMáster en Ingeniería de Software y Sistemas Informáticos",

  "skills.txt":
    "Frontend: React, JavaScript, HTML, CSS, Material UI\nBackend: Node.js, Express, Python, Flask, Django\nDatabase: MySQL, PostgreSQL\nCloud: Vercel, Render\nTools: Git, GitHub, Linux",

  "contact.txt":
    "Puedes contactarme a través de mis redes profesionales o por correo electrónico.",

  "weather-app.txt": "Aplicación del Clima — React + API",
  "ecommerce.txt": "E-commerce Full Stack — React + Django + JWT Auth",
  "ai-chess.txt": "Ajedrez con IA — React + IA",
  "quiz.txt": "Quiz Educativo de Ambato y Ecuador",
  "calculator.txt": "Calculadora Científica — JavaScript + lógica matemática",
  "chatbot.txt": "Chatbot con IA — Asistente Virtual + Groq",
};

export default function LinuxTerminal({ t }) {
  const theme = useTheme();
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState("/home/jorge");

  const terminal = t?.terminal;

  const commands = useMemo(
    () => [
      "help",
      "clear",
      "ls",
      "cd",
      "pwd",
      "cat",
      "whoami",
      "about",
      "skills",
      "projects",
      "contact",
      "neofetch",
      "echo",
      "history",
      "date",
    ],
    []
  );

  const addOutput = (command, output) => {
    setHistory((prev) => [
      ...prev,
      {
        type: "command",
        path: currentPath,
        command,
      },
      {
        type: "output",
        content: output,
      },
    ]);
  };

  const getCommandDescription = (command) => {
    return terminal?.commands?.[command] || "";
  };

  const executeCommand = (rawCommand) => {
    const fullCommand = rawCommand.trim();

    if (!fullCommand) return;

    const parts = fullCommand.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === "clear") {
      setHistory([]);
      return;
    }

    setCommandHistory((prev) => [...prev, fullCommand]);
    setHistoryIndex(-1);

    let output = "";

    switch (command) {
      case "help":
        output = (
          <Box>
            <Typography sx={{ mb: 1 }}>
              {terminal?.messages?.available || "Available commands:"}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "180px 1fr",
                },
                gap: "6px 20px",
              }}
            >
              {commands.map((cmd) => (
                <Box key={cmd} sx={{ display: "contents" }}>
                  <Typography
                    component="span"
                    sx={{
                      color: "#7ee787",
                      fontFamily: "monospace",
                    }}
                  >
                    {cmd}
                  </Typography>

                  <Typography
                    component="span"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "monospace",
                    }}
                  >
                    {getCommandDescription(cmd)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );
        break;

      case "ls":
        output = FILE_SYSTEM[currentPath]?.join("    ") || "";
        break;

      case "pwd":
        output = currentPath;
        break;

      case "cd": {
        const target = args[0];

        if (!target || target === "~") {
          setCurrentPath("/home/jorge");
        } else if (target === "..") {
          if (currentPath !== "/home/jorge") {
            setCurrentPath("/home/jorge");
          }
        } else if (target === "projects" && currentPath === "/home/jorge") {
          setCurrentPath("/home/jorge/projects");
        } else if (
          target === "home" ||
          target === "jorge" ||
          target === "/home/jorge"
        ) {
          setCurrentPath("/home/jorge");
        } else {
          output = `${terminal?.messages?.unknownCommand || "Command not found:"} ${target}`;
        }
        break;
      }

      case "cat": {
        const fileName = args[0];

        if (FILE_CONTENT[fileName]) {
          output = FILE_CONTENT[fileName];
        } else {
          output = `${terminal?.messages?.unknownFile || "File not found:"} ${fileName}`;
        }
        break;
      }

      case "whoami":
        output = "jorge";
        break;

      case "about":
        output = FILE_CONTENT["about.txt"];
        break;

      case "skills":
        output = FILE_CONTENT["skills.txt"];
        break;

      case "projects":
        output = (
          <Box>
            {[
              "weather-app.txt",
              "ecommerce.txt",
              "ai-chess.txt",
              "quiz.txt",
              "calculator.txt",
              "chatbot.txt",
            ].map((file) => (
              <Typography
                key={file}
                sx={{
                  color: "#7ee787",
                  fontFamily: "monospace",
                  lineHeight: 1.8,
                }}
              >
                {file}
              </Typography>
            ))}
          </Box>
        );
        break;

      case "contact":
        output = FILE_CONTENT["contact.txt"];
        break;

      case "echo":
        output = args.join(" ");
        break;

      case "history":
        output =
          commandHistory.length > 0
            ? commandHistory.map((cmd, index) => (
                <Typography
                  key={`${cmd}-${index}`}
                  sx={{
                    fontFamily: "monospace",
                    lineHeight: 1.7,
                  }}
                >
                  {index + 1} {cmd}
                </Typography>
              ))
            : "";
        break;

      case "date":
        output = new Date().toLocaleString();
        break;

      case "neofetch":
        output = (
          <Box
            sx={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
            }}
          >
            {`       .--.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
   /'\\_   _/\\
   \\___)=(___/

OS: Portfolio Linux
Host: Jorge's Portfolio
Shell: portfolio-shell
User: jorge
Language: ${document.documentElement.lang || "es"}`}
          </Box>
        );
        break;

      default:
        output = `${terminal?.messages?.unknownCommand || "Command not found:"} ${command}`;
    }

    addOutput(fullCommand, output);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    executeCommand(input);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!commandHistory.length) return;

      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const value = input.toLowerCase();

      const matches = commands.filter((cmd) => cmd.startsWith(value));

      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const quickCommands = [
    {
      label: terminal?.quickCommands?.about || "About me",
      command: "about",
    },
    {
      label: terminal?.quickCommands?.skills || "Technologies",
      command: "skills",
    },
    {
      label: terminal?.quickCommands?.projects || "Projects",
      command: "projects",
    },
    {
      label: terminal?.quickCommands?.contact || "Contact",
      command: "contact",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: { xs: 2, md: 3 },
          border: "1px solid rgba(255,255,255,0.12)",
          background: "#0d1117",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.35), 0 0 40px rgba(46,125,50,0.08)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 44,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#161b22",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
          </Stack>

          <Typography
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.65)",
              fontSize: 13,
              fontFamily: "monospace",
              whiteSpace: "nowrap",
            }}
          >
            jorge@portfolio — terminal
          </Typography>

          <Box sx={{ width: 65 }} />
        </Box>

        {/* Terminal content */}
        <Box
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
          sx={{
            height: { xs: 430, sm: 480, md: 520 },
            overflowY: "auto",
            p: { xs: 2, sm: 3 },
            color: "#e6edf3",
            fontFamily:
              '"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, monospace',
            fontSize: { xs: 13, sm: 14 },
            lineHeight: 1.6,
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.15)",
              borderRadius: 10,
            },
          }}
        >
          {/* Welcome */}
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: "#7ee787",
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              $ ./welcome.sh
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "rgba(255,255,255,0.85)",
                fontFamily: "inherit",
              }}
            >
              {terminal?.welcome || "Welcome to my interactive terminal."}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "inherit",
              }}
            >
              {terminal?.description ||
                "Explore my portfolio using commands."}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "inherit",
              }}
            >
              {terminal?.help ||
                "Type 'help' to see the available commands."}
            </Typography>
          </Box>

          <Divider
            sx={{
              borderColor: "rgba(255,255,255,0.08)",
              mb: 2,
            }}
          />

          {/* Quick commands */}
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mb: 2 }}
          >
            {quickCommands.map((item) => (
              <Chip
                key={item.command}
                label={item.label}
                onClick={() => executeCommand(item.command)}
                size="small"
                sx={{
                  color: "#7ee787",
                  borderColor: "rgba(126,231,135,0.3)",
                  background: "rgba(126,231,135,0.06)",
                  fontFamily: "inherit",
                  "&:hover": {
                    background: "rgba(126,231,135,0.12)",
                  },
                }}
                variant="outlined"
              />
            ))}
          </Stack>

          {/* History */}
          {history.map((item, index) =>
            item.type === "command" ? (
              <Box key={index} sx={{ mt: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    color: "#7ee787",
                    fontFamily: "inherit",
                  }}
                >
                  jorge@portfolio:
                </Typography>

                <Typography
                  component="span"
                  sx={{
                    color: "#79c0ff",
                    fontFamily: "inherit",
                  }}
                >
                  {currentPath}
                </Typography>

                <Typography
                  component="span"
                  sx={{
                    color: "#fff",
                    fontFamily: "inherit",
                  }}
                >
                  $ {item.command}
                </Typography>
              </Box>
            ) : (
              <Box
                key={index}
                sx={{
                  mt: 0.5,
                  mb: 1,
                  whiteSpace: "pre-wrap",
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "inherit",
                }}
              >
                {typeof item.content === "string" ? (
                  item.content
                ) : (
                  item.content
                )}
              </Box>
            )
          )}

          {/* Input */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography
              component="span"
              sx={{
                color: "#7ee787",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              jorge@portfolio:
            </Typography>

            <Typography
              component="span"
              sx={{
                color: "#79c0ff",
                fontFamily: "inherit",
                ml: 0.5,
                whiteSpace: "nowrap",
              }}
            >
              {currentPath}
            </Typography>

            <Typography
              component="span"
              sx={{
                color: "#fff",
                fontFamily: "inherit",
                ml: 0.5,
                mr: 0.8,
              }}
            >
              $
            </Typography>

            <Box
              component="input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
              aria-label={terminal?.prompt || "Type a command"}
              sx={{
                flex: 1,
                minWidth: 0,
                border: 0,
                outline: 0,
                background: "transparent",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: "inherit",
                caretColor: "#7ee787",
              }}
            />
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: 1,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "#161b22",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 11,
              fontFamily: "monospace",
            }}
          >
            {terminal?.hints ||
              "↑ ↓ history · Tab autocomplete · Enter execute"}
          </Typography>

          <Chip
            label={terminal?.helpButton || "What can I type?"}
            size="small"
            onClick={() => executeCommand("help")}
            sx={{
              color: "#7ee787",
              fontFamily: "monospace",
              fontSize: 11,
              background: "rgba(126,231,135,0.08)",
              border: "1px solid rgba(126,231,135,0.2)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
                }
