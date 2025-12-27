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
                <div className="relative z-10">
                    {/* Minimal line decorations */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-orange-500" />

                    <TextGenerateEffect
                        wordClassName="text-2xl md:text-4xl lg:text-8xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-10"
                        words="CRUSH  YOUR GOALS"
                        wordsCallbackClass={({ word }) => {
                            if (word === 'GOALS') {
                                return 'text-orange-500'
                            }
                            return ''
                        }}
                    />

                    <motion.p
                        initial={{ opacity: 0, translateY: 40 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="text-center mt-6 text-base md:text-xl text-gray-400 max-w-5xl mx-auto relative z-10 font-normal tracking-wide"
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
                            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-bold transition-colors duration-300"
                        >
                            Book Now
                        </Button>
                    </motion.div>
                </div>

                <div className="mt-20 relative w-full max-w-7xl mx-auto flex flex-col gap-20 pb-20">
                    <Features />
                </div>

                {/* Clean Hero Image */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="relative w-full max-w-6xl mx-auto"
                >
                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl">
                        <Image
                            src="/img/landing/hero/boxing_training.png"
                            width={3840}
                            height={2160}
                            alt="Boxing Action 4K"
                            className="w-full h-[50vh] object-cover"
                            quality={100}
                            priority
                        />

                        {/* Simple dark overlay */}
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Clean top bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
                    </div>
                </motion.div>
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
