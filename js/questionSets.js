import { basics } from './questionBank/basics.js';
import { joins } from './questionBank/joins.js';
import { advanced } from './questionBank/advanced.js';
import { subqueries } from './questionBank/subqueries.js';
import { windowFunctions } from './questionBank/windowFunctions.js';  // New Import
import { aggregateFunctions} from './questionBank/aggregateFunctions.js';  // New Import
import { stringFunctions } from './questionBank/stringFunctions.js';  // Import the new question set


// Add more imports as you add new question sets

export const questionSets = {
    basics,
    joins,
    advanced,
    subqueries,
    windowFunctions,
    aggregateFunctions,
    stringFunctions
    // Add new question sets here
    
};

