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

        // Create objects with column names as keys for each row
        const userRows = userValues.map(row => 
            Object.fromEntries(userResult[i].columns.map((col, index) => [col, row[index]])));
        const correctRows = correctValues.map(row => 
            Object.fromEntries(correctResult[i].columns.map((col, index) => [col, row[index]])));

        // Compare rows
        for (let j = 0; j < userRows.length; j++) {
            const userRow = userRows[j];
            const correctRow = correctRows[j];

            if (!compareRows(userRow, correctRow, options)) {
                return false;
            }
        }
    }

    return true;
}

function compareRows(userRow, correctRow, options) {
    const userKeys = Object.keys(userRow);
    const correctKeys = Object.keys(correctRow);

    if (userKeys.length !== correctKeys.length) {
        return false;
    }

    for (let key of correctKeys) {
        if (!userRow.hasOwnProperty(key)) {
            return false;
        }

        const userValue = userRow[key];
        const correctValue = correctRow[key];

        if (options.approximateComparison && typeof userValue === 'number' && typeof correctValue === 'number') {
            if (Math.abs(userValue - correctValue) > 0.001) {
                return false;
            }
        } else if (userValue !== correctValue) {
            return false;
        }
    }

    return true;
}
