import React from 'react';
import { motion } from 'framer-motion';

interface LandingProps {
    onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
            >
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    8values Political Test
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    8values is, in essence, a political quiz that attempts to assign percentages for eight different political values. You will be presented by a statement, and then you will answer with your opinion on the statement, from <b>Strongly Agree</b> to <b>Strongly Disagree</b>, with each answer slightly affecting your scores.
                </p>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
                    <h2 className="text-2xl font-bold mb-4">Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-val-econ rounded-full"></div><span>Equality vs. Markets</span></div>
                        <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-val-dipl rounded-full"></div><span>Nation vs. World</span></div>
                        <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-val-govt rounded-full"></div><span>Liberty vs. Authority</span></div>
                        <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-val-scty rounded-full"></div><span>Tradition vs. Progress</span></div>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="btn-primary text-xl px-12 py-4 rounded-full shadow-lg"
                >
                    Click here to start!
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Landing;
