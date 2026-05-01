import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()
  const displayName = systemName?.trim() || 'Kapi'

  return (
    <div className='bg-background text-foreground relative min-h-svh overflow-hidden'>
      <div className='bg-border/40 pointer-events-none absolute inset-x-0 top-0 h-px' />
      <Link
        to='/'
        className='absolute top-5 left-5 z-10 flex items-center gap-2.5 transition-opacity hover:opacity-80 sm:top-8 sm:left-8'
      >
        <div className='relative h-8 w-8'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-full' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='h-8 w-8 rounded-full object-cover'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-6 w-24' />
        ) : (
          <h1 className='text-lg font-semibold tracking-tight'>
            {displayName}
          </h1>
        )}
      </Link>

      <main className='relative flex min-h-svh items-center justify-center px-4 py-24 sm:px-6'>
        <section className='border-border/50 bg-background/75 w-full max-w-[420px] rounded-2xl border p-6 shadow-[0_20px_70px_-36px_rgba(15,15,14,0.45)] backdrop-blur-2xl sm:p-8'>
          {children}
        </section>
      </main>
    </div>
  )
}
