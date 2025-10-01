import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'

export default function BookingSuccess() {
    return (
        <div className="px-6 pb-6">
            <h4 className="mb-2 text-center">Booking Successful</h4>
            <hr className="my-4" />

            <h5 className="font-bold text-gray-700 text-center">
                Booking ID : <span className="text-success">#A12B4</span>
            </h5>

            <div className="flex justify-center items-center my-5">
                <DotLottieReact
                    src="https://lottie.host/3b2bd273-2cfe-4517-a223-b4eee2834030/gZilPBNCOm.lottie"
                    className="w-3/4"
                    loop
                    autoplay
                />
            </div>

            <h3 className="font-bold text-gray-700 text-center text-wrap">
                Your booking has been created!
            </h3>

            <div className="flex justify-center items-center text-center my-3">
                <p className="text-wrap w-3/4">
                    Thanks for scheduling! We can't wait to see you smash your
                    workout. Your confirmation email is on its way!
                </p>
            </div>
        </div>
    )
}
