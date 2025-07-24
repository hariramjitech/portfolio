import React, { useState, useEffect } from 'react';
import { Download, Terminal, Server, Cpu, HardDrive, Wifi } from 'lucide-react';

export default function ModuleProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [terminalText, setTerminalText] = useState('');

  const bootSequence = [
    'Loading user profile...',
    'Initializing system components...',
    'Mounting file systems...',
    'Starting network services...',
    'Profile loaded successfully.',
    'System ready.'
  ];

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    
    const typeWriter = () => {
      if (textIndex < bootSequence.length) {
        if (charIndex < bootSequence[textIndex].length) {
          setTerminalText(prev => prev + bootSequence[textIndex][charIndex]);
          charIndex++;
          setTimeout(typeWriter, 30);
        } else {
          setTerminalText(prev => prev + '\n');
          textIndex++;
          charIndex = 0;
          setTimeout(typeWriter, 150);
        }
      } else {
        setShowProfile(true);
      }
    };
    
    const timer = setTimeout(typeWriter, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadResume = async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    let hasDownloaded = false;

    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = prev + 8;
        
        if (newProgress >= 100 && !hasDownloaded) {
          hasDownloaded = true;
          clearInterval(progressInterval);
          
          try {
            const link = document.createElement('a');
            link.href = './src/assets/Hariramji Resume1.pdf';
            link.download = 'Hariramji_Resume.pdf';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.log('Resume download initiated');
          }
          
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
          }, 1000);
          
          return 100;
        }
        
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 120);
  };

  return (
    <div className="w-full h-full bg-transparent text-green-400 font-mono text-sm overflow-hidden relative">
      
      {/* Unique Matrix-Style Scrollbar */}
      <style jsx>{`
        .matrix-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #00ff41 transparent;
        }
        
        .matrix-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        
        .matrix-scrollbar::-webkit-scrollbar-track {
          background: linear-gradient(180deg, #000000 0%, #001100 50%, #000000 100%);
          border-radius: 6px;
          border: 1px solid #003300;
          position: relative;
        }
        
        .matrix-scrollbar::-webkit-scrollbar-track::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 1px;
          height: 100%;
          background: repeating-linear-gradient(
            to bottom,
            #00ff41 0px,
            #00ff41 2px,
            transparent 2px,
            transparent 8px
          );
          transform: translateX(-50%);
          opacity: 0.3;
        }
        
        .matrix-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            #00ff41 0%,
            #00cc33 30%,
            #008822 70%,
            #00ff41 100%
          );
          border-radius: 6px;
          border: 2px solid #000000;
          box-shadow: 
            inset 0 0 4px rgba(0, 255, 65, 0.8),
            0 0 8px rgba(0, 255, 65, 0.4);
          position: relative;
        }
        
        .matrix-scrollbar::-webkit-scrollbar-thumb::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 60%;
          background: #ffffff;
          transform: translate(-50%, -50%);
          border-radius: 1px;
          opacity: 0.8;
        }
        
        .matrix-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            #44ff77 0%,
            #00ff41 30%,
            #00bb33 70%,
            #44ff77 100%
          );
          box-shadow: 
            inset 0 0 6px rgba(0, 255, 65, 0.9),
            0 0 12px rgba(0, 255, 65, 0.6),
            0 0 16px rgba(0, 255, 65, 0.3);
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        
        .matrix-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(
            180deg,
            #88ffaa 0%,
            #44ff77 30%,
            #00ff41 70%,
            #88ffaa 100%
          );
          box-shadow: 
            inset 0 0 8px rgba(0, 255, 65, 1),
            0 0 16px rgba(0, 255, 65, 0.8),
            0 0 24px rgba(0, 255, 65, 0.4);
        }
        
        .matrix-scrollbar::-webkit-scrollbar-corner {
          background: #000000;
          border: 1px solid #003300;
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 
              inset 0 0 6px rgba(0, 255, 65, 0.9),
              0 0 12px rgba(0, 255, 65, 0.6),
              0 0 16px rgba(0, 255, 65, 0.3);
          }
          50% { 
            box-shadow: 
              inset 0 0 8px rgba(0, 255, 65, 1),
              0 0 16px rgba(0, 255, 65, 0.8),
              0 0 24px rgba(0, 255, 65, 0.5);
          }
        }
        
        @keyframes scan {
          0% { top: 0%; opacity: 1; }
          50% { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
        
        .scan-line {
          animation: scan 3s linear infinite;
        }
        
        /* Hide scrollbar in boot sequence */
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Boot Sequence - No Scrollbar */}
      {!showProfile && (
        <div className="p-4 h-full flex flex-col no-scrollbar overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4" />
            <span className="text-green-300">System Boot Sequence</span>
          </div>
          <pre className="whitespace-pre-wrap text-xs leading-relaxed">
            {terminalText}
            <span className="animate-pulse">█</span>
          </pre>
        </div>
      )}

      {/* Main Profile Content - With Matrix Scrollbar */}
      {showProfile && (
        <div className="h-full matrix-scrollbar overflow-y-auto">
          <div className="p-4 space-y-4">
            
            {/* User Info Header */}
            <div className="border border-green-400/30 rounded bg-green-900/10 p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-300">╭─</span>
                <Terminal className="w-4 h-4" />
                <span className="text-green-300">USER PROFILE LOADED</span>
              </div>
              <div className="pl-4 text-xs space-y-1">
                <div>├── Status: <span className="text-green-300">Active</span></div>
                <div>├── Location: Coimbatore, Tamil Nadu</div>
                <div>├── Role: Full Stack Developer</div>
                <div>└── Availability: <span className="text-yellow-400 animate-pulse">Available for hire</span></div>
              </div>
            </div>

            {/* Profile Card Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              
              {/* Profile Image */}
              <div className="lg:col-span-1">
                <div className="border border-green-400/30 rounded bg-green-900/10 p-3">
                  <div className="text-green-300 text-xs mb-2">╭─ PROFILE_IMAGE</div>
                  <div className="relative">
                    <div className="w-full aspect-[3/4] bg-gray-800 rounded border border-green-400/20 overflow-hidden">
                      <img 
                        src="./src/assets/IDCard.png"
                        alt="Hariramji Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-green-900/20 flex items-center justify-center text-green-400" style={{display: 'none'}}>
                        <div className="text-center">
                          <div className="text-4xl mb-2">👤</div>
                          <div className="text-xs">HARIRAMJI.H</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Scanning line effect */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-green-400 scan-line opacity-70" />
                  </div>
                  <div className="text-green-400/60 text-xs mt-1">└─ ID_VERIFIED ✓</div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="lg:col-span-2 space-y-3">
                
                {/* Personal Info */}
                <div className="border border-green-400/30 rounded bg-green-900/10 p-3">
                  <div className="text-green-300 text-xs mb-2">╭─ PERSONAL_INFO</div>
                  <div className="pl-2 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>├── Name:</span>
                      <span className="text-green-300">Hariramji H</span>
                    </div>
                    <div className="flex justify-between">
                      <span>├── Title:</span>
                      <span className="text-cyan-400">Full Stack Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span>├── Location:</span>
                      <span className="text-yellow-400">Coimbatore, TamilNadu</span>
                    </div>
                    <div className="flex justify-between">
                      <span>└── Status:</span>
                      <span className="text-green-400 animate-pulse">● ONLINE</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="border border-green-400/30 rounded bg-green-900/10 p-3">
                  <div className="text-green-300 text-xs mb-2">╭─ TECH_STACK</div>
                  <div className="pl-2 text-xs">
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { name: 'React.js', status: '✓' },
                        { name: 'Node.js', status: '✓' },
                        { name: 'Python', status: '✓' },
                        { name: 'MongoDB', status: '✓' },
                        { name: 'JavaScript', status: '✓' },
                        { name: 'Linux', status: '✓' }
                      ].map((tech, i, arr) => (
                        <div key={tech.name} className="flex justify-between">
                          <span>{i === arr.length - 1 ? '└──' : '├──'} {tech.name}:</span>
                          <span className="text-green-400">{tech.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="border border-green-400/30 rounded bg-green-900/10 p-3">
              <div className="text-green-300 text-xs mb-3">╭─ FILE_DOWNLOAD</div>
              
              <button
                onClick={handleDownloadResume}
                disabled={isDownloading}
                className="w-full group"
              >
                <div className="border border-green-400/50 rounded bg-green-900/20 p-3 hover:bg-green-900/30 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/20">
                  <div className="flex items-center justify-between">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border border-green-400/30 rounded flex items-center justify-center">
                        <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : 'group-hover:animate-pulse'}`} />
                      </div>
                      
                      <div className="text-left">
                        <div className="text-green-300 text-sm font-bold">
                          {isDownloading ? '├── Downloading...' : '├── Download Resume'}
                        </div>
                        <div className="text-green-400/70 text-xs">
                          └── {isDownloading ? `Progress: ${downloadProgress}%` : 'Hariramji_Resume.pdf'}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-cyan-400 text-xs font-mono">
                        {isDownloading ? `${downloadProgress}%` : '[PDF]'}
                      </div>
                      <div className="text-green-400/50 text-xs">
                        {Math.floor(Math.random() * 500 + 200)}KB
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {isDownloading && (
                    <div className="mt-2 w-full bg-gray-800 rounded-full h-1">
                      <div 
                        className="bg-green-400 h-1 rounded-full transition-all duration-300 shadow-sm shadow-green-400"
                        style={{width: `${downloadProgress}%`}}
                      />
                    </div>
                  )}
                </div>
              </button>

              <div className="mt-2 text-green-400/50 text-xs text-center">
                Last modified: {new Date().toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                }).replace(/(\d{2})\/(\d{2})\/(\d{4}), (.+)/, '$3-$2-$1 $4')}
              </div>
            </div>

            {/* Connection Status */}
            <div className="text-center text-green-400/40 text-xs pb-4"> 
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Connection established</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}