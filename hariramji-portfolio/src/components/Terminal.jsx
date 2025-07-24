import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, X, Minus, Square, ExternalLink } from 'lucide-react';

const TerminalPortfolio = ({ className = "" }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Helper function to detect and create clickable links
  const createClickableText = (text) => {
    // Patterns for different types of links
    const patterns = [
      { regex: /(https?:\/\/[^\s]+)/gi, type: 'url' },
      { regex: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi, type: 'email' },
      { regex: /(github\.com\/[^\s]+)/gi, type: 'github' },
      { regex: /(linkedin\.com\/in\/[^\s]+)/gi, type: 'linkedin' },
      { regex: /([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi, type: 'domain' }
    ];

    let result = text;
    let links = [];

    patterns.forEach(pattern => {
      result = result.replace(pattern.regex, (match) => {
        const linkId = `link_${Math.random().toString(36).substr(2, 9)}`;
        let href = match;
        
        // Add protocol if missing
        if (pattern.type === 'github' && !match.startsWith('http')) {
          href = `https://${match}`;
        } else if (pattern.type === 'linkedin' && !match.startsWith('http')) {
          href = `https://${match}`;
        } else if (pattern.type === 'domain' && !match.startsWith('http')) {
          href = `https://${match}`;
        } else if (pattern.type === 'email' && !match.startsWith('mailto:')) {
          href = `mailto:${match}`;
        }

        links.push({ id: linkId, href, text: match, type: pattern.type });
        return `__LINK_${linkId}__`;
      });
    });

    return { text: result, links };
  };

  // Component to render text with clickable links
  const TextWithLinks = ({ children, className = "" }) => {
    const { text, links } = createClickableText(children);
    
    if (links.length === 0) {
      return <span className={className}>{children}</span>;
    }

    let parts = [text];
    
    links.forEach(link => {
      const newParts = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const splitParts = part.split(`__LINK_${link.id}__`);
          for (let i = 0; i < splitParts.length; i++) {
            if (splitParts[i]) newParts.push(splitParts[i]);
            if (i < splitParts.length - 1) {
              newParts.push(
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline decoration-dotted hover:decoration-solid transition-all duration-200 inline-flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.text}
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              );
            }
          }
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return <span className={className}>{parts}</span>;
  };

  // Professional commands with clickable links
  const commands = {
    help: {
      output: [
        '╭──────────────────────────────────────╮',
        '│          AVAILABLE COMMANDS          │',
        '╰──────────────────────────────────────╯',
        '',
        '  help      → Show available commands',
        '  about     → About me & background',
        '  skills    → Technical expertise',
        '  projects  → Portfolio showcase',
        '  contact   → Get in touch',
        '  clear     → Clear terminal',
        '',
        '💡 Pro tip: Use Ctrl+C to interrupt commands'
      ],
      color: 'text-blue-300'
    },

    about: {
      output: [
        '╭──────────────────────────────────────╮',
        '│            HARIRAMJI H               │',
        '│        Software Developer            │',
        '╰──────────────────────────────────────╯',
        '',
        '🎓 Computer Science Engineering Student',
        '🏢 Sri Krishna College of Engineering & Technology',
        '📍 Based in Coimbatore, Tamil Nadu, India',
        '',
        '💼 Experience:',
        '   • Software Engineer Intern at DoersTech Solutions',
        '   • Freelance Full-Stack Developer (15+ projects)',
        '   • Open Source Contributor (50+ contributions)',
        '',
        '🎯 Passionate about building scalable web applications',
        '⚡ Always learning cutting-edge technologies',
        '🚀 Ready to tackle challenging problems'
      ],
      color: 'text-emerald-300'
    },

    skills: {
      output: [
        '╭──────────────────────────────────────╮',
        '│           TECH STACK                 │',
        '╰──────────────────────────────────────╯',
        '',
        '🎨 Frontend Development:',
        '   ├─ React.js • Next.js • Vue.js',
        '   ├─ JavaScript (ES6+) • TypeScript',
        '   ├─ Tailwind CSS • Material-UI',
        '   └─ Framer Motion • Three.js',
        '',
        '⚙️ Backend Development:',
        '   ├─ Node.js • Express.js',
        '   ├─ Python • TensorFlow',
        '   ├─ REST APIs • GraphQL',
        '   └─ JWT Authentication',
        '',
        '🗄️ Database & Cloud:',
        '   ├─ MongoDB • Firebase • MySQL',
        '   ├─ AWS (EC2, S3) • Docker',
        '   └─ Git • CI/CD Pipelines',
        '',
        '🛠️ Tools & Workflow:',
        '   ├─ VS Code • WebStorm',
        '   ├─ Figma • Adobe XD',
        '   └─ Jira • Agile Methodology'
      ],
      color: 'text-purple-300'
    },

    projects: {
      output: [
        '╭──────────────────────────────────────╮',
        '│        FEATURED PROJECTS             │',
        '╰──────────────────────────────────────╯',
        '',
        '🛍️ E-Commerce Platform',
        '   ├─ Full-stack MERN application',
        '   ├─ Payment gateway integration',
        '   ├─ Admin dashboard & analytics',
        '   └─ 1000+ active users',
        '',
        '🏥 Hospital Management System',
        '   ├─ React + Firebase architecture',
        '   ├─ Real-time appointment booking',
        '   ├─ Patient record management',
        '   └─ Multi-role authentication',
        '',
        '🤖 AI Chat Application',
        '   ├─ OpenAI API integration',
        '   ├─ WebSocket real-time messaging',
        '   ├─ Message history & export',
        '   └─ Modern conversational UI',
        '',
        '💼 Interactive Terminal Portfolio',
        '   ├─ React + Framer Motion',
        '   ├─ Professional terminal interface',
        '   ├─ Smooth animations & interactions',
        '   └─ You\'re experiencing it now!',
        '',
        '🔗 View all projects: github.com/hariramjitech'
      ],
      color: 'text-orange-300'
    },

    contact: {
      output: [
        '╭──────────────────────────────────────╮',
        '│          CONTACT DETAILS             │',
        '╰──────────────────────────────────────╯',
        '',
        '📧 Email: hariramji.3423n@gmail.com',
        '',
        '📱 Phone: +91 8870348008',
        '',
        '💼 Professional:',
        '   ├─ LinkedIn: linkedin.com/in/hariramji-h',
        '   ├─ GitHub: github.com/hariramjitech',
        '   └─ Portfolio: hariramji.dev',
        '',
        '⏰ Availability:',
        '   Monday - Friday: 9 AM - 6 PM IST',
        '',
        '💬 Open for:',
        '   ├─ Full-time opportunities',
        '   ├─ Freelance projects',
        '   ├─ Technical collaborations',
        '   └─ Open source contributions',
        '',
        '🚀 Let\'s build something amazing together!'
      ],
      color: 'text-cyan-300'
    }
  };

  // Enhanced typing animation with proper abort handling
  const typeText = useCallback(async (text, speed = 25) => {
    setIsTyping(true);
    abortControllerRef.current = new AbortController();
    
    try {
      for (let i = 0; i <= text.length; i++) {
        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Aborted');
        }
        
        setLines(prev => {
          const newLines = [...prev];
          if (newLines.length > 0) {
            newLines[newLines.length - 1] = text.substring(0, i);
          }
          return newLines;
        });
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, speed);
          if (abortControllerRef.current) {
            abortControllerRef.current.signal.addEventListener('abort', () => {
              clearTimeout(timeout);
              reject(new Error('Aborted'));
            });
          }
        });
      }
    } catch (error) {
      if (error.message === 'Aborted') {
        return false;
      }
    } finally {
      setIsTyping(false);
    }
    return true;
  }, []);

  // Improved Ctrl+C functionality
  const stopCommand = useCallback(() => {
    if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
      abortControllerRef.current.abort();
    }
    setIsTyping(false);
    setCurrentCommand('');
    
    setLines(prev => [...prev, '', '^C', '⚠️  Process interrupted (Ctrl+C)', '', 'hariramji@dev:~$ ']);
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, []);

  // Window controls
  const handleClose = () => {
    setIsClosed(true);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleRestore = () => {
    setIsClosed(false);
    setIsMinimized(false);
  };

  // Initialize terminal
  useEffect(() => {
    const initTerminal = async () => {
      setLines([]);
      setCurrentCommand('init');
      
      setLines(['']);
      
      const success1 = await typeText('╭─────────────────────────────────────────────╮', 15);
      if (!success1) return;
      
      setLines(prev => [...prev, '']);
      const success2 = await typeText('│     Welcome to Hariramji\'s Portfolio        │', 15);
      if (!success2) return;
      
      setLines(prev => [...prev, '']);
      const success3 = await typeText('│        Professional Terminal v2.0          │', 15);
      if (!success3) return;
      
      setLines(prev => [...prev, '']);
      const success4 = await typeText('╰─────────────────────────────────────────────╯', 15);
      if (!success4) return;
      
      setLines(prev => [...prev, '']);
      const success5 = await typeText('🚀 System initialized successfully', 20);
      if (!success5) return;
      
      setLines(prev => [...prev, '']);
      const success6 = await typeText('💡 Type "help" to see available commands', 20);
      if (!success6) return;
      
      setLines(prev => [...prev, '', 'hariramji@dev:~$ ']);
      setCurrentCommand('');
    };

    // Start initialization after component mounts
    if (!isClosed) {
      setTimeout(initTerminal, 500);
    }
  }, [typeText, isClosed]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // FIXED: Improved focus management
  useEffect(() => {
    if (!isTyping && !isMinimized && !isClosed) {
      // Use a longer timeout to ensure all DOM updates are complete
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isTyping, isMinimized, isClosed, lines.length]); // Added lines.length as dependency

  // Enhanced keyboard event handling
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Only handle Ctrl+C when terminal is focused or active
      if (e.ctrlKey && e.key === 'c' && !isClosed && !isMinimized) {
        if (isTyping) {
          e.preventDefault();
          stopCommand();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isTyping, stopCommand, isClosed, isMinimized]);

  // FIXED: Handle commands with better state management
  const handleKeyDown = useCallback(async (e) => {
    if (e.key !== 'Enter' || isTyping) return;
    
    const cmd = input.trim().toLowerCase();
    setCurrentCommand(cmd);
    
    // Update the last line to show the executed command
    setLines(prev => {
      const newLines = [...prev];
      if (newLines.length > 0 && newLines[newLines.length - 1].endsWith('$ ')) {
        newLines[newLines.length - 1] = `hariramji@dev:~$ ${input}`;
      }
      return newLines;
    });
    
    setInput('');
    
    if (cmd === 'clear'|| cmd === 'cls') {
      setLines(['hariramji@dev:~$ ']);
      setCurrentCommand('');
      return;
    }
    
    const command = commands[cmd];
    
    if (!command) {
      setLines(prev => [...prev, '', `❌ Command "${cmd}" not recognized`, '💡 Type "help" to see available commands', '', 'hariramji@dev:~$ ']);
      setCurrentCommand('');
      return;
    }
    
    // Process command output
    for (const line of command.output) {
      setLines(prev => [...prev, '']);
      const success = await typeText(line, 15); // Slightly faster typing
      if (!success) return;
    }
    
    // FIXED: Ensure we always add a new prompt line at the end
    setLines(prev => [...prev, '', 'hariramji@dev:~$ ']);
    setCurrentCommand('');
  }, [input, isTyping, typeText, commands]);

  // FIXED: Click handler to focus input when clicking on terminal
  const handleTerminalClick = useCallback(() => {
    if (!isTyping && !isMinimized && !isClosed && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping, isMinimized, isClosed]);

  // Smart line styling
  const getLineStyle = (line) => {
    if (line.startsWith('hariramji@dev:~$')) return 'text-green-400 font-semibold';
    if (line.includes('interrupted') || line.includes('❌')) return 'text-red-300';
    if (line.includes('👋') || line.includes('Thanks')) return 'text-yellow-300';
    if (line.includes('╭─') || line.includes('│') || line.includes('╰─')) return 'text-blue-400';
    if (line.includes('🚀') || line.includes('💡')) return 'text-emerald-400';
    if (line === '^C') return 'text-red-400 font-bold';
    
    for (const [cmd, config] of Object.entries(commands)) {
      if (currentCommand === cmd) return config.color;
    }
    
    return 'text-gray-100';
  };

  // Render closed state
  if (isClosed) {
    return (
      <div className={`h-full flex items-center justify-center bg-gray-900 ${className}`}>
        <div className="text-center">
          <Terminal className="text-gray-400 w-16 h-16 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Terminal is closed</p>
          <button
            onClick={handleRestore}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
          >
            Restore Terminal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`h-full bg-gray-900 text-gray-100 flex flex-col transition-all duration-300 ${isMinimized ? 'h-12' : ''} ${className}`}
      style={{ 
        fontFamily: '"JetBrains Mono", "SF Mono", "Monaco", monospace'
      }}
    >
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <button 
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer flex items-center justify-center group"
              title="Close Terminal"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button 
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer flex items-center justify-center group"
              title={isMinimized ? "Restore Terminal" : "Minimize Terminal"}
            >
              <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer flex items-center justify-center group">
              <Square className="w-1.5 h-1.5 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Terminal className="text-emerald-400 w-4 h-4" />
            <span className="text-gray-300 font-medium text-sm">Terminal</span>
            <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-1 rounded">bash</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span>Connected</span>
        </div>
      </div>
      
      {/* Terminal Content - Hidden when minimized */}
      {!isMinimized && (
        <>
          <div 
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto bg-gray-900 cursor-text"
            style={{ lineHeight: '1.4' }}
            onClick={handleTerminalClick}
          >
            {lines.map((line, index) => {
              // Detect if this is the current prompt line
              const isCurrentPrompt = index === lines.length - 1 && line === 'hariramji@dev:~$ ';

              if (isCurrentPrompt) {
                // Split the prompt and input for tight alignment
                const prompt = 'hariramji@dev:~$ ';
                return (
                  <div
                    key={index}
                    className={`mb-1 ${getLineStyle(line)} flex items-start`}
                  >
                    <span className="font-mono text-xs whitespace-pre text-green-400 font-semibold">{prompt}</span>
                    <input
                      ref={inputRef}
                      type="text"
                      className="bg-transparent border-none outline-none text-gray-100 font-mono text-xs caret-emerald-400 flex-1"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isTyping}
                      style={{ minWidth: '40px' }}
                      placeholder=""
                    />
                    {!isTyping && (
                      <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" />
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`mb-1 ${getLineStyle(line)} flex items-start`}
                >
                  <TextWithLinks className="flex-grow font-mono text-xs whitespace-pre-wrap">
                    {line}
                  </TextWithLinks>
                  {index === lines.length - 1 && isTyping && !isCurrentPrompt && (
                    <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Professional Status Bar */}
          <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3 text-gray-400">
              <span>hariramji@portfolio</span>
              <span>•</span>
              <span>~</span>
              {isTyping && currentCommand && (
                <>
                  <span>•</span>
                  <span className="text-yellow-400">Executing: {currentCommand}</span>
                </>
              )}
            </div>
            {isTyping && (
              <div className="text-gray-500 text-xs">
                Press <kbd className="bg-gray-700 px-1 py-0.5 rounded text-xs">Ctrl+C</kbd> to interrupt
              </div>
            )}
          </div>
        </>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 4px;
        }
        div::-webkit-scrollbar-track {
          background: #1f2937;
        }
        div::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 2px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
};

export default TerminalPortfolio;