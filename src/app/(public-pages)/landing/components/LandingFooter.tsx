import Container from './LandingContainer'
import AuroraBackground from './AuroraBackground'
import { motion } from 'framer-motion'
import { MODE_DARK } from '@/constants/theme.constant'
import Link from 'next/link'
import type { Mode } from '@/@types/theme'
import { HiOutlinePhone, HiOutlineMail } from 'react-icons/hi'
import { FaLine, FaInstagram } from 'react-icons/fa'

const contactInfo = [
    {
        icon: HiOutlinePhone,
        label: 'Phone',
        value: '080 643 0456',
        href: 'tel:0806430456',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
    },
    {
        icon: HiOutlineMail,
        label: 'Email',
        value: 'incomemuaythai@gmail.com',
        href: 'mailto:incomemuaythai@gmail.com',
        color: 'text-red-500',
        bgColor: 'bg-red-500/10',
    },
    {
        icon: FaLine,
        label: 'Line',
        value: '@incomeboxing',
        href: 'https://line.me/ti/p/~incomeboxing',
        color: 'text-green-400',
        bgColor: 'bg-green-400/10',
    },
    {
        icon: FaInstagram,
        label: 'Instagram',
        value: '@incomemuaythaicnx',
        href: 'https://www.instagram.com/incomemuaythaicnx',
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
    },
]

const LandingFooter = ({ mode }: { mode: Mode }) => {
    const year = new Date().getFullYear()

    return (
        <div id="contact" className="relative z-20">
            <Container className="relative">
                <div className="py-10 md:py-40">
                    <AuroraBackground
                        className="rounded-3xl"
                        auroraClassName="rounded-3xl"
                    >
                        <motion.div
                            initial={{ opacity: 0.0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                            className="relative flex flex-col gap-4 items-center justify-center py-12 md:py-20 px-4 md:px-8 text-center"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold">
                                Contact Us
                            </h2>
                            <p className="mt-2 md:mt-4 max-w-[500px] mx-auto text-gray-600 dark:text-gray-300">
                                We're here to help! If you have any questions
                                about our classes or anything else, feel free to
                                reach out.
                            </p>

                            {/* Contact Cards */}
                            <div className="mt-8 w-full max-w-3xl">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {contactInfo.map((contact, index) => (
                                        <motion.a
                                            key={contact.label}
                                            href={contact.href}
                                            target={
                                                contact.href.startsWith('http')
                                                    ? '_blank'
                                                    : undefined
                                            }
                                            rel={
                                                contact.href.startsWith('http')
                                                    ? 'noopener noreferrer'
                                                    : undefined
                                            }
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.1 * index,
                                                duration: 0.3,
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md group overflow-hidden"
                                        >
                                            <div
                                                className={`p-2 md:p-3 rounded-full shrink-0 ${contact.bgColor} ${contact.color} group-hover:scale-110 transition-transform`}
                                            >
                                                <contact.icon className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <div className="flex flex-col items-start min-w-0 flex-1 text-left">
                                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                    {contact.label}
                                                </span>
                                                <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors truncate w-full text-left">
                                                    {contact.value}
                                                </span>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AuroraBackground>
                </div>
                <div className="py-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 px-4">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="hover:opacity-80 transition-opacity shrink-0"
                        >
                            <img
                                src="/img/landing/hero/boxing.png"
                                className="w-10 h-10"
                                alt="Income Muay Thai Logo"
                            />
                        </Link>

                        {/* Copyright */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center text-center sm:text-left">
                            <a
                                href="https://maps.google.com/?q=IC+Muay+Thai+Chiang+Mai+61+1+Sri+Phum+Chiang+Mai+50200"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors group"
                            >
                                <svg
                                    className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>
                                    IC Muay Thai, 61/1 Sri Phum, Chiang Mai
                                </span>
                            </a>

                            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
                                |
                            </span>

                            <p className="text-xs text-gray-500 dark:text-gray-500 shrink-0">
                                © {year} Income Muay Thai
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default LandingFooter
