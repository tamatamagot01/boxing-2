import { cloneElement } from 'react'
import type { CommonProps } from '@/@types/common'
import Logo from '@/components/template/Logo'

type SideProps = CommonProps

const Side = ({ children, ...rest }: SideProps) => {
    return (
        <div className="flex h-full p-6 bg-white dark:bg-gray-800">
            <div className=" flex flex-col justify-center items-center flex-1">
                <div className="w-full xl:max-w-[450px] px-8 max-w-[380px]">
                    {children
                        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          cloneElement(children as React.ReactElement<any>, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
            <div className="lg:flex flex-col flex-1 justify-center items-center hidden rounded-3xl relative max-w-[520px] 2xl:max-w-[720px] bg-gray-900 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

                {/* Glow Effects */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-600/15 rounded-full blur-[80px]" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center px-12">
                    {/* Logo */}
                    <div className="mb-8 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <Logo
                            type="full"
                            mode="dark"
                            logoWidth={100}
                            logoHeight={100}
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white mb-3">
                        Income Muaythai
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-400 text-base mb-8 max-w-xs">
                        Management System for Modern Gyms
                    </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            </div>
        </div>
    )
}

export default Side
