'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui'
import { useMutation } from '@tanstack/react-query'
import { createUser } from '../../service/user/queryFns'

type RegisterFormProps = {
    onRegister: (data: RegisterData) => void
    onBackToLogin: () => void
}

export type RegisterData = {
    firstName: string
    lastName: string
    email: string
    phone?: string
    password: string
}

export default function RegisterForm({
    onRegister,
    onBackToLogin,
}: RegisterFormProps) {
    const [formData, setFormData] = useState<RegisterData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<Partial<RegisterData>>({})

    const { mutate, isPending, error } = useMutation({
        mutationFn: createUser,
        onSuccess: (response) => {
            if (response.success && response.user) {
                // Call onRegister with the form data and user info
                onRegister({
                    ...formData,
                    userId: response.user.id,
                } as any)
            }
        },
        onError: (err) => {
            console.error('Registration error:', err)
        },
    })

    const validateForm = () => {
        const newErrors: Partial<RegisterData> = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required'
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required'
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address'
        }
        // Phone is optional, but if provided, validate format
        if (formData.phone && formData.phone.trim()) {
            if (!/^0\d{9}$/.test(formData.phone)) {
                newErrors.phone = 'Phone must be 10 digits starting with 0'
            }
        }
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        if (formData.password !== confirmPassword) {
            setErrors({ ...newErrors })
            return false
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        mutate(formData)
    }

    const handleChange = (field: keyof RegisterData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
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
                    Create Account
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-gray-600 dark:text-gray-400"
                >
                    Join us and get exclusive member benefits
                </motion.p>
            </div>

            {/* Register Form */}
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4 mb-6"
            >
                {/* API Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    >
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {(error as any).response?.data?.message ||
                                'An error occurred during registration'}
                        </p>
                    </motion.div>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) =>
                                handleChange('firstName', e.target.value)
                            }
                            placeholder="John"
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                                errors.firstName
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        />
                        {errors.firstName && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.firstName}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) =>
                                handleChange('lastName', e.target.value)
                            }
                            placeholder="Doe"
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                                errors.lastName
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        />
                        {errors.lastName && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
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
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                        Phone Number{' '}
                        <span className="text-gray-400 text-xs">
                            (Optional)
                        </span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="0812345678"
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.phone
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    />
                    {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.phone}
                        </p>
                    )}
                </div>

                {/* Password */}
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
                        value={formData.password}
                        onChange={(e) =>
                            handleChange('password', e.target.value)
                        }
                        placeholder="••••••••"
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                            confirmPassword &&
                            formData.password !== confirmPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    />
                    {confirmPassword &&
                        formData.password !== confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">
                                Passwords do not match
                            </p>
                        )}
                </div>

                <Button
                    type="submit"
                    variant="solid"
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5"
                    disabled={isPending}
                    loading={isPending}
                >
                    {isPending ? 'Creating Account...' : 'Create Account'}
                </Button>
            </motion.form>

            {/* Back to Login */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center text-sm"
            >
                <span className="text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                </span>
                <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium hover:underline transition-colors"
                >
                    Login
                </button>
            </motion.div>
        </div>
    )
}
