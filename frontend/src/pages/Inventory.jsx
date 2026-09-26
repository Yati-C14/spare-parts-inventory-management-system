import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import './Inventory.css';

function Inventory() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            }
            catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) {
        return <h2>Loading Inventory...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    
       return (
  <div className="inventory-page">

    <div className="inventory-header">
      <div>
        <h1>Inventory</h1>
        <p>Manage and monitor spare parts stock</p>
      </div>

      <div className="inventory-count">
        <span>{products.length}</span>
        <small>Total Parts</small>
      </div>
    </div>

    <div className="inventory-card">

      <div className="table-wrapper">
        <table className="inventory-table">

          <thead>
            <tr>
              <th>Part Number</th>
              <th>Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Quantity</th>
              <th>Minimum Stock</th>
              <th>Stock Status</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>

                  <td className="part-number">
                    {product.part_number}
                  </td>

                  <td className="product-name">
                    {product.name}
                  </td>

                  <td>
                    <span className="category-badge">
                      {product.category}
                    </span>
                  </td>

                  <td>
                    {product.supplier}
                  </td>

                  <td className="quantity">
                    {product.quantity}
                  </td>

                  <td>
                    {product.minimum_stock}
                  </td>

                  <td>
                    <span
                      className={`stock-badge ${
                        product.stock_status
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")
                      }`}
                    >
                      {product.stock_status}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-inventory">
                  No inventory records found.
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

export default Inventory;