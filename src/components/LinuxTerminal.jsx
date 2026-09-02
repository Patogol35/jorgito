import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const FILE_SYSTEM = {
  "/home/jorge": [
    "about.txt",
    "skills.txt",
    "contact.txt",
    "projects",
  ],

  "/home/jorge/projects": [
    "ecommerce",
    "product-manager",
    "sasha-ai",
  ],
};

const FILE_CONTENT = {
  "/home/jorge/about.txt":
    "Soy Jorge, desarrollador web enfocado en crear aplicaciones modernas, funcionales y escalables.",

  "/home/jorge/skills.txt":
    "Frontend: React, JavaScript, HTML, CSS, Material UI\nBackend: Java, Spring Boot, Python, Flask, Node.js\nDatabase: MySQL\nTools: Git, GitHub, Linux",

  "/home/jorge/contact.txt":
    "Puedes encontrar mis medios de contacto en la sección Contacto de mi portafolio.",

  "/home/jorge/projects/ecommerce":
    "E-commerce desarrollado con Spring Boot, MySQL y React.",

  "/home/jorge/projects/product-manager":
    "Sistema CRUD desarrollado con React, Material UI, Python y Flask.",

  "/home/jorge/projects/sasha-ai":
    "Chatbot desarrollado con React, Node.js y Groq API.",
};

const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "neofetch",
  "clear",
];

const QUICK_COMMANDS = [
  {
    command: "about",
    label: "Sobre mí",
  },
  {
    command: "skills",
    label: "Skills",
  },
  {
    command: "projects",
    label: "Proyectos",
  },
  {
    command: "contact",
    label: "Contacto",
  },
];

export default function LinuxTerminal() {
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";

  const [lines, setLines] = useState([
    {
      type: "welcome",
    },
  ]);

  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("/home/jorge");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const addOutput = (text) => {
    setLines((prev) => [
      ...prev,
      {
        type: "output",
        text,
      },
    ]);
  };

  const executeCommand = (rawCommand) => {
    const command = rawCommand.trim();

    if (!command) return;

    setLines((prev) => [
      ...prev,
      {
        type: "command",
        text: command,
        path: currentPath,
      },
    ]);

    setHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    const [cmd, ...args] = command.split(/\s+/);
    const argument = args.join(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        addOutput(
          `COMANDOS DISPONIBLES

  help        Mostrar esta ayuda
  about       Sobre mí
  skills      Mis habilidades
  projects    Ver mis proyectos
  contact     Información de contacto
  neofetch    Información del sistema
  ls          Listar archivos
  cd          Cambiar de directorio
  pwd         Mostrar ubicación actual
  cat         Leer archivos
  clear       Limpiar terminal

ATAJOS

  ↑ ↓         Historial de comandos
  Tab         Autocompletar`
        );
        break;

      case "about":
        addOutput(FILE_CONTENT["/home/jorge/about.txt"]);
        break;

      case "skills":
        addOutput(FILE_CONTENT["/home/jorge/skills.txt"]);
        break;

      case "projects":
        addOutput(
          `MIS PROYECTOS

  📦 E-commerce
     Spring Boot • MySQL • React

  📊 Product Manager
     React • Material UI • Flask

  🤖 Sasha AI
     React • Node.js • Groq API`
        );
        break;

      case "contact":
        addOutput(FILE_CONTENT["/home/jorge/contact.txt"]);
        break;

      case "pwd":
        addOutput(currentPath);
        break;

      case "ls":
        addOutput(
          FILE_SYSTEM[currentPath]?.join("    ") || ""
        );
        break;

      case "cd": {
        if (!argument || argument === "~") {
          setCurrentPath("/home/jorge");
          break;
        }

        if (argument === "..") {
          if (currentPath !== "/home/jorge") {
            setCurrentPath("/home/jorge");
          }

          break;
        }

        const newPath = `${currentPath}/${argument}`;

        if (FILE_SYSTEM[newPath]) {
          setCurrentPath(newPath);
        } else {
          addOutput(
            `cd: ${argument}: No such file or directory`
          );
        }

        break;
      }

      case "cat": {
        const filePath = `${currentPath}/${argument}`;

        if (FILE_CONTENT[filePath]) {
          addOutput(FILE_CONTENT[filePath]);
        } else {
          addOutput(
            `cat: ${argument}: No such file or directory`
          );
        }

        break;
      }

      case "clear":
        setLines([]);
        break;

      case "neofetch":
        addOutput(
          `        .-/+oossssoo+/-.       jorge@portfolio
    \`:+ssssssssssssssssss+:\`     ----------------
  -+ssssssssssssssssssyyssss+-   OS: Jorge Linux
 .ossssssssssssssssssdMMMNysssso. Shell: Portfolio
 /ssssssssssshdmmNNmmyNMMMMhssss/  Tech: React
+ssssssssshmydMMMMMMMNddddyssss+   Backend: Java
ossysssssyNMMMyssssssssssssssssso  Database: MySQL
ossysssssyNMMMyssssssssssssssssso  Status: Online
+ssssssssshmydMMMMMMMNddddyssss+
 /ssssssssssshdmmNNmmyNMMMMhssss/
 .ossssssssssssssssssdMMMNysssso.
  -+ssssssssssssssssssyyssss+-
    \`:+ssssssssssssssssss+:\`
        .-/+oossssoo+/-.`
        );
        break;

      default:
        addOutput(
          `${cmd}: command not found.\nEscribe "help" para ver los comandos disponibles.`
        );
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      executeCommand(input);
      setInput("");
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!history.length) return;

      const newIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;

      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }

      setHistoryIndex(newIndex);
      setInput(history[newIndex]);
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const matches = COMMANDS.filter((command) =>
        command.startsWith(input.toLowerCase())
      );

      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
      }}
    >
      

      {/* Terminal */}
      <Box
        sx={{
          borderRadius: "16px",
          overflow: "hidden",

          border: `1px solid ${
            isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.12)"
          }`,

          background: isDark
            ? "linear-gradient(145deg, #0d1117, #090c10)"
            : "#101418",

          boxShadow: isDark
            ? "0 25px 70px rgba(0,0,0,.45)"
            : "0 20px 50px rgba(0,0,0,.25)",

          position: "relative",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",

            background:
              "radial-gradient(circle at 50% -20%, rgba(46,125,255,.14), transparent 45%)",
          },
        }}
      >
        {/* Barra superior */}
        <Box
          sx={{
            position: "relative",
            height: 52,
            display: "flex",
            alignItems: "center",
            px: 2,

            background: isDark
              ? "rgba(255,255,255,.025)"
              : "#171c21",

            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#ff5f57",
              }}
            />

            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#febc2e",
              }}
            />

            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "#28c840",
              }}
            />
          </Stack>

          <Typography
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,.55)",
              fontFamily: "monospace",
              fontSize: 12,
            }}
          >
            jorge@portfolio — terminal
          </Typography>
        </Box>

        {/* Contenido */}
        <Box
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
          sx={{
            position: "relative",

            height: {
              xs: 450,
              sm: 500,
            },

            overflowY: "auto",

            p: {
              xs: 2,
              sm: 3,
            },

            fontFamily:
              '"JetBrains Mono", "Fira Code", monospace',

            fontSize: {
              xs: 12,
              sm: 14,
            },

            color: "#e6edf3",

            "&::-webkit-scrollbar": {
              width: 7,
            },

            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,.15)",
              borderRadius: 10,
            },
          }}
        >
          {lines.map((line, index) => {
            if (line.type === "welcome") {
              return (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      color: "#4ade80",
                      fontFamily: "inherit",
                      fontWeight: 700,
                      fontSize: {
                        xs: 16,
                        sm: 20,
                      },
                    }}
                  >
                    $ ./welcome.sh
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#fff",
                      fontFamily: "inherit",
                      fontSize: {
                        xs: 13,
                        sm: 15,
                      },
                    }}
                  >
                    Bienvenido a mi terminal 🚀
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      color: "rgba(255,255,255,.55)",
                      fontFamily: "inherit",
                    }}
                  >
                    Escribe{" "}
                    <Box
                      component="span"
                      sx={{ color: "#58a6ff" }}
                    >
                      help
                    </Box>{" "}
                    para comenzar.
                  </Typography>

                  <Divider
                    sx={{
                      my: 2,
                      borderColor: "rgba(255,255,255,.08)",
                    }}
                  />

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,.45)",
                      fontFamily: "inherit",
                      fontSize: 12,
                      mb: 1,
                    }}
                  >
                    COMANDOS RÁPIDOS
                  </Typography>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={1}
                  >
                    {QUICK_COMMANDS.map((item) => (
                      <Chip
                        key={item.command}
                        label={item.label}
                        clickable
                        onClick={(event) => {
                          event.stopPropagation();
                          executeCommand(item.command);
                        }}
                        sx={{
                          fontFamily: "inherit",
                          fontSize: 12,

                          color: "#58a6ff",

                          background:
                            "rgba(88,166,255,.08)",

                          border:
                            "1px solid rgba(88,166,255,.20)",

                          "&:hover": {
                            background:
                              "rgba(88,166,255,.16)",
                            borderColor:
                              "rgba(88,166,255,.4)",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              );
            }

            if (line.type === "command") {
              return (
                <Box
                  key={index}
                  sx={{
                    mb: 1,
                    wordBreak: "break-word",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ color: "#4ade80" }}
                  >
                    jorge@portfolio
                  </Box>

                  <Box
                    component="span"
                    sx={{ color: "#58a6ff" }}
                  >
                    :{line.path}
                  </Box>

                  <Box component="span" sx={{ color: "#fff" }}>
                    {" $ "}
                    {line.text}
                  </Box>
                </Box>
              );
            }

            return (
              <Box
                key={index}
                component="pre"
                sx={{
                  m: 0,
                  mb: 2,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",

                  fontFamily: "inherit",
                  color: "rgba(255,255,255,.75)",
                  lineHeight: 1.7,
                }}
              >
                {line.text}
              </Box>
            );
          })}

          {/* Prompt */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#4ade80",
                flexShrink: 0,
              }}
            >
              jorge@portfolio
            </Box>

            <Box
              component="span"
              sx={{
                color: "#58a6ff",
                flexShrink: 0,
              }}
            >
              :{currentPath}
            </Box>

            <Box
              component="span"
              sx={{
                color: "#fff",
                ml: 0.5,
              }}
            >
              $
            </Box>

            <Box
              component="input"
              ref={inputRef}
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              placeholder=" escribe un comando..."
              sx={{
                minWidth: 0,
                flex: 1,

                ml: 0.5,

                border: "none",
                outline: "none",

                background: "transparent",

                color: "#fff",

                fontFamily: "inherit",
                fontSize: "inherit",

                "&::placeholder": {
                  color: "rgba(255,255,255,.25)",
                },
              }}
            />

            <Box
              component="span"
              sx={{
                width: 7,
                height: 18,
                ml: 0.5,

                background: "#4ade80",

                animation:
                  "blink 1s step-end infinite",

                "@keyframes blink": {
                  "50%": {
                    opacity: 0,
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Ayuda inferior */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1}
        sx={{
          mt: 1.5,
          px: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{ opacity: 0.55 }}
        >
          ↑ ↓ historial · Tab autocompletar · Enter ejecutar
        </Typography>

        <Button
          size="small"
          onClick={() => executeCommand("help")}
          sx={{
            textTransform: "none",
            fontFamily: "monospace",
            minWidth: "auto",
          }}
        >
          ¿Qué puedo escribir?
        </Button>
      </Stack>
    </Box>
  );
    }
