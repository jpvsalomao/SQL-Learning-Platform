import { stringFunctions } from './questionBank/stringFunctions.js';
import { questionSets } from './questionSets.js';

let progressTracker = {
    basics: new Set(),
    joins: new Set(),
    advanced: new Set(),
    subqueries: new Set(),
    windowFunctions: new Set(),
    aggregateFunctions: new Set(),
    stringFunctions: new Set()
};

export function updateProgress() {
    const totalQuestions = Object.keys(questionSets).reduce((total, set) => total + questionSets[set].length, 0);
    const completedQuestions = Object.values(progressTracker).reduce((total, set) => total + set.size, 0);
    
    document.getElementById('completed-questions').textContent = completedQuestions;
    document.getElementById('total-questions').textContent = totalQuestions;

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

        const userRows = userValues.map(row => row.map(String));
        const correctRows = correctValues.map(row => row.map(String));

        for (let j = 0; j < userRows.length; j++) {
            if (!compareRows(userRows[j], correctRows[j], options)) {
                return false;
            }
        }
    }

    return true;
}

function compareRows(userRow, correctRow, options) {
    if (userRow.length !== correctRow.length) {
        return false;
    }

    const sortedUserRow = [...userRow].sort();
    const sortedCorrectRow = [...correctRow].sort();

    for (let i = 0; i < sortedUserRow.length; i++) {
        const userValue = sortedUserRow[i];
        const correctValue = sortedCorrectRow[i];

        if (options.approximateComparison && !isNaN(userValue) && !isNaN(correctValue)) {
            if (Math.abs(parseFloat(userValue) - parseFloat(correctValue)) > 0.001) {
                return false;
            }
        } else if (userValue !== correctValue) {
            return false;
        }
    }

    return true;
}
