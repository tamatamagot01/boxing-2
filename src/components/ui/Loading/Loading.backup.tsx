// ทางเลือกที่ 3: ใช้ CSS Spinner แทน (ถ้า Lottie มีปัญหา)
export default function Loading() {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    )
}
