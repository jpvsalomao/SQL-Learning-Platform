// advanced.js
export const advanced = [
    {
        id: 3,
        difficulty: "hard",
        tables: [
            {
                name: "products",
                columns: ["id", "name", "category", "price"],
                data: [
                    [1, "Laptop", "Electronics", 1000.00],
                    [2, "Smartphone", "Electronics", 500.00],
                    [3, "Desk Chair", "Furniture", 150.00],
                    [4, "Bookshelf", "Furniture", 200.00]
                ]
            },
            {
                name: "sales",
                columns: ["id", "product_id", "quantity", "sale_date"],
                data: [
                    [1, 1, 2, "2023-01-15"],
                    [2, 2, 3, "2023-01-16"],
                    [3, 3, 1, "2023-01-17"],
                    [4, 1, 1, "2023-01-18"]
                ]
            }
        ],
        question: "Write a SQL query to find the total revenue generated from 'Electronics' category products, along with the number of sales transactions.",
        answer: "SELECT SUM(p.price * s.quantity) as total_revenue, COUNT(s.id) as num_transactions FROM products p JOIN sales s ON p.id = s.product_id WHERE p.category = 'Electronics'",
        resultComparisonOptions: {
            ignoreColumnNames: true,
            approximateComparison: true
        },
        tips: [
            "Join the 'products' and 'sales' tables using the product_id.",
            "Use SUM and multiplication to calculate the total revenue.",
            "Use COUNT to get the number of sales transactions.",
            "Filter for 'Electronics' category in the WHERE clause."
        ]
    }
    // Add more advanced SQL questions here
];
