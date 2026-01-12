"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import { useKonamiCode } from "@/hooks/useKonamiCode";

interface TerminalLine {
  type: "input" | "output" | "error" | "ascii";
  content: string;
}

const ASCII_ART = {
  welcome: `
██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗ █████╗ ██╗
██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██║
███████║███████║██████╔╝███████╗███████║███████║██║
██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║██╔══██║██║
██║  ██║██║  ██║██║  ██║███████║██║  ██║██║  ██║███████╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
`,
  secret: `
    ╔═══════════════════════════════════════╗
    ║  🎉 YOU FOUND THE SECRET! 🎉          ║
    ║                                       ║
    ║  Fun fact: I built this terminal      ║
    ║  as an easter egg for curious devs    ║
    ║  like you!                            ║
    ║                                       ║
    ║  Try: matrix, hire, sudo, hack        ║
    ╚═══════════════════════════════════════╝
`,
  hire: `
    ╔════════════════════════════════════════╗
    ║                                        ║
    ║   💼 LOOKING TO HIRE?                  ║
    ║                                        ║
    ║   Email: harshalvankudre@gmail.com     ║
    ║                                        ║
    ║   I'm open to exciting opportunities   ║
    ║   in AI/ML and Full-Stack Development! ║
    ║                                        ║
    ╚════════════════════════════════════════╝
`,
  coffee: `
        ( (
         ) )
      .______.
      |      |]
      \\      /
       '----'
    
    ☕ Coffee break! Harshal runs on coffee.
`,
  hack: `
    ╔════════════════════════════════════════╗
    ║  🔓 INITIATING HACK SEQUENCE...        ║
    ╠════════════════════════════════════════╣
    ║  [██████████████████████████] 100%     ║
    ║                                        ║
    ║  ACCESS GRANTED!                       ║
    ║                                        ║
    ║  Just kidding 😄                       ║
    ║  But you're clearly a curious one!     ║
    ║  That's exactly who I love working     ║
    ║  with. Let's connect!                  ║
    ╚════════════════════════════════════════╝
`,
};

const SECTIONS = ["hero", "about", "skills", "experience", "projects", "github", "education", "contact"];

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixActive, setMatrixActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { isActivated, setIsActivated } = useKonamiCode(() => {
    if (!isOpen) {
      setIsOpen(true);
      addLine("ascii", ASCII_ART.welcome);
      addLine("output", 'Welcome! Type "help" for available commands.');
    }
  });

  useEffect(() => {
    if (isActivated && !isOpen) {
      setIsOpen(true);
      addLine("ascii", ASCII_ART.welcome);
      addLine("output", 'Welcome! Type "help" for available commands.');
    }
  }, [isActivated, isOpen]);

  const addLine = useCallback((type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { type, content }]);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(" ");
    const command = args[0];

    addLine("input", `> ${cmd}`);

    if (trimmedCmd) {
      setCommandHistory((prev) => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
    }

    switch (command) {
      case "help":
        addLine(
          "output",
          `
┌──────────────────────────────────────────────┐
│ AVAILABLE COMMANDS                           │
├──────────────────────────────────────────────┤
│ NAVIGATION                                   │
│   ls            → List all sections          │
│   cd <section>  → Navigate to section        │
│   open <link>   → Open github/linkedin/email │
├──────────────────────────────────────────────┤
│ INFO                                         │
│   about         → Who is Harshal?            │
│   skills        → List technical skills      │
│   projects      → Show featured projects     │
│   experience    → Work history               │
│   contact       → Get contact info           │
│   resume        → Download resume            │
├──────────────────────────────────────────────┤
│ FUN STUFF                                    │
│   hire          → Want to work with me?      │
│   coffee        → Coffee break ☕            │
│   hack          → Try to hack the system     │
│   matrix        → Enter the matrix           │
│   fortune       → Get a random fortune       │
│   weather       → Check the weather          │
│   secret        → ???                        │
│   sudo <cmd>    → Try it ;)                  │
├──────────────────────────────────────────────┤
│ SYSTEM                                       │
│   whoami        → Current user               │
│   pwd           → Current directory          │
│   date          → Current date/time          │
│   echo <text>   → Print text                 │
│   history       → Command history            │
│   clear         → Clear terminal             │
│   exit          → Close terminal             │
└──────────────────────────────────────────────┘
        `
        );
        break;

      case "about":
        addLine(
          "output",
          `
╔═══════════════════════════════════════════╗
║ HARSHAL VANKUDRE                          ║
╠═══════════════════════════════════════════╣
║ 🎓 Business Informatics Student           ║
║ 💼 AI Developer at RÜKO GmbH              ║
║ 📍 Karlsruhe, Germany                     ║
║                                           ║
║ Passionate about AI, Full-Stack Dev,      ║
║ and building innovative solutions.        ║
╚═══════════════════════════════════════════╝
        `
        );
        break;

      case "skills":
        addLine(
          "output",
          `
┌─────────────────────────────────────────┐
│ TECHNICAL SKILLS                        │
├─────────────────────────────────────────┤
│ Languages:  Python, TypeScript, Java    │
│ Frontend:   React, Next.js, Tailwind    │
│ Backend:    FastAPI, Node.js, Prisma    │
│ AI/ML:      OpenAI, LangChain, RAG      │
│ Cloud:      AWS, GCP, Azure, Docker     │
│ Databases:  PostgreSQL, MongoDB         │
└─────────────────────────────────────────┘
        `
        );
        break;

      case "projects":
        addLine(
          "output",
          `
┌─────────────────────────────────────────┐
│ FEATURED PROJECTS                       │
├─────────────────────────────────────────┤
│ 🤖 Baumaschinen KI-Chatbot              │
│    RAG-based AI assistant               │
│                                         │
│ 🔗 Teams-BOT                            │
│    Multi-agent AI for Microsoft Teams   │
│                                         │
│ 📚 CourseViewer                         │
│    Interactive course platform          │
└─────────────────────────────────────────┘

Type "cd projects" to view on page.
        `
        );
        break;

      case "contact":
        addLine(
          "output",
          `
┌─────────────────────────────────────────┐
│ CONTACT INFO                            │
├─────────────────────────────────────────┤
│ 📧 harshalvankudre@gmail.com            │
│ 💼 linkedin.com/in/harshalvankudre      │
│ 🐙 github.com/HarshalVankudre           │
└─────────────────────────────────────────┘
        `
        );
        break;

      case "hire":
        addLine("ascii", ASCII_ART.hire);
        break;

      case "secret":
        addLine("ascii", ASCII_ART.secret);
        break;

      case "matrix":
        addLine("output", "Entering the Matrix...");
        setMatrixActive(true);
        setTimeout(() => {
          setMatrixActive(false);
          addLine("output", "You've seen enough. Back to reality.");
        }, 5000);
        break;

      case "sudo":
        if (args.length > 1) {
          addLine("output", `[sudo] password for visitor: ********`);
          setTimeout(() => {
            addLine("error", "Sorry, user visitor is not in the sudoers file. This incident will be reported. 😏");
          }, 500);
        } else {
          addLine("error", "usage: sudo <command>");
        }
        break;

      case "coffee":
        addLine("ascii", ASCII_ART.coffee);
        break;

      case "hack":
        addLine("output", "Initiating hack sequence...");
        setTimeout(() => addLine("output", "[█         ] 10%"), 300);
        setTimeout(() => addLine("output", "[███       ] 30%"), 600);
        setTimeout(() => addLine("output", "[█████     ] 50%"), 900);
        setTimeout(() => addLine("output", "[███████   ] 70%"), 1200);
        setTimeout(() => addLine("output", "[█████████ ] 90%"), 1500);
        setTimeout(() => addLine("ascii", ASCII_ART.hack), 1800);
        break;

      case "fortune":
        const fortunes = [
          "🔮 A great opportunity is coming your way... maybe check your inbox?",
          "🎯 Focus on what matters. Coffee helps.",
          "💡 The best time to start was yesterday. The next best time is now.",
          "🚀 Your code will compile on the first try today!",
          "🌟 Someone is impressed by your portfolio right now.",
          "☕ A coffee break would improve your debugging skills.",
          "🎨 Creativity is intelligence having fun. - Einstein",
          "💻 There are only 10 types of people: those who understand binary and those who don't.",
          "🐛 Today's bug is tomorrow's feature.",
          "⌨️ Keep calm and git commit.",
        ];
        addLine("output", fortunes[Math.floor(Math.random() * fortunes.length)]);
        break;

      case "weather":
        addLine("output", `
┌─────────────────────────────────────┐
│ 📍 Karlsruhe, Germany               │
├─────────────────────────────────────┤
│    \\  /       Partly Cloudy         │
│  _ /\"\".-.     🌡️  Perfect coding    │
│    \\_(   ).      weather!           │
│    /(___(__) ☕ Coffee recommended   │
└─────────────────────────────────────┘
        `);
        break;

      case "experience":
        addLine(
          "output",
          `
┌─────────────────────────────────────────────┐
│ WORK EXPERIENCE                             │
├─────────────────────────────────────────────┤
│ 🏢 RÜKO GmbH                                │
│    AI Developer (Working Student)           │
│    Oct 2024 - Present                       │
│    • Building RAG-based AI chatbots         │
│    • Developing multi-agent systems         │
│                                             │
│ 🏢 IU International University              │
│    AI Teaching Assistant                    │
│    Mar 2025 - Present                       │
│    • ML workshops & student mentoring       │
└─────────────────────────────────────────────┘

Type "cd experience" to see more on page.
        `
        );
        break;

      case "resume":
        addLine("output", "📄 Opening resume...");
        window.open("/resume.pdf", "_blank");
        addLine("output", "Resume opened in new tab! (or check your downloads)");
        break;

      case "open":
        const link = args[1]?.toLowerCase();
        if (!link) {
          addLine("error", "Usage: open <github|linkedin|email>");
          addLine("output", "Available: github, linkedin, email");
        } else if (link === "github") {
          window.open("https://github.com/HarshalVankudre", "_blank");
          addLine("output", "🐙 Opening GitHub profile...");
        } else if (link === "linkedin") {
          window.open("https://linkedin.com/in/harshalvankudre", "_blank");
          addLine("output", "💼 Opening LinkedIn profile...");
        } else if (link === "email") {
          window.open("mailto:harshalvankudre@gmail.com", "_blank");
          addLine("output", "📧 Opening email client...");
        } else {
          addLine("error", `Unknown link: ${link}`);
          addLine("output", "Available: github, linkedin, email");
        }
        break;

      case "history":
        if (commandHistory.length === 0) {
          addLine("output", "No commands in history yet.");
        } else {
          addLine("output", commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join("\n"));
        }
        break;

      case "neofetch":
        addLine(
          "output",
          `
        .---.        visitor@harshal-portfolio
       /     \\       ─────────────────────────
       \\.@-@./       OS: Portfolio v2.0
       /\`\\_/\`\\       Host: Vercel
      //  _  \\\\      Kernel: Next.js 16
     | \\     )|_     Uptime: Since 2024
    /\`\\_\`>  <_/ \\    Shell: harshal-terminal
    \\__/'---'\\__/    Resolution: Responsive
                     Theme: Neo-Brutalism
                     Terminal: Custom
                     CPU: Brain @ 3.4GHz ☕
        `
        );
        break;

      case "ls":
        addLine(
          "output",
          `
drwxr-xr-x  hero/
drwxr-xr-x  about/
drwxr-xr-x  skills/
drwxr-xr-x  experience/
drwxr-xr-x  projects/
drwxr-xr-x  github/
drwxr-xr-x  education/
drwxr-xr-x  contact/
        `
        );
        break;

      case "cd":
        const section = args[1];
        if (!section) {
          addLine("error", "Usage: cd <section>");
        } else if (SECTIONS.includes(section)) {
          const scrolled = scrollToSection(section);
          if (scrolled) {
            addLine("output", `Navigating to ${section}...`);
          } else {
            addLine("error", `Section "${section}" not found on page.`);
          }
        } else {
          addLine("error", `Unknown section: ${section}`);
          addLine("output", `Available: ${SECTIONS.join(", ")}`);
        }
        break;

      case "clear":
        setLines([]);
        break;

      case "exit":
      case "quit":
      case "q":
        setIsOpen(false);
        setIsActivated(false);
        setLines([]);
        break;

      case "whoami":
        addLine("output", "visitor@harshal-portfolio");
        break;

      case "pwd":
        addLine("output", "/home/visitor/harshal-portfolio");
        break;

      case "date":
        addLine("output", new Date().toString());
        break;

      case "echo":
        addLine("output", args.slice(1).join(" ") || "");
        break;

      case "":
        break;

      default:
        addLine("error", `Command not found: ${command}`);
        addLine("output", 'Type "help" for available commands.');
    }

    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion for commands
      const commands = [
        "help",
        "about",
        "skills",
        "projects",
        "contact",
        "experience",
        "resume",
        "hire",
        "coffee",
        "hack",
        "fortune",
        "weather",
        "secret",
        "matrix",
        "sudo",
        "open",
        "ls",
        "cd",
        "whoami",
        "pwd",
        "date",
        "echo",
        "history",
        "neofetch",
        "clear",
        "exit",
      ];
      const matches = commands.filter((cmd) =>
        cmd.startsWith(currentInput.toLowerCase())
      );
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    }
  };

  const closeTerminal = () => {
    setIsOpen(false);
    setIsActivated(false);
    setLines([]);
    setMatrixActive(false);
  };

  return (
    <>
      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black overflow-hidden pointer-events-none"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="absolute text-green-500 font-mono text-sm"
                style={{ left: `${Math.random() * 100}%` }}
              >
                {Array.from({ length: 20 })
                  .map(() => String.fromCharCode(0x30a0 + Math.random() * 96))
                  .join("\n")}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: isMinimized ? "calc(100% - 48px)" : 0,
              opacity: 1,
            }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-4xl px-4 pb-4"
          >
            <div className="bg-[#FFFEF5] border-4 border-black neo-shadow-lg rounded-none overflow-hidden">
              {/* Title Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-primary border-b-4 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-black" />
                  <span className="font-black text-sm uppercase tracking-wide">
                    HARSHAL.TERMINAL
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-black/10 transition-colors"
                    aria-label={isMinimized ? "Expand" : "Minimize"}
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-black/10 transition-colors"
                    aria-label="Maximize"
                  >
                    <Square size={14} strokeWidth={3} />
                  </button>
                  <button
                    onClick={closeTerminal}
                    className="p-1 hover:bg-red-500 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Terminal Content */}
              {!isMinimized && (
                <div
                  ref={terminalRef}
                  onClick={() => inputRef.current?.focus()}
                  className="h-80 sm:h-96 overflow-y-auto p-4 font-mono text-sm cursor-text"
                >
                  {lines.map((line, index) => (
                    <div
                      key={index}
                      className={`whitespace-pre-wrap mb-1 ${
                        line.type === "input"
                          ? "text-primary font-bold"
                          : line.type === "error"
                          ? "text-red-500"
                          : line.type === "ascii"
                          ? "text-accent-cyan text-xs sm:text-sm"
                          : "text-gray-700"
                      }`}
                    >
                      {line.content}
                    </div>
                  ))}

                  {/* Input Line */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-accent-purple font-bold">
                      harshal@portfolio:~$
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none font-mono caret-primary"
                      autoFocus
                      spellCheck={false}
                      autoComplete="off"
                      aria-label="Terminal input"
                    />
                    <span className="w-2 h-5 bg-primary animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
