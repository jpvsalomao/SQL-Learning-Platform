export const subqueries = [
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
                    [4, "Alice Brown", "Sales", 55000]
                ]
            }
        ],
        question: "Write a SQL query to find the name of employees earning more than the average salary.",
        answer: "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)",
        resultComparisonOptions: {
            ignoreColumnNames: true,
            approximateComparison: true
        },
        tips: [
            "Use a subquery to calculate the average salary.",
            "Filter the employees whose salary is greater than the calculated average."
        ]
    },
    // Add more questions here
];
