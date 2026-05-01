import { useSystemConfig } from '@/hooks/use-system-config'

export function HomeFooter() {
  const { systemName } = useSystemConfig()
  const displayName = systemName?.trim() || 'Kapi'
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-background text-muted-foreground/70'>
      <div className='mx-auto flex min-h-20 w-full max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm sm:flex-row md:px-8'>
        <p>
          &copy; {currentYear} {displayName}. 版权所有
        </p>
        <p>
          Powered by{' '}
          <a
            href='https://github.com/QuantumNous/new-api'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:text-primary/80 font-medium transition-colors'
          >
            New API
          </a>
        </p>
      </div>
    </footer>
  )
}
