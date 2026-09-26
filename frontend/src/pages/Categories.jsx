import {useEffect, useState} from "react";
import {getCategories} from "../services/api";
import "./Categories.css"; // Imports the CSS file for styling

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return <h2>Loading categories...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    
        return (
  <div className="categories-page">

    <div className="categories-header">
      <div>
        <h1>Categories</h1>
        <p>Manage spare parts by category</p>
      </div>

      <div className="category-count">
        <span>{categories.length}</span>
        <small>Total Categories</small>
      </div>
    </div>

    <div className="categories-card">

      <table className="categories-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>

                <td className="category-id">
                  #{category.id}
                </td>

                <td className="category-name">
                  {category.name}
                </td>

                <td className="category-description">
                  {category.description || "No description available"}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="empty-categories">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>

  </div>
);
    
}
export default Categories;