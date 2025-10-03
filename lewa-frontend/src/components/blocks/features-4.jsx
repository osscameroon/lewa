"use client"

import { Languages, Timer, Users, KeyboardIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Features() {
    return (
        <section className="py-12 md:py-24 bg-gray-50">
            <div className="mx-auto max-w-6xl px-6">
                {/* Two-column layout */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-10 items-center">
                    {/* Left side: header + subtitle */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl text-center md:text-left md:text-6xl font-medium text-gray-900 tracking-tight">
                            Why African Writing Systems Matter
                        </h2>
                        <p className="text-lg text-center md:text-left md:text-xl text-gray-600 tracking-tight">
                            African languages hold more than letters,{' '}
                            <span className="text-green-600 font-semibold">
                                history, art, and identity.
                            </span>
                            <br />
                            <br />
                            The African writing systems empower Africans to write their
                            languages accurately, preserving sounds and meanings often lost in
                            colonial scripts.
                        </p>
                    </motion.div>

                    {/* Right side: features grid */}
                    <motion.div
                        className="grid sm:grid-cols-2 gap-6 md:gap-20 tracking-tight"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Feature Card */}
                        <motion.div
                            className="flex flex-col md:w-[18rem] p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent transition-all duration-300"
                            variants={cardVariants}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Languages className="w-10 h-10" />
                                <h3 className="text-xl font-semibold">
                                    Linguistic Pride
                                </h3>
                            </div>
                            <p className="text-gray-700">
                                Reclaim the way your language should be written, embracing the
                                unique sounds and structures that make it truly yours.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col md:w-[18rem] p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent transition-all duration-300"
                            variants={cardVariants}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Timer className="w-10 h-10" />
                                <h3 className="text-xl font-semibold">
                                    Cultural Legacy
                                </h3>
                            </div>
                            <p className="text-gray-700">
                                Preserve and pass down traditional knowledge, stories, and
                                expressions in their authentic forms across generations.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col md:w-[18rem] p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent transition-all duration-300"
                            variants={cardVariants}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Users className="w-10 h-10" />
                                <h3 className="text-xl font-semibold">
                                    Community
                                </h3>
                            </div>
                            <p className="text-gray-700">
                                Engage with a vibrant community of learners and enthusiasts,
                                sharing insights and growing together in African script mastery.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col md:w-[18rem] p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-blue-500 transition-all duration-300"
                            variants={cardVariants}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <KeyboardIcon className="w-10 h-10" />
                                <h3 className="text-xl font-semibold">
                                    Practical Skills
                                </h3>
                            </div>
                            <p className="text-gray-700">
                                Develop practical skills such as typing, reading, and
                                pronunciation, enabling you to use African writing systems
                                confidently in daily life.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
