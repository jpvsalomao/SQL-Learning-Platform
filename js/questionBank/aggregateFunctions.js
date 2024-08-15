export const aggregateFunctions = [
    {
        id: 1,
        difficulty: "medium",
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
        question: "Write a SQL query to find the total salary paid to employees in each department.",
        answer: `
            SELECT department, SUM(salary) as total_salary
            FROM employees
            GROUP BY department
        `,
        resultComparisonOptions: {
            ignoreColumnNames: true,
            approximateComparison: true
        },
        tips: [
            "Use the SUM() function to calculate the total salary.",
            "Group the results by department using the GROUP BY clause.",
            "Select the department and the total salary for each department."
        ]
    },
    // Add more questions here if needed
];
