import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { CreditCard } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { getCurrencyLabel, isCurrencyDisplayEnabled } from '@/lib/currency'
import { formatNumber, formatQuota } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useStatus } from '@/hooks/use-status'
import { Button } from '@/components/ui/button'
import { StaggerContainer, StaggerItem } from '@/components/page-transition'
import { useSummaryCardsConfig } from '@/features/dashboard/hooks/use-dashboard-config'
import { StatCard } from '../ui/stat-card'

export function SummaryCards() {
  const { t } = useTranslation()
  const user = useAuthStore((state) => state.auth.user)
  const { status, loading } = useStatus()

  const summaryValues = useMemo(() => {
    const remainQuota = Number(user?.quota ?? 0)
    const usedQuota = Number(user?.used_quota ?? 0)
    const requestCount = Number(user?.request_count ?? 0)

    return {
      remainDisplay: formatQuota(remainQuota),
      usedDisplay: formatQuota(usedQuota),
      requestCountDisplay: formatNumber(requestCount),
    }
  }, [user])

  const currencyEnabledFromStore = isCurrencyDisplayEnabled()
  const statusCurrencyFlag =
    typeof status?.display_in_currency === 'boolean'
      ? Boolean(status.display_in_currency)
      : undefined
  const currencyEnabled =
    statusCurrencyFlag !== undefined
      ? statusCurrencyFlag
      : currencyEnabledFromStore
  const currencyLabel = currencyEnabled ? getCurrencyLabel() : 'Tokens'

  const items = useSummaryCardsConfig({
    ...summaryValues,
    currencyEnabled,
    currencyLabel,
  }).map((config, index) => ({
    title: config.title,
    value: config.value,
    desc: config.description,
    icon: config.icon,
    isBalance: index === 0,
  }))

  return (
    <div>
      <StaggerContainer className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
        {items.map((it) => (
          <StaggerItem
            key={it.title}
            className={cn(
              'rounded-2xl border p-4 sm:p-5',
              it.isBalance
                ? 'bg-primary border-primary shadow-[0_18px_55px_-40px_rgba(26,77,62,0.8)]'
                : 'bg-card border-border'
            )}
          >
            <StatCard
              title={it.title}
              value={it.value}
              description={it.desc}
              icon={it.icon}
              loading={loading}
              inverted={it.isBalance}
              action={
                it.isBalance ? (
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-primary-foreground hidden h-6 gap-1 border-white/20 bg-white/10 px-2 text-xs hover:bg-white/15 sm:inline-flex'
                    asChild
                  >
                    <Link to='/wallet'>
                      <CreditCard className='size-3' />
                      {t('Recharge')}
                    </Link>
                  </Button>
                ) : undefined
              }
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
