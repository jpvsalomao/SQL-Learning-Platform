// basics.js
export const basics = [
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
                    [4, "Alice Brown", "Sales", 55000]
                ]
            }
        ],
        question: "Write a SQL query to find the average salary of employees in the Sales department.",
        answer: "SELECT AVG(salary) FROM employees WHERE department = 'Sales'",
        resultComparisonOptions: {
            ignoreColumnNames: true,
            approximateComparison: true
        },
        tips: [
            "Use the AVG function to calculate the average salary.",
            "Filter the results to include only the Sales department using a WHERE clause.",
            "The query should involve the 'employees' table, the 'salary' column, and the 'department' column."
        ]
    },
    
    {
        id: 2,  // Ensure this ID is unique within the basics array
        difficulty: "easy",
        tables: [
            {
                name: "employees2",
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
        question: "Write a SQL query to find the name and department of employees who work in the Sales department.",
        answer: `
            SELECT name, department
            FROM employees
            WHERE department = 'Sales'
        `,
        resultComparisonOptions: {
            ignoreColumnNames: true,
            approximateComparison: false
        },
        tips: [
            "Use the SELECT statement to choose the columns you want.",
            "Use the WHERE clause to filter the results to only those in the Sales department."
        ]
    }
    // Add more basic SQL questions here
];
