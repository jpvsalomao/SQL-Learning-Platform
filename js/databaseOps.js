let db;

export async function initSQLJS() {
    const SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
    });
    db = new SQL.Database();
}

export function setupDatabase(questions) {
    db.run("DROP TABLE IF EXISTS employees");
    db.run("DROP TABLE IF EXISTS orders");
    db.run("DROP TABLE IF EXISTS customers");
    db.run("DROP TABLE IF EXISTS products");
    db.run("DROP TABLE IF EXISTS sales");

    questions.forEach(question => {
        question.tables.forEach(table => {
            const columns = table.columns.join(', ');
            db.run(`CREATE TABLE ${table.name} (${columns})`);
            
            const placeholders = table.columns.map(() => '?').join(', ');
            const stmt = db.prepare(`INSERT INTO ${table.name} VALUES (${placeholders})`);
            table.data.forEach(row => stmt.run(row));
            stmt.free();
        });
    });
}

export function runQuery(query) {
    try {
        const results = db.exec(query);
        let output = "";
        if (results.length > 0) {
            results.forEach(result => {
                const columns = result.columns;
                const values = result.values;
                output += columns.join(" | ") + "\n";
                output += "-".repeat(columns.join(" | ").length) + "\n";
                values.forEach(row => {
                    output += row.join(" | ") + "\n";
                });
                output += "\n";
            });
        } else {
            output = "Query executed successfully, but returned no results.";
        }
        return output;
    } catch (error) {
        return "Error: " + error.message;
    }
}

export function executeQuery(query) {
    return db.exec(query);
}