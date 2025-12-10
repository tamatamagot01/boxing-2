import React from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiClock, FiActivity } from 'react-icons/fi'

const features = [
    {
        title: 'Expert Trainers',
        description:
            'Learn from professional fighters and certified coaches who are dedicated to your progress.',
        icon: <FiUsers className="w-8 h-8 text-[#2feaa8]" />,
    },
    {
        title: 'Flexible Schedule',
        description:
            'Classes available morning, evening, and weekends to fit your busy lifestyle.',
        icon: <FiClock className="w-8 h-8 text-[#0eb9ce]" />,
    },
    {
        title: 'Modern Facilities',
        description:
            'Train with top-tier equipment in a clean, safe, and motivating environment.',
        icon: <FiActivity className="w-8 h-8 text-[#2feaa8]" />,
    },
]

const Features = () => {
    return (
        <section className="py-10 relative z-10 w-full">
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-colors text-left"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-gray-900/50 w-fit">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
