import Container from './LandingContainer'
import Button from '@/components/ui/Button'
import AuroraBackground from './AuroraBackground'
import { motion } from 'framer-motion'
import { MODE_DARK, MODE_LIGHT } from '@/constants/theme.constant'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Mode } from '@/@types/theme'
import { useState } from 'react'
import ContactDialog from './Contact/ContactDialog'

const LandingFooter = ({ mode }: { mode: Mode }) => {
    const [isOpenContactDialog, setIsOpenContactDialog] = useState(false)

    const year = new Date().getFullYear()

    const router = useRouter()

    const handlePreview = () => {
        router.push('/landing')
    }

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
                            className="relative flex flex-col gap-4 items-center justify-center py-20 px-8 text-center"
                        >
                            <h2 className="text-5xl">Have a Question?</h2>
                            <p className="mt-4 max-w-[400px] mx-auto">
                                We're here to help! If you have any questions
                                about our classes or anything else, feel free to
                                reach out.
                            </p>
                            <div className="mt-6">
                                <Button
                                    variant="solid"
                                    onClick={() => setIsOpenContactDialog(true)}
                                >
                                    Contact Us
                                </Button>
                            </div>
                        </motion.div>
                    </AuroraBackground>
                </div>
                <div className="py-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
                        <Link href="/">
                            {mode === MODE_DARK && (
                                <img
                                    src="/img/landing/hero/boxing.png"
                                    className="w-10 h-10 md:w-12 md:h-12 overflow-hidden"
                                    alt="logo"
                                />
                            )}
                        </Link>
                        <p className="text-center">
                            Copyright © All rights reserved.
                        </p>
                    </div>
                </div>
            </Container>

            {isOpenContactDialog && (
                <ContactDialog
                    isOpen={isOpenContactDialog}
                    setIsOpenContactDialog={setIsOpenContactDialog}
                />
            )}
        </div>
    )
}

export default LandingFooter
