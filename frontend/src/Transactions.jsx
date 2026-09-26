import { useEffect, useState } from "react";
import { getTransactions } from "./services/api";
import "./Transactions.css"; // Imports the CSS file for styling

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
  <div className="transactions-page">
    <div className="transactions-header">
      <div>
        <h1>Transactions</h1>
        <p>Track spare parts inventory movements</p>
      </div>

      <div className="transactions-count">
        <span>{transactions.length}</span>
        <small>Total Transactions</small>
      </div>
    </div>

    <div className="transactions-card">
      <div className="transactions-table-wrapper">
        <table className="transactions-table">
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
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="transaction-id">
                    #{transaction.id}
                  </td>

                  <td>
                    <span className="transaction-type-badge">
                      {transaction.transaction_type}
                    </span>
                  </td>

                  <td className="transaction-product">
                    Product #{transaction.product_id}
                  </td>

                  <td className="transaction-quantity">
                    {transaction.quantity}
                  </td>

                  <td>
                    {transaction.transaction_date
  ? new Date(transaction.transaction_date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  : "N/A"}
                  </td>

                  <td className="transaction-notes">
                    {transaction.notes || "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-transactions">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default Transactions;