import { questions } from '../src/data/questions';
import { ideologies } from '../src/data/ideologies';

// Mock types locally since we are running in a standalone script context for quick testing
type Effect = {
    econ: number;
    dipl: number;
    govt: number;
    scty: number;
};

// Simulation function
function simulateQuiz() {
    console.log("Starting 8values Logic Verification...");
    console.log(`Loaded ${questions.length} questions.`);
    console.log(`Loaded ${ideologies.length} ideologies.`);

    // Scenario: Extremist Communist (Always answer strongly agree to Equality/State/Progress/World questions?)
    // Let's just answer "Strongly Agree" (1.0) to everything and see what we get.
    // This is a deterministic test.

    let userScore = { econ: 0, dipl: 0, govt: 0, scty: 0 };
    let maxScore = { econ: 0, dipl: 0, govt: 0, scty: 0 };

    for (const q of questions) {
        const multiplier = 1.0; // Strongly Agree
        const impact = q.effect;

        userScore.econ += impact.econ * multiplier;
        userScore.dipl += impact.dipl * multiplier;
        userScore.govt += impact.govt * multiplier;
        userScore.scty += impact.scty * multiplier;

        maxScore.econ += Math.abs(impact.econ);
        maxScore.dipl += Math.abs(impact.dipl);
        maxScore.govt += Math.abs(impact.govt);
        maxScore.scty += Math.abs(impact.scty);
    }

    const calc = (score: number, max: number) => {
        return Math.round(((score + max) / (2 * max)) * 1000) / 10;
    };

    const finalStats = {
        econ: calc(userScore.econ, maxScore.econ),
        dipl: calc(userScore.dipl, maxScore.dipl),
        govt: calc(userScore.govt, maxScore.govt),
        scty: calc(userScore.scty, maxScore.scty)
    };

    console.log("Final Mock Stats (All Strongly Agree):", finalStats);

    // Find Match
    let bestMatch = "";
    let minDistance = Infinity;

    for (const ideology of ideologies) {
        let dist = 0;
        dist += Math.pow(Math.abs(ideology.stats.econ - finalStats.econ), 2);
        dist += Math.pow(Math.abs(ideology.stats.dipl - finalStats.dipl), 2);
        dist += Math.pow(Math.abs(ideology.stats.govt - finalStats.govt), 2);
        dist += Math.pow(Math.abs(ideology.stats.scty - finalStats.scty), 2);

        if (dist < minDistance) {
            minDistance = dist;
            bestMatch = ideology.name;
        }
    }

    console.log(`Matched Ideology: ${bestMatch}`);
}

simulateQuiz();
