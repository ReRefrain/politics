import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ideologies } from '../data/ideologies';
import type { Effect } from '../types';

interface ResultsProps {
    stats: Effect;
    onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ stats, onRestart }) => {
    const [matchedIdeology, setMatchedIdeology] = useState<string>("");

    useEffect(() => {
        let bestMatch = "";
        let minDistance = Infinity;

        for (const ideology of ideologies) {
            let dist = 0;
            dist += Math.pow(Math.abs(ideology.stats.econ - stats.econ), 2);
            dist += Math.pow(Math.abs(ideology.stats.dipl - stats.dipl), 2);
            dist += Math.pow(Math.abs(ideology.stats.govt - stats.govt), 2);
            dist += Math.pow(Math.abs(ideology.stats.scty - stats.scty), 2);

            if (dist < minDistance) {
                minDistance = dist;
                bestMatch = ideology.name;
            }
        }
        setMatchedIdeology(bestMatch);
    }, [stats]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 rounded-2xl shadow-xl w-full text-center"
            >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Results</h1>
                <h2 className="text-2xl font-light text-gray-600 mb-8">
                    Closest Match: <span className="font-bold text-blue-600">{matchedIdeology}</span>
                </h2>

                <div className="space-y-6 mb-10">
                    <AxisRow label="Economic" left="Equality" right="Markets" val={stats.econ} color="econ" />
                    <AxisRow label="Diplomatic" left="Nation" right="World" val={stats.dipl} color="dipl" />
                    <AxisRow label="Civil" left="Liberty" right="Authority" val={stats.govt} color="govt" />
                    <AxisRow label="Societal" left="Tradition" right="Progress" val={stats.scty} color="scty" />
                </div>

                <button
                    onClick={onRestart}
                    className="btn-primary"
                >
                    Restart Test
                </button>
            </motion.div>
        </div>
    );
};

const AxisRow = ({ label, left, right, val, color }: { label: string, left: string, right: string, val: number, color: string }) => {
    // Helper for specific colors
    let leftColor = 'bg-gray-400';
    let rightColor = 'bg-gray-400';
    let leftVal = val;
    let rightVal = 100 - val;

    if (color === 'econ') { // Equality vs Markets
        leftColor = 'bg-red-500'; // Equality
        rightColor = 'bg-teal-600'; // Markets
    } else if (color === 'dipl') { // Nation vs World
        leftColor = 'bg-orange-500'; // Nation
        rightColor = 'bg-blue-400'; // World
        // My val is World %. Left (Nation) should be 100 - val.
        leftVal = 100 - val;
        rightVal = val;
    } else if (color === 'govt') { // Liberty vs Authority
        leftColor = 'bg-yellow-400'; // Liberty
        rightColor = 'bg-indigo-600'; // Authority
    } else if (color === 'scty') { // Tradition vs Progress
        leftColor = 'bg-green-500'; // Tradition
        rightColor = 'bg-purple-500'; // Progress
        // My val is Progress %. Left (Tradition) = 100 - val.
        leftVal = 100 - val;
        rightVal = val;
    }

    return (
        <div className="w-full">
            <h3 className="text-left font-semibold text-gray-500 mb-1">{label} Axis: {val > 50 ? right : left}</h3>
            <div className="flex justify-between text-lg font-bold mb-1">
                <span className="text-gray-700">{left}</span>
                <span className="text-gray-700">{right}</span>
            </div>
            <div className="flex w-full h-8 rounded-full overflow-hidden shadow-inner bg-gray-200">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${leftVal}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full flex items-center justify-end pr-2 text-white text-sm font-bold ${leftColor}`}
                >
                    {leftVal.toFixed(1)}%
                </motion.div>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rightVal}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className={`h-full flex items-center justify-start pl-2 text-white text-sm font-bold ${rightColor}`}
                >
                    {rightVal.toFixed(1)}%
                </motion.div>
            </div>
        </div>
    );
}

export default Results;
