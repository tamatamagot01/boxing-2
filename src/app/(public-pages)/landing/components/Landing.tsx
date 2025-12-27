'use client'

import HeroContent from './HeroContent'
import NavigationBar from './NavigationBar'
import LandingFooter from './LandingFooter'
import { MODE_DARK } from '@/constants/theme.constant'
import { useState, useEffect } from 'react'

const Landing = () => {
    const [isOpenBookingDialog, setIsOpenBookingDialog] = useState(false)
    const mode = MODE_DARK // Always dark mode

    // Force dark mode on mount
    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light')
        root.classList.add('dark')
    }, [])

    const handleOpenBookingDialog = () => {
        setIsOpenBookingDialog(!isOpenBookingDialog)
    }

    return (
        <main className="px-4 lg:px-0 text-base bg-gray-900">
            {!isOpenBookingDialog && <NavigationBar mode={mode} />}
            <div className="relative min-h-screen">
                {/* Minimal Mesh Gradient Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {/* Mesh gradient base */}
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            background: `
                                radial-gradient(at 0% 0%, rgba(249, 115, 22, 0.15) 0px, transparent 50%),
                                radial-gradient(at 100% 0%, rgba(239, 68, 68, 0.1) 0px, transparent 50%),
                                radial-gradient(at 100% 100%, rgba(234, 88, 12, 0.12) 0px, transparent 50%),
                                radial-gradient(at 0% 100%, rgba(249, 115, 22, 0.08) 0px, transparent 50%)
                            `,
                        }}
                    />

                    {/* Subtle grid overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
                            `,
                            backgroundSize: '80px 80px',
                            maskImage:
                                'linear-gradient(to bottom, black 0%, transparent 100%)',
                            WebkitMaskImage:
                                'linear-gradient(to bottom, black 0%, transparent 100%)',
                        }}
                    />

                    {/* Floating gradient sphere */}
                    <div
                        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-20"
                        style={{
                            background:
                                'radial-gradient(ellipse, rgba(249, 115, 22, 0.25) 0%, transparent 60%)',
                            filter: 'blur(90px)',
                        }}
                    />
                </div>
                <HeroContent
                    mode={mode}
                    isOpenBookingDialog={isOpenBookingDialog}
                    setIsOpenBookingDialog={setIsOpenBookingDialog}
                    handleOpenBookingDialog={handleOpenBookingDialog}
                />
            </div>

            <LandingFooter mode={mode} />
        </main>
    )
}

export default Landing
