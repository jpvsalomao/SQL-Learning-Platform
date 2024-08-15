export const stringFunctions = [
    {
        id: 1,
        difficulty: "easy",
        tables: [
            {
                name: "employees",
                columns: ["id", "name", "department", "salary"],
                data: [
                    [1, "John Doe", "Sales", 50000],
                    [2, "Jane Smith", "Marketing", 60000],
                    [3, "Bob Johnson", "IT", 70000],
                    [4, "Alice Brown", "Sales", 55000],
                    [5, "David Wilson", "Sales", 45000]
                ]
            }
        ],
        question: "Write a SQL query to extract the first name from the 'name' column.",
        answer: `
            SELECT SUBSTRING(name, 1, INSTR(name, ' ') - 1) as first_name
            FROM employees
        `,
        resultComparisonOptions: {
            ignoreColumnNames: true,
            approximateComparison: true
        },
        tips: [
            "Use the SUBSTRING() function to extract the first part of the name.",
            "Use the INSTR() function to find the position of the space in the name."
        ]
    },
    // Additional questions can be added here
];
