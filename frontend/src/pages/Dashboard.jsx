import {useEffect, useState} from 'react';
import {getProducts,getSuppliers,getCategories,getTransactions} from '../services/api';
import './Dashboard.css';


function Dashboard() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [productsData, suppliersData, categoriesData, transactionsData] = await Promise.all([
                    getProducts(),
                    getSuppliers(),
                    getCategories(),
                    getTransactions(),
                ]);

                setProducts(productsData);
                setSuppliers(suppliersData);
                setCategories(categoriesData);
                setTransactions(transactionsData);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);
    const lowStockProducts = products.filter(product => product.quantity <= product.minimum_stock);
    if (loading) {
        return <h2>Loading Dashboard...</h2>
    }

    return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Spare Parts Inventory Management System</h1>
          <p className="dashboard-subtitle">Overview of your spare parts inventory</p>
        </div>
      </div>

      {/* Statistics Cards */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div>
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <div>
            <p>Categories</p>
            <h2>{categories.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div>
            <p>Suppliers</p>
            <h2>{suppliers.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div>
            <p>Transactions</p>
            <h2>{transactions.length}</h2>
          </div>
        </div>

        <div className="stat-card warning-card">
          <div className="stat-icon">⚠️</div>
          <div>
            <p>Low Stock Items</p>
            <h2>{lowStockProducts.length}</h2>
          </div>
        </div>

      </div>


      {/* Lower Dashboard Section */}

      <div className="dashboard-content">

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Low Stock Items</h2>
            <span>{lowStockProducts.length} items</span>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="empty-message">
              All products are sufficiently stocked 🎉
            </p>
          ) : (
            <div className="low-stock-list">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div
                  className="low-stock-item"
                  key={product.id}
                >
                  <div>
                    <strong>{product.name}</strong>
                    <p>{product.part_number}</p>
                  </div>

                  <div className="stock-quantity">
                    {product.quantity} left
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Transactions</h2>
            <span>{transactions.length} total</span>
          </div>

          {transactions.length === 0 ? (
            <p className="empty-message">
              No transactions recorded yet.
            </p>
          ) : (
            <div className="transaction-list">
              {transactions
                .slice(0, 5)
                .map((transaction) => (
                  <div
                    className="transaction-item"
                    key={transaction.id}
                  >
                    <div>
                      <strong>
                        {transaction.transaction_type}
                      </strong>

                      <p>
                        Product ID: {transaction.product}
                      </p>
                    </div>

                    <div>
                      <strong>
                        {transaction.quantity}
                      </strong>

                      <p>
                        {transaction.transaction_date}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;