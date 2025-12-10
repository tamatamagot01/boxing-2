import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import TextGenerateEffect from './TextGenerateEffect'
import { MODE_DARK } from '@/constants/theme.constant'
import Image from 'next/image'
import type { Mode } from '@/@types/theme'
import BookingDialog from './Booking/BookingDialog'
import Features from './Features'

type HeroContentType = {
    mode: Mode
    isOpenBookingDialog: boolean
    setIsOpenBookingDialog: (isOpen: boolean) => void
    handleOpenBookingDialog: () => void
}

const HeroContent = ({
    mode,
    isOpenBookingDialog,
    setIsOpenBookingDialog,
    handleOpenBookingDialog,
}: HeroContentType) => {
    return (
        <div
            className="max-w-7xl mx-auto px-4 flex min-h-screen flex-col items-center justify-between"
            id="booking"
        >
            <div className="flex flex-col min-h-screen pt-20 md:pt-40 relative overflow-hidden">
                <div>
                    <TextGenerateEffect
                        wordClassName="text-2xl md:text-4xl lg:text-8xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-10"
                        words="CRUSH  YOUR GOALS"
                        wordsCallbackClass={({ word }) => {
                            if (word === 'GOALS') {
                                return 'bg-gradient-to-r from-[#2feaa8] to-[#0eb9ce] bg-clip-text text-transparent'
                            }

                            return ''
                        }}
                    />
                    <motion.p
                        initial={{ opacity: 0, translateY: 40 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="text-center mt-6 text-base md:text-xl text-muted dark:text-muted-dark max-w-5xl mx-auto relative z-10 font-normal"
                    >
                        FIND YOUR NEW 'EXPERIENCE'
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, translateY: 40 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        className="flex items-center gap-4 justify-center mt-10 relative z-10"
                    >
                        <Button
                            variant="solid"
                            onClick={handleOpenBookingDialog}
                        >
                            Book Now
                        </Button>
                    </motion.div>
                </div>
                <div className="mt-20 relative w-full max-w-7xl mx-auto flex flex-col gap-20 pb-20">
                    <Features />
                </div>
                 <Image
                            src="/img/landing/hero/boxing_training.png"
                            width={3840}
                            height={2160}
                            alt="Boxing Action 4K"
                            className="w-full h-[50vh] object-cover object-contain"
                            quality={100}
                            priority
                        />
            </div>

            {isOpenBookingDialog && (
                <BookingDialog
                    isOpen={isOpenBookingDialog}
                    setIsOpenBookingDialog={setIsOpenBookingDialog}
                />
            )}
        </div>
    )
}

export default HeroContent
