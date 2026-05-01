import { useEffect, useState } from 'react'

const PROVIDERS = [
  '#10B981',
  '#F97316',
  '#2563EB',
  '#A855F7',
  '#14B8A6',
  '#F43F5E',
  '#84CC16',
  '#0EA5E9',
  '#F59E0B',
  '#6366F1',
  '#22C55E',
  '#E8593F',
]

function polar(cx: number, cy: number, radius: number, degrees: number) {
  const radians = ((degrees - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  }
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function shanghaiNow(timestamp = Date.now()) {
  const date = new Date(timestamp)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000
  return new Date(utc + 8 * 60 * 60 * 1000)
}

export function KapiClockHero() {
  const [timestamp, setTimestamp] = useState(() => Date.now())

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (reducedMotion.matches) {
      const id = window.setInterval(() => setTimestamp(Date.now()), 1000)
      return () => window.clearInterval(id)
    }

    let frameId = 0
    const tick = () => {
      setTimestamp(Date.now())
      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const now = shanghaiNow(timestamp)
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000
  const minutes = now.getMinutes() + seconds / 60
  const hours = (now.getHours() % 12) + minutes / 60
  const pulse = Math.exp(-(seconds - Math.floor(seconds)) * 6)
  const cx = 500
  const cy = 230
  const hourHand = polar(cx, cy, 95, (hours / 12) * 360)
  const minuteHand = polar(cx, cy, 145, (minutes / 60) * 360)
  const secondTip = polar(cx, cy, 175, (seconds / 60) * 360)
  const circumference = 2 * Math.PI * 175

  return (
    <div className='relative mx-auto mt-10 h-[320px] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-linear-to-b from-[#F2EEE5] to-[#E8E2D4] text-[#0F0F0E] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-black/10 md:h-[460px] dark:from-[#24231F] dark:to-[#171714] dark:text-[#F5F2EC] dark:ring-white/10'>
      <svg
        viewBox='0 0 1000 460'
        className='block size-full'
        aria-label='Kapi routing clock'
      >
        <defs>
          <linearGradient id='kapi-clock-hand' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#1F5947' />
            <stop offset='100%' stopColor='#0E2C22' />
          </linearGradient>
          <radialGradient id='kapi-clock-halo' cx='0.5' cy='0.5' r='0.5'>
            <stop offset='0%' stopColor='#E8593F' stopOpacity='0.16' />
            <stop offset='100%' stopColor='#E8593F' stopOpacity='0' />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r='175' fill='url(#kapi-clock-halo)' />

        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index / 12) * 360
          const inner = polar(cx, cy, 168, angle)
          const outer = polar(cx, cy, 182, angle)
          const isMajor = index % 3 === 0

          return (
            <line
              key={index}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke='currentColor'
              opacity={isMajor ? 0.35 : 0.24}
              strokeWidth={isMajor ? 2.5 : 1.2}
              strokeLinecap='round'
            />
          )
        })}

        {PROVIDERS.map((color, index) => {
          const position = polar(cx, cy, 158, (index / 12) * 360)
          const phase = ((seconds + index * 5) / 12) % 1
          const breath = 0.45 + 0.55 * Math.abs(Math.sin(phase * Math.PI))

          return (
            <g key={color + index}>
              <circle
                cx={position.x}
                cy={position.y}
                r={5 + breath * 2}
                fill={color}
                opacity={0.22 * breath}
              />
              <circle
                cx={position.x}
                cy={position.y}
                r='3.5'
                fill={color}
                opacity={breath}
              />
            </g>
          )
        })}

        <circle
          cx={cx}
          cy={cy}
          r='182'
          fill='none'
          stroke='currentColor'
          opacity='0.12'
          strokeWidth='1'
        />
        <circle
          cx={cx}
          cy={cy}
          r='175'
          fill='none'
          stroke='#E8593F'
          strokeWidth='2'
          strokeLinecap='round'
          strokeDasharray={`${(seconds / 60) * circumference} ${circumference}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          opacity='0.85'
        />
        <circle cx={secondTip.x} cy={secondTip.y} r='3.5' fill='#E8593F' />

        <line
          x1={cx}
          y1={cy}
          x2={minuteHand.x}
          y2={minuteHand.y}
          stroke='url(#kapi-clock-hand)'
          strokeWidth='16'
          strokeLinecap='round'
        />
        <line
          x1={cx}
          y1={cy}
          x2={hourHand.x}
          y2={hourHand.y}
          stroke='url(#kapi-clock-hand)'
          strokeWidth='19'
          strokeLinecap='round'
        />
        <line
          x1={cx - 5}
          y1={cy - 145}
          x2={cx - 5}
          y2={cy + 145}
          stroke='currentColor'
          opacity='0.32'
          strokeWidth='1.2'
        />
        <line
          x1={cx + 5}
          y1={cy - 145}
          x2={cx + 5}
          y2={cy + 145}
          stroke='currentColor'
          opacity='0.32'
          strokeWidth='1.2'
        />
        <circle
          cx={cx}
          cy={cy}
          r={19 + pulse * 8}
          fill='#E8593F'
          opacity={0.18 * pulse}
        />
        <circle cx={cx} cy={cy} r='16' fill='#E8593F' />
        <circle cx={cx} cy={cy} r='4.5' fill='var(--background)' />
      </svg>

      <div className='text-foreground/55 absolute bottom-6 left-6 hidden font-mono text-[11px] tracking-[0.18em] uppercase sm:block'>
        · 24 / 7 实时路由 · 12 家供应商在线 ·
      </div>
      <div className='text-foreground/55 absolute right-6 bottom-6 font-mono text-[11px] tracking-[0.16em] tabular-nums'>
        SHA · {pad(now.getHours())}:{pad(now.getMinutes())}:
        {pad(now.getSeconds())}
      </div>
    </div>
  )
}
