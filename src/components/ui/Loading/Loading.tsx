import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function Loading() {
    return (
        // <DotLottieReact
        //     src="https://lottie.host/7a129b50-8b12-410a-a31d-ca3de5a69193/fgb3Bxh66o.lottie"
        //     loop
        //     autoplay
        // />
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600 dark:text-gray-400">
                    Loading...
                </span>
            </div>
        </div>
    )
}
