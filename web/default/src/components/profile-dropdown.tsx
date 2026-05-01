import { Link } from '@tanstack/react-router'
import { User, Wallet, LogOut, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/stores/auth-store'
import { ROLE } from '@/lib/roles'
import useDialogState from '@/hooks/use-dialog'
import { useUserDisplay } from '@/hooks/use-user-display'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutDialog } from '@/components/sign-out-dialog'

const menuItemClassName =
  'h-10 cursor-pointer rounded-xl px-3 text-sm font-medium'

export function ProfileDropdown() {
  const { t } = useTranslation()
  const [open, setOpen] = useDialogState()
  const user = useAuthStore((state) => state.auth.user)
  const { displayName, initials, roleLabel } = useUserDisplay(user)
  const isSuperAdmin = user?.role === ROLE.SUPER_ADMIN

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-9 w-9 rounded-full p-0'>
            <Avatar className='h-9 w-9'>
              <AvatarImage src='/avatars/01.png' alt={`@${displayName}`} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          sideOffset={10}
          className='bg-background/85 border-border/50 w-72 rounded-2xl p-2 shadow-[0_18px_60px_-28px_rgba(15,15,14,0.45)] backdrop-blur-2xl'
        >
          <div className='border-border/50 bg-muted/25 rounded-xl border p-3'>
            <div className='flex items-center gap-3'>
              <Avatar className='size-10'>
                <AvatarImage src='/avatars/01.png' alt={`@${displayName}`} />
                <AvatarFallback className='bg-primary/10 text-primary text-sm font-semibold'>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
                <p className='text-foreground truncate text-sm font-semibold'>
                  {displayName}
                </p>
                <div className='flex items-center gap-1.5 overflow-hidden'>
                  <span className='text-muted-foreground truncate text-xs'>
                    {roleLabel}
                  </span>
                  {user?.group && (
                    <>
                      <span className='text-muted-foreground/60 text-xs'>
                        ·
                      </span>
                      <span className='text-muted-foreground truncate text-xs'>
                        {String(user.group)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='mt-2 space-y-1'>
            <DropdownMenuItem asChild className={menuItemClassName}>
              <Link to='/profile'>
                <User className='size-4.5' />
                <span>{t('Profile')}</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className={menuItemClassName}>
              <Link to='/wallet'>
                <Wallet className='size-4.5' />
                <span>{t('Wallet')}</span>
              </Link>
            </DropdownMenuItem>

            {/* System Settings - only for super admin */}
            {isSuperAdmin && (
              <DropdownMenuItem asChild className={menuItemClassName}>
                <Link
                  to='/system-settings/general'
                  search={{ section: 'system-info' }}
                >
                  <Settings className='size-4.5' />
                  <span>{t('System Settings')}</span>
                </Link>
              </DropdownMenuItem>
            )}
          </div>

          <DropdownMenuSeparator className='my-2' />

          <DropdownMenuItem
            variant='destructive'
            className={menuItemClassName}
            onClick={() => setOpen(true)}
          >
            <LogOut className='size-4.5' />
            <span>{t('Sign out')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
