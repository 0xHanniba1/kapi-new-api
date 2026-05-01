import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  if (props.isAuthenticated) {
    return null
  }

  return (
    <section className='bg-background text-foreground relative z-10 overflow-hidden px-6 py-24 md:py-32'>
      <AnimateInView
        className='bg-foreground text-background mx-auto max-w-4xl rounded-[2rem] px-6 py-16 text-center sm:px-10 md:py-20'
        animation='scale-in'
      >
        <h2 className='font-serif text-4xl leading-tight font-medium tracking-normal md:text-6xl'>
          准备好接入你的
          <br />
          AI 模型中转站了吗？
        </h2>
        <p className='text-background/62 mx-auto mt-5 max-w-xl text-sm leading-7 md:text-base'>
          {t(
            'Deploy your own gateway and start routing requests through your configured upstream services.'
          )}
        </p>
        <div className='mt-8 flex items-center justify-center gap-3'>
          <Button
            className='bg-background text-foreground hover:bg-muted group rounded-full px-6'
            asChild
          >
            <Link to='/sign-up'>
              免费开始
              <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Link>
          </Button>
          <Button
            variant='outline'
            className='text-background rounded-full border-white/20 bg-white/5 px-6 hover:bg-white/10'
            asChild
          >
            <Link to='/pricing'>查看模型价格</Link>
          </Button>
        </div>
      </AnimateInView>
    </section>
  )
}
