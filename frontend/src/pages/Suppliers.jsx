import { useEffect, useState } from "react";
import { getSuppliers } from "../services/api";

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const data = await getSuppliers();
                setSuppliers(data);
            } catch (err) {
                console.error("Error fetching suppliers:", err);
                setError("Failed to fetch suppliers");
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) return <h2>Loading suppliers...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div>
            <h1>Suppliers</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.phone || "N/A"}</td>
                            <td>{supplier.email || "N/A"}</td>
                            <td>{supplier.address || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Suppliers;