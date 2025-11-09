'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui'
import { signIn } from 'next-auth/react'
import { getCurrentUser } from '../../service/user/queryFns'

type UserTypeSelectionProps = {
    selectedType: 'member' | 'register' | 'guest' | null
    onSelectType: (type: 'member' | 'register' | 'guest') => void
    onNext: () => void
    onLoginSuccess: (userData: {
        id: number
        email: string
        firstName: string
        lastName: string
        phone: string
    }) => void
}

export default function UserTypeSelection({
    selectedType,
    onSelectType,
    onNext,
    onLoginSuccess,
}: UserTypeSelectionProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('Invalid email or password')
                setIsLoading(false)
                return
            }

            // If login successful, fetch user data using service function
            const userData = await getCurrentUser()

            if (userData.success && userData.user) {
                onSelectType('member')
                onLoginSuccess({
                    id: userData.user.id,
                    email: userData.user.email,
                    firstName: userData.user.first_name,
                    lastName: userData.user.last_name,
                    phone: userData.user.phone || '', // Handle null phone
                })
                onNext()
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('An error occurred during login')
        } finally {
            setIsLoading(false)
        }
    }

    const handleAlternativeOption = (type: 'member' | 'register' | 'guest') => {
        onSelectType(type)
        // Only go to next page if not registering (register stays on same page to show form)
        if (type !== 'register') {
            onNext()
        }
    }

    return (
        <div className="px-6 py-6">
            {/* Header */}
            <div className="mb-6">
                <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                >
                    Welcome Back
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-gray-600 dark:text-gray-400"
                >
                    Login to book your boxing session
                </motion.p>
            </div>

            {/* Login Form */}
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4 mb-6"
            >
                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    >
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    </motion.div>
                )}

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                    />
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                        />
                        <span className="text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                    <button
                        type="button"
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                    >
                        Forgot password?
                    </button>
                </div>

                <Button
                    type="submit"
                    variant="solid"
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5"
                    disabled={isLoading}
                    loading={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </motion.form>

            {/* Divider */}
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        or
                    </span>
                </div>
            </div>

            {/* Alternative Options */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-3 text-sm"
            >
                <button
                    type="button"
                    onClick={() => handleAlternativeOption('register')}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium hover:underline transition-colors"
                >
                    Create an Account
                </button>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <button
                    type="button"
                    onClick={() => handleAlternativeOption('guest')}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium hover:underline transition-colors"
                >
                    Continue as Guest
                </button>
            </motion.div>
        </div>
    )
}
