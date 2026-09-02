import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function LinuxTerminal({ t, lang, onClose }) {
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

  const green = "#7ee787";
  const blue = "#79c0ff";
  const muted = "rgba(255,255,255,0.7)";

  const addOutput = (command, output, path = currentPath) => {
    setHistory((prev) => [
      ...prev,
      { type: "command", path, command },
      { type: "output", content: output },
    ]);
  };

  const getCommandDescription = (command) =>
    terminal?.commands?.[command] || "";

  const executeCommand = (rawCommand) => {
    const fullCommand = rawCommand.trim();

    if (!fullCommand) return;

    const parts = fullCommand.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === "clear") {
      setHistory([]);
      setCommandHistory((prev) => [...prev, fullCommand]);
      setHistoryIndex(-1);
      return;
    }

    setCommandHistory((prev) => [...prev, fullCommand]);
    setHistoryIndex(-1);

    let output = "";

    switch (command) {
      case "help":
        output = (
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                mb: 1,
                color: "#fff",
                fontFamily: "inherit",
              }}
            >
              {terminal?.messages?.available || "Available commands:"}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "90px minmax(0, 1fr)",
                  sm: "180px minmax(0, 1fr)",
                },
                gap: "5px 15px",
                minWidth: 0,
              }}
            >
              {commands.map((cmd) => (
                <Box key={cmd} sx={{ display: "contents" }}>
                  <Typography
                    sx={{
                      color: green,
                      fontFamily: "inherit",
                    }}
                  >
                    {cmd}
                  </Typography>

                  <Typography
                    sx={{
                      color: muted,
                      fontFamily: "inherit",
                      overflowWrap: "anywhere",
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

      case "ls": {
        const files =
          currentPath === "/home/jorge"
            ? [
                "about.txt",
                "skills.txt",
                "projects",
                "contact.txt",
              ]
            : [
                "weather-app.txt",
                "ecommerce.txt",
                "ai-chess.txt",
                "quiz.txt",
                "calculator.txt",
                "chatbot.txt",
              ];

        output = files.join("    ");
        break;
      }

      case "pwd":
        output = currentPath;
        break;

      case "cd": {
        const target = args[0];

        if (!target || target === "~") {
          setCurrentPath("/home/jorge");
        } else if (
          target === ".." &&
          currentPath === "/home/jorge/projects"
        ) {
          setCurrentPath("/home/jorge");
        } else if (
          target === "projects" &&
          currentPath === "/home/jorge"
        ) {
          setCurrentPath("/home/jorge/projects");
        } else if (
          target === "home" ||
          target === "jorge" ||
          target === "/home/jorge"
        ) {
          setCurrentPath("/home/jorge");
        } else {
          output = `${
            terminal?.messages?.unknownDirectory ||
            "Directory not found:"
          } ${target}`;
        }

        break;
      }

      case "cat": {
        const fileName = args[0];

        if (!fileName) {
          output =
            terminal?.messages?.missingFile ||
            "Please specify a file.";
        } else if (fileName === "about.txt") {
          output = terminal?.messages?.aboutContent || "";
        } else if (fileName === "skills.txt") {
          output = terminal?.messages?.skillsContent || "";
        } else if (fileName === "contact.txt") {
          output = terminal?.messages?.contactContent || "";
        } else {
          output =
            terminal?.messages?.projectContent?.[fileName] ||
            `${
              terminal?.messages?.unknownFile ||
              "File not found:"
            } ${fileName}`;
        }

        break;
      }

      case "whoami":
        output = terminal?.messages?.whoami || "jorge";
        break;

      case "about":
        output = terminal?.messages?.aboutContent || "";
        break;

      case "skills":
        output = terminal?.messages?.skillsContent || "";
        break;

      case "projects":
        output = (
          <Box sx={{ minWidth: 0 }}>
            {terminal?.messages?.projectFiles?.map((file) => (
              <Typography
                key={file}
                sx={{
                  color: green,
                  fontFamily: "inherit",
                  lineHeight: 1.8,
                  overflowWrap: "anywhere",
                }}
              >
                {file}
              </Typography>
            ))}
          </Box>
        );
        break;

      case "contact":
        output = terminal?.messages?.contactContent || "";
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
                    fontFamily: "inherit",
                    lineHeight: 1.7,
                    color: muted,
                  }}
                >
                  {index + 1} {cmd}
                </Typography>
              ))
            : "";
        break;

      case "date":
        output = new Date().toLocaleString(
          lang === "es" ? "es-ES" : "en-US"
        );
        break;

      case "neofetch":
        output = (
          <Box
            sx={{
              fontFamily: "inherit",
              whiteSpace: "pre-wrap",
              lineHeight: 1.5,
              overflowWrap: "anywhere",
            }}
          >
            {`       .--.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
   /'\\_   _/\\
   \\___)=(___/

${terminal?.messages?.neofetch?.os || "OS: Portfolio Linux"}
${terminal?.messages?.neofetch?.host || "Host: Jorge's Portfolio"}
${terminal?.messages?.neofetch?.shell || "Shell: portfolio-shell"}
${terminal?.messages?.neofetch?.user || "User: jorge"}
${terminal?.messages?.neofetch?.language || "Language:"} ${
              lang === "es" ? "Español" : "English"
            }`}
          </Box>
        );
        break;

      default:
        output = `${
          terminal?.messages?.unknownCommand ||
          "Command not found:"
        } ${command}`;
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

      const matches = commands.filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );

      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  // Al abrir, empezar siempre desde arriba y desde la izquierda
  useEffect(() => {
    const terminalElement = terminalRef.current;

    if (!terminalElement) return;

    terminalElement.scrollLeft = 0;
    terminalElement.scrollTop = 0;

    setTimeout(() => {
      terminalElement.scrollLeft = 0;
      inputRef.current?.focus();
    }, 50);
  }, []);

  // Bajar automáticamente cuando aparece nuevo contenido
  useEffect(() => {
    if (!history.length) return;

    const terminalElement = terminalRef.current;

    if (!terminalElement) return;

    terminalElement.scrollTo({
      top: terminalElement.scrollHeight,
      left: 0,
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
        width: "min(100%, 1100px)",
        maxWidth: "100%",
        minWidth: 0,
        mx: "auto",
        p: { xs: 0, sm: 1 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          overflow: "hidden",
          borderRadius: { xs: 0, sm: 2 },
          border: "1px solid rgba(255,255,255,0.12)",
          background: "#0d1117",
          boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 46,
            px: 1.5,
            display: "flex",
            alignItems: "center",
            background: "#161b22",
            borderBottom:
              "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Stack direction="row" spacing={1}>
            {["#ff5f57", "#febc2e", "#28c840"].map(
              (color) => (
                <Box
                  key={color}
                  sx={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                  }}
                />
              )
            )}
          </Stack>

          <Typography
            sx={{
              flex: 1,
              minWidth: 0,
              textAlign: "center",
              color: "rgba(255,255,255,0.65)",
              fontSize: { xs: 11, sm: 13 },
              fontFamily: "monospace",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mx: 1,
            }}
          >
            jorge@portfolio —{" "}
            {terminal?.title || "terminal"}
          </Typography>

          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Cerrar terminal"
            sx={{
              color: "rgba(255,255,255,0.6)",
              flexShrink: 0,
              "&:hover": {
                color: "#fff",
                background: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Terminal */}
        <Box
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
          sx={{
            height: {
              xs: "calc(100vh - 170px)",
              sm: 560,
            },
            minHeight: 300,
            width: "100%",
            minWidth: 0,
            maxWidth: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
            p: {
              xs: 1.5,
              sm: 2.5,
            },
            color: "#e6edf3",
            fontFamily:
              '"JetBrains Mono", "Fira Code", monospace',
            fontSize: {
              xs: 12,
              sm: 14,
            },
            lineHeight: 1.55,
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            overscrollBehavior: "contain",

            "&::-webkit-scrollbar": {
              width: 7,
            },

            "&::-webkit-scrollbar-thumb": {
              background:
                "rgba(255,255,255,0.18)",
              borderRadius: 10,
            },
          }}
        >
          {/* Welcome */}
          <Box
            sx={{
              mb: 2,
              minWidth: 0,
              maxWidth: "100%",
            }}
          >
            <Typography
              sx={{
                color: green,
                fontFamily: "inherit",
              }}
            >
              $ ./welcome.sh
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "inherit",
                overflowWrap: "anywhere",
              }}
            >
              {terminal?.welcome ||
                "Welcome to my interactive terminal."}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "inherit",
                overflowWrap: "anywhere",
              }}
            >
              {terminal?.description ||
                "Explore my portfolio using commands."}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "inherit",
                overflowWrap: "anywhere",
              }}
            >
              {terminal?.help ||
                "Type 'help' to see the available commands."}
            </Typography>
          </Box>

          <Divider
            sx={{
              borderColor:
                "rgba(255,255,255,0.08)",
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
                onClick={() =>
                  executeCommand(item.command)
                }
                size="small"
                variant="outlined"
                sx={{
                  color: green,
                  borderColor:
                    "rgba(126,231,135,0.3)",
                  background:
                    "rgba(126,231,135,0.06)",
                  fontFamily: "inherit",

                  "&:hover": {
                    background:
                      "rgba(126,231,135,0.12)",
                  },
                }}
              />
            ))}
          </Stack>

          {/* History */}
          {history.map((item, index) =>
            item.type === "command" ? (
              <Box
                key={index}
                sx={{
                  mt: 1,
                  minWidth: 0,
                  maxWidth: "100%",
                  overflowWrap: "anywhere",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: green,
                    fontFamily: "inherit",
                  }}
                >
                  jorge@portfolio:
                </Typography>

                <Typography
                  component="span"
                  sx={{
                    color: blue,
                    fontFamily: "inherit",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.path}
                </Typography>

                <Typography
                  component="span"
                  sx={{
                    color: "#fff",
                    fontFamily: "inherit",
                    ml: 0.5,
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
                  minWidth: 0,
                  maxWidth: "100%",
                  whiteSpace: "pre-wrap",
                  color: muted,
                  fontFamily: "inherit",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {item.content}
              </Box>
            )
          )}

          {/* Input */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              mt: 1,
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",
            }}
          >
            <Typography
              component="span"
              sx={{
                color: green,
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              jorge@portfolio:
            </Typography>

            <Typography
              component="span"
              sx={{
                color: blue,
                fontFamily: "inherit",
                ml: 0.5,
                minWidth: 0,
                overflowWrap: "anywhere",
                wordBreak: "break-word",
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
                flexShrink: 0,
              }}
            >
              $
            </Typography>

            <Box
              component="input"
              ref={inputRef}
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
              aria-label={
                terminal?.prompt ||
                "Type a command"
              }
              sx={{
                flex: 1,
                minWidth: 0,
                width: 0,
                border: 0,
                outline: 0,
                background: "transparent",
                color: "#fff",
                fontFamily: "inherit",
                fontSize: "inherit",
                caretColor: green,
              }}
            />
          </Box>
        </Box>

        {/* Bottom */}
        <Box
          sx={{
            px: {
              xs: 1.5,
              sm: 2.5,
            },
            py: 1,
            minHeight: 40,
            borderTop:
              "1px solid rgba(255,255,255,0.08)",
            background: "#161b22",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              color:
                "rgba(255,255,255,0.4)",
              fontSize: 10,
              fontFamily: "monospace",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              minWidth: 0,
            }}
          >
            {terminal?.hints ||
              "↑ ↓ history · Tab autocomplete · Enter execute"}
          </Typography>

          <Chip
            label={
              terminal?.helpButton || "Help"
            }
            size="small"
            onClick={() =>
              executeCommand("help")
            }
            sx={{
              flexShrink: 0,
              color: green,
              fontFamily: "monospace",
              fontSize: 10,
              background:
                "rgba(126,231,135,0.08)",
              border:
                "1px solid rgba(126,231,135,0.2)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
         
