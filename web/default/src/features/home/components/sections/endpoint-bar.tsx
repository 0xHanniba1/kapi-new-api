import { type CSSProperties, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { CopyButton } from '@/components/copy-button'

interface EndpointBarProps {
  className?: string
  style?: CSSProperties
}

const API_ORIGIN = 'https://api.kunapi.com'
const ENDPOINTS = [
  '/v1/models',
  '/v1/chat/completions',
  '/v1/embeddings',
  '/v1/images/generations',
  '/v1/audio/speech',
  '/v1/audio/transcriptions',
  '/v1/messages',
  '/v1/rerank',
]
export function EndpointBar(props: EndpointBarProps) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  const endpoint = ENDPOINTS[index]
  const fullEndpoint = `${API_ORIGIN}${endpoint}`
  const endpointRest = endpoint.slice('/v1'.length)

  useEffect(() => {
    let timeoutId: number | undefined
    const intervalId = window.setInterval(() => {
      setPhase('out')
      timeoutId = window.setTimeout(() => {
        setIndex((current) => (current + 1) % ENDPOINTS.length)
        setPhase('in')
      }, 220)
    }, 1800)

    return () => {
      window.clearInterval(intervalId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div
      className={cn(
        'landing-animate-fade-up mt-7 w-full max-w-[30rem] translate-x-0 opacity-0',
        props.className
      )}
      style={props.style}
    >
      <div className="border-border/40 bg-background/60 ring-border/50 relative isolate mx-auto flex w-full items-center gap-3 overflow-hidden rounded-full border py-1.5 pr-3 pl-5 text-left shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08),0_18px_48px_-24px_rgba(15,15,14,0.28),0_0_0_0.5px_rgba(0,0,0,0.02)] ring-[0.5px] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-full before:bg-[linear-gradient(135deg,rgba(255,255,255,0.58),rgba(255,255,255,0.16)_45%,rgba(255,255,255,0.04))] before:opacity-70 before:content-[''] md:pl-7 dark:shadow-[0_2px_16px_-6px_rgba(0,0,0,0.4),0_18px_48px_-24px_rgba(0,0,0,0.45)]">
        <code className='text-foreground relative z-10 min-w-0 flex-1 truncate font-sans text-[14px] font-semibold tracking-tight'>
          {API_ORIGIN}
        </code>
        <code
          className={cn(
            'relative z-10 hidden w-[12rem] shrink-0 truncate text-right font-sans text-[14px] font-semibold tracking-tight transition duration-200 ease-out sm:block md:w-[14rem]',
            phase === 'in'
              ? 'translate-y-0 opacity-100'
              : '-translate-y-1.5 opacity-0'
          )}
        >
          <span className='text-primary'>/v1</span>
          <span className='text-[#e8593f]'>{endpointRest}</span>
        </code>
        <CopyButton
          value={fullEndpoint}
          tooltip='复制 API 地址'
          successTooltip='已复制'
          aria-label='复制 API 地址'
          className='bg-muted/70 hover:bg-muted/85 text-muted-foreground relative z-10 size-7 rounded-full backdrop-blur-xl'
          iconClassName='size-3.5'
        />
      </div>
    </div>
  )
}
