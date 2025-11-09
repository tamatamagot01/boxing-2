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
                'w-full fixed inset-x-0 z-[50]',
                isSticky ? 'top-4' : 'top-0',
            )}
        >
            {!isOpen && (
                <div
                    className={classNames(
                        'flex flex-row self-start items-center justify-between py-3 max-w-7xl mx-auto px-4 rounded-xl relative z-[60] w-full transition duration-200',
                        isSticky ? 'bg-gray-800 shadow-lg' : 'bg-transparent',
                    )}
                >
                    <button
                        onClick={openDrawer}
                        className="flex lg:hidden items-center gap-4"
                    >
                        <TbMenu2 size={24} />
                    </button>

                    <div className="lg:flex flex-row flex-1 absolute inset-0 hidden items-center justify-center text-sm text-zinc-600 font-medium hover:text-zinc-800 transition duration-200 [perspective:1000px] overflow-auto sm:overflow-visible no-visible-scrollbar">
                        <NavList tabs={navMenu} />
                    </div>

                    {/* User Profile Section */}
                    {user ? (
                        <div className="relative ml-auto user-dropdown">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/40 backdrop-blur-sm transition-all duration-300 shadow-lg shadow-red-500/10"
                            >
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                                        <TbUser
                                            className="text-white"
                                            size={20}
                                        />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                </div>
                                <div className="hidden md:flex flex-col items-start">
                                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                        Welcome Back
                                    </span>
                                    <span className="text-sm font-semibold text-white">
                                        {user.firstName} {user.lastName}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{ rotate: showDropdown ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="hidden md:block"
                                >
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </motion.div>
                            </motion.button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {showDropdown && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-72 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden z-50 backdrop-blur-xl"
                                    >
                                        {/* Header with gradient */}
                                        <div className="relative p-5 bg-gradient-to-r from-red-500/10 to-red-600/10 border-b border-gray-700/50">
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
                                            <div className="relative flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg ring-2 ring-red-500/20">
                                                    <TbUser
                                                        className="text-white"
                                                        size={24}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-base font-bold text-white truncate">
                                                        {user.firstName}{' '}
                                                        {user.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-400 truncate mt-0.5">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="p-2">
                                            <motion.button
                                                whileHover={{ x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-200 group"
                                            >
                                                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                                    <TbLogout
                                                        className="text-red-400 group-hover:text-red-300"
                                                        size={18}
                                                    />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <span className="text-sm font-medium text-white group-hover:text-red-300 transition-colors">
                                                        Sign out
                                                    </span>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        Come back soon!
                                                    </p>
                                                </div>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : null}
                </div>
            )}

            <Drawer
                title="Navigation"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={250}
                placement="left"
            >
                <div className="flex flex-col gap-4">
                    {/* User Info in Mobile */}
                    {user && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl"
                        >
                            {/* Background gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"></div>

                            <div className="relative flex items-center gap-3 mb-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg ring-2 ring-red-500/30">
                                        <TbUser
                                            className="text-white"
                                            size={22}
                                        />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                                        Welcome Back
                                    </p>
                                    <p className="text-sm font-bold text-white truncate">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleLogout}
                                className="relative w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 border border-red-500/30 rounded-xl transition-all duration-200 group"
                            >
                                <TbLogout
                                    className="text-red-400 group-hover:text-red-300 transition-colors"
                                    size={16}
                                />
                                <span className="text-sm font-medium text-white group-hover:text-red-300 transition-colors">
                                    Sign out
                                </span>
                            </motion.button>
                        </motion.div>
                    )}

                    <NavList onTabClick={onDrawerClose} tabs={navMenu} />
                </div>
            </Drawer>
        </div>
    )
}

export default Navigation
