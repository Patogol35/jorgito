import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
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

  const addOutput = (command, output, path = currentPath) => {
    setHistory((prev) => [
      ...prev,
      {
        type: "command",
        path,
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
          <Box>
            <Typography
              sx={{
                mb: 1,
                color: "rgba(255,255,255,0.9)",
                fontFamily: "inherit",
              }}
            >
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
                      fontFamily: "inherit",
                    }}
                  >
                    {cmd}
                  </Typography>

                  <Typography
                    component="span"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "inherit",
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
            ? ["about.txt", "skills.txt", "projects", "contact.txt"]
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
          output = "";
        } else if (target === "..") {
          if (currentPath === "/home/jorge/projects") {
            setCurrentPath("/home/jorge");
          }
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
          break;
        }

        if (fileName === "about.txt") {
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
          <Box>
            {terminal?.messages?.projectFiles?.map((file) => (
              <Typography
                key={file}
                sx={{
                  color: "#7ee787",
                  fontFamily: "inherit",
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
                    color: "rgba(255,255,255,0.8)",
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

      const value = input.toLowerCase();

      const matches = commands.filter((cmd) =>
        cmd.startsWith(value)
      );

      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  // Al abrir: empezar siempre desde arriba y completamente a la izquierda
  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  // Después de ejecutar un comando, bajar automáticamente
  useEffect(() => {
    if (!history.length) return;

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
        width: "calc(100vw - 20px)",
        maxWidth: 1100,
        minWidth: 0,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          overflow: "hidden",
          borderRadius: { xs: 2, md: 3 },
          border: "1px solid rgba(255,255,255,0.12)",
          background: "#0d1117",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.35), 0 0 40px rgba(46,125,50,0.08)",
          display: "flex",
          flexDirection: "column",
          height: {
            xs: "calc(100dvh - 20px)",
            sm: 620,
            md: 680,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 44,
            minHeight: 44,
            px: { xs: 1.5, sm: 2 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            background: "#161b22",
            borderBottom:
              "1px solid rgba(255,255,255,0.08)",
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
              fontSize: { xs: 11, sm: 13 },
              fontFamily: "monospace",
              whiteSpace: "nowrap",
              maxWidth: "55%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            jorge@portfolio — {terminal?.title || "terminal"}
          </Typography>

          <IconButton
            onClick={onClose}
            aria-label="Cerrar terminal"
            size="small"
            sx={{
              color: "rgba(255,255,255,0.65)",
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
            flex: 1,
            minHeight: 0,
            width: "100%",
            minWidth: 0,
            overflowY: "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            overscrollBehavior: "contain",
            boxSizing: "border-box",
            p: {
              xs: 1.5,
              sm: 3,
            },
            color: "#e6edf3",
            fontFamily:
              '"JetBrains Mono", "Fira Code", "SFMono-Regular", Consolas, monospace',
            fontSize: {
              xs: 12,
              sm: 14,
            },
            lineHeight: 1.6,

            "&::-webkit-scrollbar": {
              width: 7,
            },

            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.15)",
              borderRadius: 10,
            },
          }}
        >
          {/* Welcome */}
          <Box
            sx={{
              mb: 2,
              minWidth: 0,
              overflowWrap: "anywhere",
            }}
          >
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
              {terminal?.welcome ||
                "Welcome to my interactive terminal."}
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
                onClick={() =>
                  executeCommand(item.command)
                }
                size="small"
                variant="outlined"
                sx={{
                  color: "#7ee787",
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

          {/* Command history */}
          {history.map((item, index) =>
            item.type === "command" ? (
              <Box
                key={index}
                sx={{
                  mt: 1,
                  minWidth: 0,
                  overflowWrap: "anywhere",
                }}
              >
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
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "inherit",
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
            }}
          >
            <Typography
              component="span"
              sx={{
                color: "#7ee787",
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
                color: "#79c0ff",
                fontFamily: "inherit",
                ml: 0.5,
                whiteSpace: "normal",
                overflowWrap: "anywhere",
                minWidth: 0,
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
                caretColor: "#7ee787",
              }}
            />
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            px: {
              xs: 1.5,
              sm: 3,
            },
            py: 1,
            minHeight: 40,
            bor
