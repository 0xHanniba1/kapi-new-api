import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Button } from '@/components/ui/button'
import { KapiMark } from '@/components/kapi/kapi-mark'
import { KapiClockHero } from '../visuals/kapi-clock-hero'
import { EndpointBar } from './endpoint-bar'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const brandName = systemName?.trim() || 'Kapi'

  return (
    <section
      className={cn(
        'bg-background text-foreground relative z-10 flex flex-col items-center overflow-hidden px-4 pt-28 pb-14 sm:px-6 md:pt-36 md:pb-20',
        props.className
      )}
    >
      <div className='flex w-full max-w-[1040px] flex-col items-center text-center'>
        <div
          className='text-primary landing-animate-fade-up inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.22em] uppercase'
          style={{ animationDelay: '0ms' }}
        >
          <KapiMark className='size-7' />
          <span>· {brandName} · AI API RELAY ·</span>
        </div>
        <h1
          className='landing-animate-fade-up mt-6 text-[clamp(3.75rem,7.8vw,5.75rem)] leading-[1.05] font-semibold tracking-normal'
          style={{ animationDelay: '80ms' }}
        >
          把所有大模型
          <br />
          <span className='text-primary'>装进一个入口</span>
        </h1>
        <EndpointBar style={{ animationDelay: '150ms' }} />
        <div
          className='landing-animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0'
          style={{ animationDelay: '230ms' }}
        >
          {props.isAuthenticated ? (
            <Button
              className='bg-foreground text-background hover:bg-primary group rounded-full px-6'
              asChild
            >
              <Link to='/dashboard'>
                {t('Go to Dashboard')}
                <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                className='bg-foreground text-background hover:bg-primary group rounded-full px-6'
                asChild
              >
                <Link to='/sign-up'>
                  免费开始
                  <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </Button>
              <Button
                variant='outline'
                className='border-border bg-card/80 text-foreground hover:bg-muted rounded-full px-6'
                asChild
              >
                <Link to='/pricing'>查看模型价格</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div
        className='landing-animate-fade-up w-full opacity-0'
        style={{ animationDelay: '300ms' }}
      >
        <KapiClockHero />
      </div>
    </section>
  )
}
