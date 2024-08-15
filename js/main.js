import { questionSets } from './questionSets.js';
import { generateQuizHTML, returnToNavigation, getEditorValue, setOutputValue, getTip } from './quizUI.js';
import { initSQLJS, setupDatabase, runQuery, executeQuery } from './databaseOps.js';
import { updateProgress, checkAnswer } from './progressTracker.js';

let currentQuestionSet = [];
let currentSet = '';

function init() {
    document.getElementById('user-name').textContent = "John Doe";
    document.getElementById('user-email').textContent = "john.doe@example.com";
    generateNavigationUI();  // Call to generate UI dynamically
    updateProgress();  // Update progress after UI is generated
}

async function initializeApp() {
    await initSQLJS();
    init();
}

function generateNavigationUI() {
    const buttonContainer = document.getElementById('question-set-buttons');
    console.log("Button container:", buttonContainer);  // Check if the container is found

    if (!buttonContainer) {
        console.error("Error: 'question-set-buttons' element not found.");
        return;  // Prevent further execution if container is not found
    }

    Object.keys(questionSets).forEach(setName => {
        console.log(`Creating button for ${setName}`);  // Log the setName
        const button = document.createElement('button');
        button.textContent = setName.replace(/_/g, ' ').toUpperCase();
        button.onclick = () => loadQuestionSet(setName);
        buttonContainer.appendChild(button);
    });
}

window.loadQuestionSet = function(setName) {
    currentSet = setName;
    currentQuestionSet = questionSets[setName];
    document.getElementById('navigation-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    setupDatabase(currentQuestionSet);
    generateQuizHTML(currentQuestionSet);
    updateProgress();
};

window.runQuery = function(questionId) {
    const userInput = getEditorValue(questionId);
    const output = runQuery(userInput);
    setOutputValue(questionId, output);
};

window.checkAnswer = function(questionId) {
    const question = currentQuestionSet.find(q => q.id === questionId);
    const userQuery = getEditorValue(questionId);
    
    try {
        const userResult = executeQuery(userQuery);
        const correctResult = executeQuery(question.answer);
        
        const result = checkAnswer(questionId, userResult, correctResult, question.resultComparisonOptions, currentSet);
        setOutputValue(questionId, result);
    } catch (error) {
        setOutputValue(questionId, "Error: " + error.message);
    }
};

window.returnToNavigation = returnToNavigation;

window.getTip = function(questionId) {
    const question = currentQuestionSet.find(q => q.id === questionId);
    getTip(questionId, question);
};

// Run the init function after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
