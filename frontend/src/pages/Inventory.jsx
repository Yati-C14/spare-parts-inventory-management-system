import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

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
        <div>
            <h1>Inventory</h1>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Part Number</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Supplier</th>
                        <th>Quantity</th>
                        <th>Minimum stock</th>
                        <th>Stock Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.part_number}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.supplier}</td>
                            <td>{product.quantity}</td>
                            <td>{product.minimum_stock}</td>
                            <td>{product.stock_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Inventory;