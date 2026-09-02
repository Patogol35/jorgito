import { useEffect, useRef, useState } from "react";

const FILE_SYSTEM = {
  "/home/jorge": ["about.txt", "skills.txt", "contact.txt", "projects"],
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

export default function LinuxTerminal() {
  const [lines, setLines] = useState([
    {
      type: "output",
      text: "╭─────────────────────────────────────────────╮\n│       Bienvenido a mi terminal 🚀          │\n╰─────────────────────────────────────────────╯",
    },
    {
      type: "output",
      text: "Explora mi portafolio desde la terminal.\n\nEscribe 'help' para comenzar.\n\nPrueba estos comandos:",
    },
  ]);

  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("/home/jorge");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

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
          `Comandos disponibles:

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

Atajos:
↑ ↓         Historial de comandos
Tab         Autocompletar comandos`
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
          `Mis proyectos:

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
        addOutput(FILE_SYSTEM[currentPath]?.join("    ") || "");
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
          `${cmd}: command not found.\nEscribe 'help' para ver los comandos disponibles.`
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

  const quickCommands = [
    "help",
    "about",
    "skills",
    "projects",
    "contact",
  ];

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "40px auto",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#0d1117",
        color: "#e6edf3",
        fontFamily: "monospace",
        boxShadow: "0 20px 60px rgba(0,0,0,.35)",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 14px",
          background: "#161b22",
        }}
      >
        <span style={{ color: "#ff5f56" }}>●</span>
        <span style={{ color: "#ffbd2e" }}>●</span>
        <span style={{ color: "#27c93f" }}>●</span>

        <span
          style={{
            marginLeft: "10px",
            fontSize: "13px",
            opacity: 0.7,
          }}
        >
          jorge@portfolio: {currentPath}
        </span>
      </div>

      {/* Terminal */}
      <div
        ref={terminalRef}
        style={{
          minHeight: "420px",
          maxHeight: "600px",
          overflowY: "auto",
          padding: "20px",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      >
        {lines.map((line, index) => (
          <div key={index}>
            {line.type === "command" ? (
              <div>
                <span style={{ color: "#4ade80" }}>
                  jorge@portfolio
                </span>
                <span style={{ color: "#60a5fa" }}>
                  :{line.path}
                </span>
                <span>$ </span>
                <span>{line.text}</span>
              </div>
            ) : (
              <pre
                style={{
                  margin: "5px 0 14px",
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                }}
              >
                {line.text}
              </pre>
            )}
          </div>
        ))}

        {/* Quick commands */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            margin: "15px 0",
          }}
        >
          {quickCommands.map((command) => (
            <button
              key={command}
              onClick={(event) => {
                event.stopPropagation();
                executeCommand(command);
              }}
              style={{
                border: "1px solid #30363d",
                background: "#161b22",
                color: "#58a6ff",
                borderRadius: "6px",
                padding: "6px 10px",
                fontFamily: "monospace",
                cursor: "pointer",
              }}
            >
              {command}
            </button>
          ))}
        </div>

        {/* Prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#4ade80" }}>
            jorge@portfolio
          </span>

          <span style={{ color: "#60a5fa" }}>
            :{currentPath}
          </span>

          <span>$ </span>

          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoComplete="off"
            placeholder="escribe un comando..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: "#fff",
              fontFamily: "inherit",
              fontSize: "14px",
              marginLeft: "6px",
            }}
          />
        </div>
      </div>
    </div>
  );
    }
