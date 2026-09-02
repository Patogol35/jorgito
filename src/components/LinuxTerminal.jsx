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
  const mono = "monospace";

  const text = (key, fallback = "") =>
    terminal?.messages?.[key] || fallback;

  const addOutput = (command, output) => {
    setHistory((prev) => [
      ...prev,
      { type: "command", path: currentPath, command },
      { type: "output", content: output },
    ]);
  };

  const saveCommand = (command) => {
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
  };

  const executeCommand = (raw) => {
    const fullCommand = raw.trim();
    if (!fullCommand) return;

    const [command, ...args] = fullCommand.split(/\s+/);
    const cmd = command.toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      saveCommand(fullCommand);
      return;
    }

    saveCommand(fullCommand);

    let output = "";

    switch (cmd) {
      case "help":
        output = (
          <Box>
            <Typography sx={{ mb: 1, color: "#fff", fontFamily: mono }}>
              {terminal?.messages?.available || "Available commands:"}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "100px 1fr",
                  sm: "180px 1fr",
                },
                gap: "5px 15px",
              }}
            >
              {commands.map((item) => (
                <Box key={item} sx={{ display: "contents" }}>
                  <Typography sx={{ color: green, fontFamily: mono }}>
                    {item}
                  </Typography>

                  <Typography sx={{ color: muted, fontFamily: mono }}>
                    {terminal?.commands?.[item] || ""}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );
        break;

      case "ls":
        output =
          currentPath === "/home/jorge"
            ? "about.txt    skills.txt    projects    contact.txt"
            : [
                "weather-app.txt",
                "ecommerce.txt",
                "ai-chess.txt",
                "quiz.txt",
                "calculator.txt",
                "chatbot.txt",
              ].join("    ");
        break;

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
          ["home", "jorge", "/home/jorge"].includes(target)
        ) {
          setCurrentPath("/home/jorge");
        } else {
          output = `${text("unknownDirectory", "Directory not found:")} ${target}`;
        }
        break;
      }

      case "cat": {
        const file = args[0];

        if (!file) {
          output = text("missingFile", "Please specify a file.");
        } else if (
          ["about.txt", "skills.txt", "contact.txt"].includes(file)
        ) {
          const key = file.replace(".txt", "");
          output = text(`${key}Content`);
        } else {
          output =
            terminal?.messages?.projectContent?.[file] ||
            `${text("unknownFile", "File not found:")} ${file}`;
        }
        break;
      }

      case "whoami":
        output = text("whoami", "jorge");
        break;

      case "about":
        output = text("aboutContent");
        break;

      case "skills":
        output = text("skillsContent");
        break;

      case "projects":
        output = (
          <Box>
            {terminal?.messages?.projectFiles?.map((file) => (
              <Typography
                key={file}
                sx={{
                  color: green,
                  fontFamily: mono,
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
        output = text("contactContent");
        break;

      case "echo":
        output = args.join(" ");
        break;

      case "history":
        output = commandHistory.map((item, i) => (
          <Typography
            key={`${item}-${i}`}
            sx={{
              color: muted,
              fontFamily: mono,
              lineHeight: 1.7,
            }}
          >
            {i + 1} {item}
          </Typography>
        ));
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
              whiteSpace: "pre-wrap",
              fontFamily: mono,
              lineHeight: 1.5,
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
        output = `${text("unknownCommand", "Command not found:")} ${cmd}`;
    }

    addOutput(fullCommand, output);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (!commandHistory.length) return;

      const index =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(index);
      setInput(commandHistory[index]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (historyIndex === -1) return;

      const index = historyIndex + 1;

      if (index >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(index);
        setInput(commandHistory[index]);
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();

      const matches = commands.filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );

      if (matches.length === 1) setInput(matches[0]);
    }
  };

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });

    inputRef.current?.focus();
  }, [history]);

  useEffect(() => {
    if (!terminalRef.current) return;

    terminalRef.current.scrollLeft = 0;
    terminalRef.current.scrollTop = 0;
    inputRef.current?.focus();
  }, []);

  const quickCommands = [
    ["about", terminal?.quickCommands?.about || "About me"],
    ["skills", terminal?.quickCommands?.skills || "Technologies"],
    ["projects", terminal?.quickCommands?.projects || "Projects"],
    ["contact", terminal?.quickCommands?.contact || "Contact"],
  ];

  const prompt = (
    <>
      <Typography component="span" sx={{ color: green, fontFamily: mono }}>
        jorge@portfolio:
      </Typography>

      <Typography
        component="span"
        sx={{ color: blue, fontFamily: mono, ml: 0.5 }}
      >
        {currentPath}
      </Typography>

      <Typography
        component="span"
        sx={{ color: "#fff", fontFamily: mono, ml: 0.5, mr: 0.8 }}
      >
        $
      </Typography>
    </>
  );

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
          bgcolor: "#0d1117",
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
            bgcolor: "#161b22",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Stack direction="row" spacing={1}>
            {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
              <Box
                key={color}
                sx={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  bgcolor: color,
                }}
              />
            ))}
          </Stack>

          <Typography
            sx={{
              flex: 1,
              mx: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              color: "rgba(255,255,255,0.65)",
              fontSize: { xs: 13, sm: 15 },
              fontFamily: mono,
            }}
          >
            jorge@portfolio — {terminal?.title || "terminal"}
          </Typography>

          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Cerrar terminal"
            sx={{
              color: "rgba(255,255,255,0.6)",
              "&:hover": { color: "#fff" },
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
            width: "100%",
            minWidth: 0,
            maxWidth: "100%",
            height: {
              xs: "calc(100vh - 170px)",
              sm: 560,
            },
            minHeight: 300,
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
            p: { xs: 1.5, sm: 2.5 },
            color: "#e6edf3",
            fontFamily: mono,
            fontSize: { xs: 12, sm: 14 },
            lineHeight: 1.55,
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            overscrollBehavior: "contain",

            "&::-webkit-scrollbar": {
              width: 7,
              height: 7,
            },

            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255,255,255,0.18)",
              borderRadius: 10,
            },
          }}
        >
          {/* Welcome */}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: green, fontFamily: mono }}>
              $ ./welcome.sh
            </Typography>

            {[
              ["welcome", "Welcome to my interactive terminal."],
              ["description", "Explore my portfolio using commands."],
              ["help", "Type 'help' to see the available commands."],
            ].map(([key, fallback]) => (
              <Typography
                key={key}
                sx={{
                  color:
                    key === "welcome"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.6)",
                  fontFamily: mono,
                }}
              >
                {terminal?.[key] || fallback}
              </Typography>
            ))}
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
            {quickCommands.map(([command, label]) => (
              <Chip
                key={command}
                label={label}
                onClick={() => executeCommand(command)}
                size="small"
                variant="outlined"
                sx={{
                  color: green,
                  borderColor: "rgba(126,231,135,0.3)",
                  bgcolor: "rgba(126,231,135,0.06)",
                  fontFamily: mono,
                  "&:hover": {
                    bgcolor: "rgba(126,231,135,0.12)",
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
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                <Typography
                  component="span"
                  sx={{ color: green, fontFamily: mono }}
                >
                  jorge@portfolio:
                </Typography>

                <Typography
                  component="span"
                  sx={{ color: blue, fontFamily: mono }}
                >
                  {item.path}
                </Typography>

                <Typography
                  component="span"
                  sx={{
                    color: "#fff",
                    fontFamily: mono,
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
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  color: muted,
                  fontFamily: mono,
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
            {prompt}

            <Box
              component="input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
              aria-label={terminal?.prompt || "Type a command"}
              sx={{
                flex: 1,
                minWidth: 0,
                width: 0,
                border: 0,
                outline: 0,
                bgcolor: "transparent",
                color: "#fff",
                fontFamily: mono,
                fontSize: { xs: 12, sm: 14 },
                caretColor: green,
              }}
            />
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2.5 },
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            bgcolor: "#161b22",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography
            sx={{
              minWidth: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              color: "rgba(255,255,255,0.4)",
              fontSize: 10,
              fontFamily: mono,
            }}
          >
            {terminal?.hints ||
              "↑ ↓ history · Tab autocomplete · Enter execute"}
          </Typography>

          <Chip
            label={terminal?.helpButton || "Help"}
            size="small"
            onClick={() => executeCommand("help")}
            sx={{
              flexShrink: 0,
              color: green,
              bgcolor: "rgba(126,231,135,0.08)",
              fontFamily: mono,
              fontSize: 10,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
  }
