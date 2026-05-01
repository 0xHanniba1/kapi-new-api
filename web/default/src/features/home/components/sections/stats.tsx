import { useRef, useEffect, useCallback } from 'react'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

function Counter(props: CounterProps) {
  const { end, suffix = '', prefix = '', duration = 1600, decimals = 0 } = props
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  const formatValue = useCallback(
    (v: number) =>
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
    [decimals]
  )

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = `${prefix}${formatValue(eased * end)}${suffix}`
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, prefix, suffix, formatValue])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      el.textContent = `${prefix}${formatValue(end)}${suffix}`
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, end, prefix, suffix, formatValue])

  return (
    <span ref={ref} className='tabular-nums'>
      {prefix}0{suffix}
    </span>
  )
}

interface StatsProps {
  className?: string
}

interface StatItem {
  end: number
  suffix: string
  label: string
  decimals?: number
}

export function Stats(_props: StatsProps) {
  const stats: StatItem[] = [
    { end: 30, suffix: '+', label: '供应商' },
    { end: 80, suffix: '+', label: '模型' },
    { end: 99.99, suffix: '%', label: '可用性', decimals: 2 },
    { end: 100, suffix: 'ms', label: '路由开销' },
  ]

  return (
    <div className='bg-background border-border relative z-10 border-y'>
      <div className='mx-auto max-w-6xl px-6 py-12 md:py-16'>
        <div className='grid grid-cols-2 gap-y-10 md:grid-cols-4'>
          {stats.map((s, index) => (
            <div
              key={s.label}
              className='border-border flex flex-col px-3 text-left md:border-l md:px-8 first:md:border-l-0'
            >
              <span className='text-foreground font-serif text-4xl leading-none font-medium tracking-normal md:text-6xl'>
                {index === 3 && (
                  <span className='text-3xl md:text-5xl'>&lt;</span>
                )}
                <Counter end={s.end} suffix={s.suffix} decimals={s.decimals} />
              </span>
              <span className='text-muted-foreground mt-3 font-mono text-xs font-semibold tracking-[0.18em] uppercase'>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
