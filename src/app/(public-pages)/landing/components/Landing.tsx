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
            <div className="relative">
                <div
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='50' height='50' fill='none' stroke='rgb(255 255 255 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
                    }}
                    className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white_5%,transparent_70%)] pointer-events-none select-none"
                ></div>
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
