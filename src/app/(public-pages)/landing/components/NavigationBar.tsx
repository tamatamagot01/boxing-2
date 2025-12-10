'use client'
import { useState, useEffect } from 'react'
import NavList from './NavList'
import Drawer from '@/components/ui/Drawer'
import classNames from '@/utils/classNames'
import useScrollTop from '@/utils/hooks/useScrollTop'
import { TbMenu2, TbUser, TbLogout } from 'react-icons/tb'
import type { Mode } from '@/@types/theme'
import { signOut } from 'next-auth/react'
import { getCurrentUser } from '../service/user/queryFns'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type NavigationProps = {
    mode: Mode
}

const navMenu = [
    {
        title: 'Booking',
        value: 'booking',
        to: 'booking',
    },
    {
        title: 'Contact',
        value: 'contact',
        to: 'contact',
    },
]

const Navigation = ({}: NavigationProps) => {
    const { isSticky } = useScrollTop()

    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState<{
        firstName: string
        lastName: string
        email: string
    } | null>(null)
    const [showDropdown, setShowDropdown] = useState(false)

    // Check if user is logged in
    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await getCurrentUser()
                if (userData.success && userData.user) {
                    setUser({
                        firstName: userData.user.first_name,
                        lastName: userData.user.last_name,
                        email: userData.user.email,
                    })
                }
            } catch (error) {
                // User not logged in
                setUser(null)
            }
        }
        checkUser()
    }, [])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest('.user-dropdown')) {
                setShowDropdown(false)
            }
        }

        if (showDropdown) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [showDropdown])

    const handleLogout = async () => {
        await signOut({ redirect: false })
        setUser(null)
        setShowDropdown(false)
        window.location.reload()
    }

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    return (
        <div
            style={{ transition: 'all 0.2s ease-in-out' }}
            className={classNames(
                'w-full fixed inset-x-0 z-[50] transition-all duration-300',
                isSticky 
                    ? 'top-0 bg-black/80 backdrop-blur-md border-b border-white/10 py-4' 
                    : 'top-0 bg-transparent py-6',
            )}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">           
                   <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden">
                        <Image
                            src="/img/landing/hero/boxing.png"
                            alt="Boxing Gym Logo"
                            fill
                            className="object-cover"
                        />
                    </div>

                {/* Desktop Navigation */}
                <div className="w-full hidden lg:flex items-center justify-center gap-8">
                    <NavList tabs={navMenu} />
                </div>

                {/* Right Section */}
               <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={openDrawer}
                        className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                    >
                        <TbMenu2 size={20} />
                    </button>
                </div>
            </div>

            <Drawer
                title="Navigation"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={280}
                placement="right"
            >
                <div className="flex flex-col gap-6 p-4">
                    {user && (
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2feaa8] to-[#0eb9ce] flex items-center justify-center text-black">
                                    <TbUser size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{user.firstName}</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                            >
                                <TbLogout size={16} />
                                Sign out
                            </button>
                        </div>
                    )}
                    <NavList onTabClick={onDrawerClose} tabs={navMenu} />
                </div>
            </Drawer>
        </div>
    )
}

export default Navigation
