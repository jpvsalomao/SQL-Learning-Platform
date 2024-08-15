let editors = {};

export function generateQuizHTML(currentQuestionSet) {
    let html = "";
    currentQuestionSet.forEach(question => {
        html += `
            <div class="question">
                <h2>Question ${question.id} <span class="difficulty ${question.difficulty}">(${question.difficulty})</span></h2>
                ${question.tables.map(generateTableHTML).join("")}
                <p>${question.question}</p>
                <textarea id="input-${question.id}"></textarea>
                <button onclick="runQuery(${question.id})">Run Query</button>
                <button onclick="checkAnswer(${question.id})">Submit Answer</button>
                <button id="tip-btn-${question.id}" onclick="getTip(${question.id})">Get Tip</button>
                <div id="tips-${question.id}" class="tips"></div>
                <div id="output-${question.id}" class="output"></div>
            </div>
        `;
    });
    html += '<button onclick="returnToNavigation()">Return to Navigation</button>';
    document.getElementById("quiz-container").innerHTML = html;

    currentQuestionSet.forEach(question => {
        editors[question.id] = CodeMirror.fromTextArea(document.getElementById(`input-${question.id}`), {
            mode: 'text/x-sql',
            theme: 'monokai',
            lineNumbers: true,
            autofocus: true,
            lineWrapping: true
        });
    });
}

function generateTableHTML(table) {
    let html = `<h3>${table.name}</h3><table border="1"><tr>`;
    table.columns.forEach(column => {
        html += `<th>${column}</th>`;
    });
    html += "</tr>";
    table.data.forEach(row => {
        html += "<tr>";
        row.forEach(cell => {
            html += `<td>${cell}</td>`;
        });
        html += "</tr>";
    });
    html += "</table>";
    return html;
}

export function returnToNavigation() {
    document.getElementById('navigation-container').classList.remove('hidden');
    document.getElementById('quiz-container').classList.add('hidden');
}

export function getEditorValue(questionId) {
    return editors[questionId].getValue().trim();
}

export function setOutputValue(questionId, value) {
    document.getElementById(`output-${questionId}`).textContent = value;
}

export function getTip(questionId, question) {
    const tipsElement = document.getElementById(`tips-${questionId}`);
    const tipButton = document.getElementById(`tip-btn-${questionId}`);
    const tipCount = (tipsElement.childElementCount || 0) + 1;

    if (tipCount <= 3) {
        const tipParagraph = document.createElement('p');
        tipParagraph.textContent = `Tip ${tipCount}: ${question.tips[tipCount - 1]}`;
        tipsElement.appendChild(tipParagraph);

        if (tipCount === 3) {
            tipButton.textContent = "Show Answer";
        }
    } else {
        tipsElement.innerHTML += `<p><strong>Answer: ${question.answer}</strong></p>`;
        tipButton.disabled = true;
    }
}