import { type SVGProps } from 'react'
import { cn } from '@/lib/utils'

type KapiMarkProps = SVGProps<SVGSVGElement> & {
  accent?: string
}

export function KapiMark({
  className,
  accent = '#E8593F',
  ...props
}: KapiMarkProps) {
  return (
    <svg
      viewBox='0 0 128 128'
      role='img'
      aria-label='Kapi'
      className={cn('text-primary size-6', className)}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='64' cy='64' r='45' stroke='currentColor' strokeWidth='5' />
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index / 12) * Math.PI * 2
        const isMajor = index % 3 === 0
        const inner = isMajor ? 35 : 39
        const outer = 42
        const x1 = 64 + Math.sin(angle) * inner
        const y1 = 64 - Math.cos(angle) * inner
        const x2 = 64 + Math.sin(angle) * outer
        const y2 = 64 - Math.cos(angle) * outer

        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke='currentColor'
            strokeLinecap='round'
            strokeWidth={isMajor ? 3 : 1.6}
            opacity={isMajor ? 0.55 : 0.28}
          />
        )
      })}
      <line
        x1='60'
        y1='24'
        x2='60'
        y2='104'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2.2'
        opacity='0.38'
      />
      <line
        x1='68'
        y1='24'
        x2='68'
        y2='104'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2.2'
        opacity='0.38'
      />
      <line
        x1='64'
        y1='64'
        x2='96'
        y2='46'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='10'
      />
      <line
        x1='64'
        y1='64'
        x2='96'
        y2='84'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='10'
      />
      <circle cx='64' cy='64' r='12' fill={accent} />
      <circle cx='64' cy='64' r='4' fill='var(--background)' />
    </svg>
  )
}
