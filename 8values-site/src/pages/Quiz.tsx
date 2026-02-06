import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import { questions } from '../data/questions';
import type { Effect } from '../types';

interface QuizProps {
    onFinish: (resultStats: Effect) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onFinish }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userScore, setUserScore] = useState<Effect>({ econ: 0, dipl: 0, govt: 0, scty: 0 });
    const [maxScore, setMaxScore] = useState<Effect>({ econ: 0, dipl: 0, govt: 0, scty: 0 });
    const [history, setHistory] = useState<{ score: Effect, max: Effect }[]>([]);

    const handleAnswer = (multiplier: number) => {
        const question = questions[currentIndex];
        const impact = question.effect;

        const newScore = {
            econ: userScore.econ + impact.econ * multiplier,
            dipl: userScore.dipl + impact.dipl * multiplier,
            govt: userScore.govt + impact.govt * multiplier,
            scty: userScore.scty + impact.scty * multiplier,
        };

        const newMax = {
            econ: maxScore.econ + Math.abs(impact.econ),
            dipl: maxScore.dipl + Math.abs(impact.dipl),
            govt: maxScore.govt + Math.abs(impact.govt),
            scty: maxScore.scty + Math.abs(impact.scty),
        };

        setHistory([...history, { score: userScore, max: maxScore }]);
        setUserScore(newScore);
        setMaxScore(newMax);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const calc = (score: number, max: number) => {
                if (max === 0) return 50;
                return Math.round(((score + max) / (2 * max)) * 1000) / 10;
            };

            const finalResults: Effect = {
                econ: calc(newScore.econ, newMax.econ),
                dipl: calc(newScore.dipl, newMax.dipl),
                govt: calc(newScore.govt, newMax.govt),
                scty: calc(newScore.scty, newMax.scty)
            };

            onFinish(finalResults);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            const lastState = history[history.length - 1];
            setUserScore(lastState.score);
            setMaxScore(lastState.max);
            setHistory(history.slice(0, -1));
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <QuestionCard
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            onBack={handleBack}
        />
    );
};

export default Quiz;
