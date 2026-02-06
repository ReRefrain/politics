import React from 'react';
import { motion } from 'framer-motion';
import type { Question } from '../types';

interface QuestionCardProps {
    questionNumber: number;
    totalQuestions: number;
    question: Question;
    onAnswer: (multiplier: number) => void;
    onBack: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    questionNumber,
    totalQuestions,
    question,
    onAnswer,
    onBack,
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 max-w-2xl mx-auto w-full">
            <div className="w-full mb-8">
                <div className="text-gray-500 text-sm mb-2 font-semibold tracking-wider uppercase">
                    Question {questionNumber} of {totalQuestions}
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <motion.div
                key={question.question} // Triggers animation on change
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center w-full"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 leading-tight">
                    {question.question}
                </h2>

                <div className="grid gap-4 w-full max-w-md">
                    <AnswerButton
                        text="Strongly Agree"
                        color="bg-green-600 hover:bg-green-700"
                        onClick={() => onAnswer(1.0)}
                    />
                    <AnswerButton
                        text="Agree"
                        color="bg-green-500 hover:bg-green-600"
                        onClick={() => onAnswer(0.5)}
                    />
                    <AnswerButton
                        text="Neutral / Unsure"
                        color="bg-gray-400 hover:bg-gray-500"
                        onClick={() => onAnswer(0)}
                    />
                    <AnswerButton
                        text="Disagree"
                        color="bg-red-500 hover:bg-red-600"
                        onClick={() => onAnswer(-0.5)}
                    />
                    <AnswerButton
                        text="Strongly Disagree"
                        color="bg-red-600 hover:bg-red-700"
                        onClick={() => onAnswer(-1.0)}
                    />
                </div>

                <button
                    onClick={onBack}
                    className="mt-8 text-gray-400 hover:text-gray-600 text-sm font-medium transition"
                >
                    Back to previous question
                </button>
            </motion.div>
        </div>
    );
};

interface AnswerButtonProps {
    text: string;
    color: string;
    onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ text, color, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all ${color}`}
    >
        {text}
    </motion.button>
);

export default QuestionCard;
