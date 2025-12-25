import classNames from '@/utils/classNames'
import type { ReactNode } from 'react'

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode
    showRadialGradient?: boolean
    auroraClassName?: string
}

const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    auroraClassName,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <div
            className={classNames(
                'relative flex flex-col items-center justify-center bg-gradient-to-br from-zinc-50 to-stone-100 dark:from-zinc-900 dark:to-neutral-900 transition-bg',
                className,
            )}
            {...props}
        >
            <div
                className={classNames(
                    'absolute inset-0 overflow-hidden',
                    auroraClassName,
                )}
            >
                {/* Primary glow */}
                <div
                    className={classNames(
                        'absolute -top-1/2 -left-1/2 w-full h-full rounded-full',
                        'bg-gradient-to-br from-red-500/30 via-orange-400/20 to-transparent',
                        'dark:from-red-600/25 dark:via-orange-500/15 dark:to-transparent',
                        'blur-3xl animate-pulse-slow',
                    )}
                />
                {/* Secondary glow */}
                <div
                    className={classNames(
                        'absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full',
                        'bg-gradient-to-tl from-amber-500/25 via-yellow-400/15 to-transparent',
                        'dark:from-amber-600/20 dark:via-yellow-500/10 dark:to-transparent',
                        'blur-3xl animate-float',
                    )}
                />
                {/* Accent glow */}
                <div
                    className={classNames(
                        'absolute top-1/4 right-1/4 w-1/2 h-1/2 rounded-full',
                        'bg-gradient-to-br from-rose-400/20 via-red-300/10 to-transparent',
                        'dark:from-rose-500/15 dark:via-red-400/10 dark:to-transparent',
                        'blur-2xl animate-drift',
                    )}
                />
                {/* Overlay gradient */}
                {showRadialGradient && (
                    <div
                        className={classNames(
                            'absolute inset-0',
                            '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]',
                        )}
                    />
                )}
            </div>
            {children}
        </div>
    )
}

export default AuroraBackground
