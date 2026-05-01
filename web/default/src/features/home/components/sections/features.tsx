import { Code, DollarSign, Globe, Shield, Users, Zap } from 'lucide-react'
import { AnimateInView } from '@/components/animate-in-view'

interface FeaturesProps {
  className?: string
}

export function Features(_props: FeaturesProps) {
  const features = [
    {
      id: 'routing',
      num: '01',
      title: '智能路由',
      desc: '故障秒级切换，延迟、价格和供应商可用性自动权衡。',
      span: 'md:col-span-2',
      icon: <Zap className='size-4' />,
      visual: (
        <div className='mt-7 grid grid-cols-3 gap-2'>
          {['OpenAI', 'Claude', 'Gemini', 'DeepSeek', 'Qwen', 'Llama'].map(
            (name) => (
              <div
                key={name}
                className='flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/75'
              >
                {name}
              </div>
            )
          )}
        </div>
      ),
    },
    {
      id: 'secure',
      num: '02',
      title: '访问控制',
      desc: '用户、令牌、额度和模型权限分层配置，适合先给少量用户试用。',
      span: 'md:col-span-1',
      icon: <Shield className='size-4' />,
      visual: (
        <div className='mt-7 flex items-center justify-center'>
          <div className='relative'>
            <div className='border-primary/20 bg-primary/5 flex size-16 items-center justify-center rounded-2xl border'>
              <Shield className='text-primary/70 size-7' strokeWidth={1.5} />
            </div>
            <div className='bg-destructive absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full'>
              <svg
                className='size-2.5 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={3}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m4.5 12.75 6 6 9-13.5'
                />
              </svg>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'billing',
      num: '03',
      title: '透明计费',
      desc: '按 token 实时记录消耗，余额、倍率和日志在控制台一眼看清。',
      span: 'md:col-span-1',
      icon: <DollarSign className='size-4' />,
      visual: (
        <div className='mt-7 space-y-3'>
          {[
            ['deepseek-chat', '58%'],
            ['claude-sonnet', '32%'],
            ['gpt-4o-mini', '10%'],
          ].map(([name, width]) => (
            <div key={name}>
              <div className='text-muted-foreground mb-1.5 flex justify-between font-mono text-[11px]'>
                <span>{name}</span>
                <span>{width}</span>
              </div>
              <div className='bg-muted h-2 rounded-full'>
                <div
                  className='bg-primary h-full rounded-full'
                  style={{ width }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'developer',
      num: '04',
      title: 'OpenAI 兼容',
      desc: '改一行 base_url，现有客户端、SDK 和工具链可以继续使用。',
      span: 'md:col-span-2',
      icon: <Code className='size-4' />,
      visual: (
        <div className='bg-foreground text-background/75 mt-7 rounded-xl p-4 font-mono text-[12px] leading-6'>
          <div className='text-destructive'>
            curl https://api.kunapi.com/v1/chat/completions
          </div>
          <div>-H &quot;Authorization: Bearer sk-...&quot;</div>
          <div>-d &#123;&quot;model&quot;:&quot;deepseek-chat&quot;&#125;</div>
        </div>
      ),
    },
  ]

  const additionalFeatures = [
    {
      icon: <Globe className='size-5' strokeWidth={1.5} />,
      title: '全球加速',
      desc: '配合 CDN 和反代，稳定处理公开域名访问。',
    },
    {
      icon: <Users className='size-5' strokeWidth={1.5} />,
      title: '多人协作',
      desc: '普通用户、管理员和分组额度独立管理。',
    },
    {
      icon: <DollarSign className='size-5' strokeWidth={1.5} />,
      title: '适合商业化',
      desc: '后续接入注册、充值和套餐，不需要重写核心逻辑。',
    },
  ]

  return (
    <section className='bg-background text-foreground relative z-10 px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-14 max-w-2xl'>
          <p className='text-primary mb-3 font-mono text-xs font-semibold tracking-[0.22em] uppercase'>
            Core Features
          </p>
          <h2 className='font-serif text-4xl leading-tight font-medium tracking-normal md:text-5xl'>
            给中转站该有的控制力，
            <br />
            也给用户足够简单的入口。
          </h2>
        </AnimateInView>

        <div className='grid gap-4 md:grid-cols-3'>
          {features.map((feature, index) => {
            const isDark = feature.id === 'routing'
            const isHot = feature.id === 'developer'
            return (
              <AnimateInView
                key={feature.id}
                delay={index * 100}
                animation='scale-in'
                className={`group min-h-[250px] rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${feature.span} ${
                  isDark
                    ? 'bg-primary text-primary-foreground border-primary'
                    : isHot
                      ? 'bg-destructive border-destructive text-white'
                      : 'bg-card text-card-foreground border-border'
                }`}
              >
                <div className='mb-5 flex items-center justify-between'>
                  <span
                    className={`flex size-8 items-center justify-center rounded-full border font-mono text-[10px] font-semibold ${
                      isDark || isHot
                        ? 'border-white/20 bg-white/10'
                        : 'bg-muted border-border'
                    }`}
                  >
                    {feature.num}
                  </span>
                  <span
                    className={
                      isDark || isHot ? 'text-white/75' : 'text-primary'
                    }
                  >
                    {feature.icon}
                  </span>
                </div>
                <h3 className='font-serif text-3xl font-medium tracking-normal'>
                  {feature.title}
                </h3>
                <p
                  className={`mt-3 max-w-md text-sm leading-7 ${
                    isDark || isHot ? 'text-white/70' : 'text-muted-foreground'
                  }`}
                >
                  {feature.desc}
                </p>
                {feature.visual}
              </AnimateInView>
            )
          })}
        </div>

        <div className='mt-12 grid gap-4 md:grid-cols-3'>
          {additionalFeatures.map((feature, index) => (
            <AnimateInView
              key={feature.title}
              delay={index * 100}
              animation='fade-up'
              className='bg-card border-border rounded-2xl border p-7'
            >
              <div className='bg-muted text-primary mb-4 flex size-11 items-center justify-center rounded-xl'>
                {feature.icon}
              </div>
              <h3 className='text-base font-semibold'>{feature.title}</h3>
              <p className='text-muted-foreground mt-2 text-sm leading-6'>
                {feature.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
