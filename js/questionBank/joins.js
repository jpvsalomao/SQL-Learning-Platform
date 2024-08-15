// joins.js
export const joins = [
    {
        id: 2,
        difficulty: "medium",
        tables: [
            {
                name: "orders",
                columns: ["id", "customer_id", "order_date", "total_amount"],
                data: [
                    [1, 101, "2023-01-15", 150.00],
                    [2, 102, "2023-01-16", 200.00],
                    [3, 101, "2023-01-20", 100.00],
                    [4, 103, "2023-01-22", 300.00]
                ]
            },
            {
                name: "customers",
                columns: ["id", "name", "email"],
                data: [
                    [101, "Alice Johnson", "alice@example.com"],
                    [102, "Bob Smith", "bob@example.com"],
                    [103, "Charlie Brown", "charlie@example.com"]
                ]
            }
        ],
        question: "Write a SQL query to find the total amount of orders for each customer, along with their name and email.",
        answer: "SELECT c.name, c.email, SUM(o.total_amount) as total_orders FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.id",
        resultComparisonOptions: {
            ignoreColumnNames: true,
            approximateComparison: true,
            
        },
        tips: [
            "Use a JOIN to combine the customers and orders tables.",
            "Group the results by customer ID to get totals for each customer.",
            "Use SUM to calculate the total order amount for each customer."
        ]
    }
    // Add more SQL join questions here
];
