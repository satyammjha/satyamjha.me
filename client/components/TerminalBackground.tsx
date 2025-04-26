'use client'

import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react'

const initialLines = [
  '$ bun dev',
  '> Starting server on port 3000...',
  '✔ Compiled successfully in 412ms',
  '',
  '🌐 Local: http://localhost:3000',
  '📡 API: http://localhost:3000/api',
  '',
  '🚀 Building production bundle...',
  '✔ Compiled successfully in 2.1s',
  '📦 Size: 1.2MB (gzipped)',
  '',
  '✅ Ready for deployment!',
  '',
  '$ ./welcome.sh'
]

interface InteractiveTerminalProps {
  className?: string;
}

export default function InteractiveTerminal({ className }: InteractiveTerminalProps) {
  const [phase, setPhase] = useState<'booting' | 'input' | 'ready'>('booting')
  const [name, setName] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const endOfTerminalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (phase === 'booting') {
      const timer = setTimeout(() => {
        setOutput(initialLines)
        setPhase('input')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const executeCommand = (command: string) => {
    const newOutput = [...output, `$ ${command}`]

    switch (command.toLowerCase().split(' ')[0]) {
      case 'help':
        newOutput.push(
          'COMMANDS:',
          'help               - Show this help message',
          'clear              - Clear terminal history',
          'time               - Show current time',
          'theme              - Toggle dark/light mode',
          'js <expression>    - Execute JavaScript code',
          '                   - Example: js 2+2',
          '                   - Example: js console.log("Hello")'
        )
        break

      case 'clear':
        setOutput([])
        return

      case 'time':
        newOutput.push(new Date().toLocaleTimeString())
        break

      case 'theme':
        document.documentElement.classList.toggle('dark')
        newOutput.push('Toggled theme')
        break

      case 'js':
        try {
          const code = command.slice(3).trim()
          if (!code) {
            newOutput.push('ERROR: Please provide JavaScript code')
            newOutput.push('USAGE: js <expression>')
            newOutput.push('EXAMPLE: js console.log("Hello World")')
            break
          }

          let logs: string[] = []
          const originalLog = console.log
          console.log = (...args) => {
            logs.push(args.map(arg =>
              typeof arg === 'object' ? JSON.stringify(arg) : arg
            ).join(' '))
          }

          const result = Function(`"use strict"; ${code}`)()
          console.log = originalLog

          if (logs.length > 0) {
            logs.forEach(log => newOutput.push(`> ${log}`))
          } else if (typeof result !== 'undefined') {
            newOutput.push(`> ${typeof result === 'object' ? JSON.stringify(result) : result}`)
          }

        } catch (error) {
          newOutput.push(`ERROR: ${(error as Error).message}`)
        }
        break
      default:
        newOutput.push(`COMMAND NOT FOUND: ${command}`)
        newOutput.push('Type "help" for available commands')
    }

    setOutput(newOutput)
    setCurrentCommand('')
  }

  const handleNameSubmit = () => {
    if (name.trim()) {
      setPhase('ready')
      setOutput(prev => [...prev, `Welcome ${name}!`, 'Type "help" for commands'])
    }
  }

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' })
    if (phase === 'input' || phase === 'ready') {
      inputRef.current?.focus()
    }
  }, [phase, output])

  return (
    <div className={cn("relative h-[40vh] sm:h-[60vh] w-full overflow-hidden rounded-lg bg-gray-900 shadow-2xl border border-gray-700") + (className ? ` ${className}` : '')}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent mix-blend-overlay" />
        <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
        <div className="flex space-x-2">
          {['#ff5f56', '#ffbd2e', '#27c93f'].map((color, i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full border border-white/10 shadow-inner"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-gray-400 font-mono">term v1.0.0</span>
      </div>

      {/* Terminal Content */}
      <div
        ref={contentRef}
        className="h-[calc(100%-40px)] overflow-y-auto scrollbar-hide p-4 font-mono text-sm bg-gray-800/50"
      >
        <div className="text-gray-300 space-y-1">
          {output.map((line, i) => (
            <div
              key={i}
              className="flex items-center"
            >
              {line.startsWith('$') && <span className="mr-2 text-gray-400">➜</span>}
              <span className={
                line.startsWith('✔') || line.startsWith('✅') ? 'text-green-400 font-semibold' :
                  line.startsWith('❌') || line.startsWith('ERROR') ? 'text-red-400 font-semibold' :
                    line.startsWith('>') ? 'text-blue-300' :
                      line.startsWith('COMMAND') ? 'text-red-400' :
                        line === 'COMMANDS:' || line === 'USAGE:' || line === 'EXAMPLE:' ? 'font-bold text-gray-200' :
                          'text-gray-300'
              }>
                {line}
              </span>
            </div>
          ))}

          {phase === 'input' && (
            <div className="flex items-center">
              <span className="mr-2 text-gray-400">➜</span>
              <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                className="w-full bg-transparent text-gray-200 outline-none placeholder:text-gray-500"
                placeholder="Enter your name..."
              />
              <span className="ml-1 animate-blink text-gray-400">_</span>
            </div>
          )}

          {phase === 'ready' && (
            <div className="flex items-center">
              <span className="mr-2 text-gray-400">➜</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && executeCommand(currentCommand)}
                className="w-full bg-transparent text-gray-200 outline-none placeholder:text-gray-500"
                placeholder="Enter command..."
              />
              <span className="ml-1 animate-blink text-gray-400">_</span>
            </div>
          )}

          <div ref={endOfTerminalRef} />
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 bg-gray-800 px-4 py-1 text-xs text-gray-400 font-mono">
        {phase === 'ready'
          ? `[${name}] > Active Session`
          : phase === 'input'
            ? 'System: Awaiting user authentication...'
            : 'Booting System...'}
      </div>
    </div>
  )
}