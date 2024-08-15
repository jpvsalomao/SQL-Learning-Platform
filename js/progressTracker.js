import { stringFunctions } from './questionBank/stringFunctions.js';
import { questionSets } from './questionSets.js';

let progressTracker = {
    basics: new Set(),
    joins: new Set(),
    advanced: new Set(),
    subqueries: new Set(),
    windowFunctions: new Set(),  // Ensure these match your question sets
    aggregateFunctions: new Set(),  // New question set entry
    stringFunctions: new Set()  // New question set entry
};

export function updateProgress() {
    const totalQuestions = Object.keys(questionSets).reduce((total, set) => total + questionSets[set].length, 0);
    const completedQuestions = Object.values(progressTracker).reduce((total, set) => total + set.size, 0);
    
    document.getElementById('completed-questions').textContent = completedQuestions;
    document.getElementById('total-questions').textContent = totalQuestions;

    // Update progress for each set
    Object.keys(questionSets).forEach(set => {
        const setProgress = progressTracker[set].size;
        const setTotal = questionSets[set].length;
        document.getElementById(`progress-${set}`).textContent = `${setProgress}/${setTotal}`;
    });
}

export function checkAnswer(questionId, userResult, correctResult, options, currentSet) {
    if (compareResults(userResult, correctResult, options)) {
        if (!progressTracker[currentSet].has(questionId)) {
            progressTracker[currentSet].add(questionId);
            updateProgress();
        }
        return "Correct! Well done.";
    } else {
        return "Incorrect. The results don't match the expected output.";
    }
}

function compareResults(userResult, correctResult, options = {}) {
    if (userResult.length !== correctResult.length) {
        return false;
    }

    for (let i = 0; i < userResult.length; i++) {
        const userValues = userResult[i].values;
        const correctValues = correctResult[i].values;

        if (userValues.length !== correctValues.length) {
            return false;
        }

        for (let j = 0; j < userValues.length; j++) {
            const userRow = userValues[j];
            const correctRow = correctValues[j];

            if (userRow.length !== correctRow.length) {
                return false;
            }

            for (let k = 0; k < userRow.length; k++) {
                if (options.approximateComparison && typeof userRow[k] === 'number' && typeof correctRow[k] === 'number') {
                    if (Math.abs(userRow[k] - correctRow[k]) > 0.001) {
                        return false;
                    }
                } else if (userRow[k] !== correctRow[k]) {
                    return false;
                }
            }
        }
    }

    return true;
}
