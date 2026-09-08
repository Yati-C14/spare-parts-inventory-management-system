import { useEffect, useState } from "react";
import { getTransactions } from "./services/api";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("Failed to fetch transactions");
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    if (loading) return <h2>Loading transactions...</h2>;
    if (error) return <h2>{error}</h2>;
    return (
        <div>
            <h1>Transactions</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Transaction Type</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Transaction Date</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.product}</td>
                            <td>{transaction.quantity}</td>
                            <td>{transaction.transaction_date}</td>
                            <td>{transaction.notes || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;