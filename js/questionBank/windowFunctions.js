export const windowFunctions = [
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
        question: "Write a SQL query to find the cumulative salary in the Sales department, ordered by salary.",
        answer: `
            SELECT name, salary, 
                   SUM(salary) OVER (ORDER BY salary) AS cumulative_salary
            FROM employees 
            WHERE department = 'Sales'
        `,
        resultComparisonOptions: {
            ignoreColumnNames: true,
            approximateComparison: true
        },
        tips: [
            "Use the SUM() function as a window function with the OVER clause.",
            "Order the results by salary using the ORDER BY clause inside the OVER().",
            "Filter the results to include only the Sales department."
        ]
    },
    // Additional questions can be added here
];
