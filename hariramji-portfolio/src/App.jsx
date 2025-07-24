import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './components/Terminal';
import ProfileCard from './components/ProfileCard';
import { useState, useEffect } from 'react';

export default function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    ram: 0,
    network: 0,
    temp: 0
  });
  const [glitchActive, setGlitchActive] = useState(false);
  const [serverStatus, setServerStatus] = useState('ONLINE');
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
      setUptime(prev => prev + 1);
      
      // Simulate system stats
      setSystemStats({
        cpu: Math.floor(Math.random() * 30) + 15,
        ram: Math.floor(Math.random() * 40) + 30,
        network: Math.floor(Math.random() * 100) + 50,
        temp: Math.floor(Math.random() * 15) + 45
      });

      // Random glitch effect
      if (Math.random() > 0.98) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="h-screen flex flex-col bg-black text-green-400 font-mono overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Glitch overlay */}
      <AnimatePresence>
        {glitchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-green-400 mix-blend-screen pointer-events-none z-50"
            style={{
              clipPath: `inset(${Math.random() * 80}% 0 ${Math.random() * 80}% 0)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 0, 0.03) 2px,
          rgba(0, 255, 0, 0.03) 4px
        )`
      }}></div>

      {/* Header - Server Status Bar */}
      <header className="border-b border-green-400 py-2 bg-black bg-opacity-80 backdrop-blur-sm relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`container mx-auto px-4 ${glitchActive ? 'animate-pulse' : ''}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <motion.div 
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                />
                <span className="text-green-400 font-bold text-lg">SERVER-HARIRAMJI</span>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <span className="bg-green-900 px-2 py-1 rounded">STATUS: {serverStatus}</span>
                <span className="text-green-300">UPTIME: {formatUptime(uptime)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <span>CPU:</span>
                <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-400"
                    animate={{ width: `${systemStats.cpu}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span>{systemStats.cpu}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>RAM:</span>
                <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-400"
                    animate={{ width: `${systemStats.ram}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span>{systemStats.ram}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* System Info Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-green-400 bg-gradient-to-r from-green-900 to-green-800 py-1 relative z-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-xs text-green-200 whitespace-nowrap"
          >
            ★ SYSTEM OPERATIONAL ★ WEB DEVELOPER INTERFACE v2.1.7 ★ SECURE CONNECTION ESTABLISHED ★ ALL MODULES LOADED ★ READY FOR INPUT ★
          </motion.div>
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4 relative z-20"
      >
        <motion.h1 
          className="text-5xl font-bold text-green-400 mb-2 tracking-wider"
          animate={{ 
            textShadow: [
              '0 0 5px #00ff00',
              '0 0 10px #00ff00, 0 0 20px #00ff00',
              '0 0 5px #00ff00'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          HARIRAMJI.H
        </motion.h1>
        <div className="flex justify-center items-center space-x-4">
          <span className="text-green-300 text-lg">[WEB_DEVELOPER]</span>
          <span className="text-green-500">|</span>
          <span className="text-green-300 text-lg">[FULL_STACK]</span>
          <span className="text-green-500">|</span>
          <span className="text-green-300 text-lg">[SYSTEM_ADMIN]</span>
        </div>
      </motion.div>

      {/* Main Content - Server Modules */}
      <main className="flex-1 container mx-auto px-4 py-4 overflow-hidden relative z-20">
        <div className="h-full flex flex-col md:flex-row gap-4">
          {/* Left Module - Profile */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 relative"
          >
            <div className="h-full border border-green-400 rounded bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden relative">
              {/* Module Header */}
              <div className="border-b border-green-400 px-4 py-2 bg-green-900 bg-opacity-30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">MODULE: USER_PROFILE</span>
                  <div className="flex space-x-2">
                    <motion.div 
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-yellow-400 rounded-full"
                    />
                    <motion.div 
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-red-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 h-full">
                <ProfileCard />
              </div>
            </div>
          </motion.div>

          {/* Right Module - Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1 relative"
          >
            <div className="h-full border border-green-400 rounded bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden relative">
              {/* Module Header */}
              <div className="border-b border-green-400 px-4 py-2 bg-green-900 bg-opacity-30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">MODULE: TERMINAL_ACCESS</span>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-green-300">NET: {systemStats.network}kb/s</span>
                    <span className="text-green-300">TEMP: {systemStats.temp}°C</span>
                  </div>
                </div>
              </div>
              <div className="h-full">
                <Terminal />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer - System Status */}
      <footer className="border-t border-green-400 py-2 bg-black bg-opacity-80 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center space-x-6">
              <span className="text-green-400">
                SYSTEM_TIME: {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
              </span>
              <span className="text-green-300">
                SESSION_ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-300">SECURITY_LEVEL: HIGH</span>
              <span className="text-green-300">CONN_STATUS: ENCRYPTED</span>
              <motion.span 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-green-400"
              >
                ● ACTIVE
              </motion.span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }
        
        body {
          cursor: crosshair;
        }
        
        * {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: none;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}