import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../../supabase/supabaseClient";
import "./InventoryPage.css";

function InventoryPage() {
  const { jobsiteId } = useParams();
  const navigate = useNavigate();

  const [jobsiteName, setJobsiteName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    item_code: "",
    quantity: "",
    description: "",
    notes: "",
  });

  const [editingItem, setEditingItem] = useState(null);

  // Fetch jobsite name
  useEffect(() => {
    const fetchJobsite = async () => {
      if (!jobsiteId) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("jobsites")
          .select("name")
          .eq("id", jobsiteId)
          .single();

        if (error) throw error;
        setJobsiteName(data.name);
      } catch (error) {
        console.error("Error fetching jobsite:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobsite();
  }, [jobsiteId]);

  // Fetch items when category is selected
  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedCategory) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("inventory_items")
          .select("*")
          .eq("jobsite_id", jobsiteId)
          .eq("category", selectedCategory);

        if (error) throw error;
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory, jobsiteId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveItem = async () => {
    if (!formData.item_code || !formData.quantity) {
      alert("Please fill in required fields (Item and Quantity)");
      return;
    }

    setIsLoading(true);
    try {
      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from("inventory_items")
          .update({
            item_code: formData.item_code,
            quantity: parseInt(formData.quantity),
            description: formData.description,
            notes: formData.notes,
          })
          .eq("id", editingItem.id);

        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase.from("inventory_items").insert([
          {
            jobsite_id: jobsiteId,
            category: selectedCategory,
            item_code: formData.item_code,
            quantity: parseInt(formData.quantity),
            description: formData.description,
            notes: formData.notes,
          },
        ]);

        if (error) throw error;
      }

      // Reset form
      setFormData({ item_code: "", quantity: "", description: "", notes: "" });
      setEditingItem(null);
      setShowModal(false);

      // Re-fetch items
      const { data } = await supabase
        .from("inventory_items")
        .select("*")
        .eq("jobsite_id", jobsiteId)
        .eq("category", selectedCategory);
      setItems(data);
    } catch (error) {
      alert("Error saving item: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      item_code: item.item_code,
      quantity: item.quantity,
      description: item.description || "",
      notes: item.notes || "",
    });
    setShowModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("inventory_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      alert("Failed to delete item: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${jobsiteName}" and all its inventory items? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      // First delete all inventory items
      const { error: itemsError } = await supabase
        .from("inventory_items")
        .delete()
        .eq("jobsite_id", jobsiteId);

      if (itemsError) throw itemsError;

      // Then delete the jobsite
      const { error: jobsiteError } = await supabase
        .from("jobsites")
        .delete()
        .eq("id", jobsiteId);

      if (jobsiteError) throw jobsiteError;

      navigate("/jobsites");
    } catch (error) {
      alert("Failed to delete jobsite: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inventory-container">
      {/* Sidebar Navigation */}
      <div className="inventory-sidebar">
        <div className="sidebar-header">
          <h2 className="jobsite-title">{jobsiteName || "Loading..."}</h2>
        
        </div>

        <nav className="category-nav">
          <button
            className={`category-btn ${
              selectedCategory === "Sidewalk Shed" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Sidewalk Shed")}
          >
            Sidewalk Shed
          </button>
          <button
            className={`category-btn ${
              selectedCategory === "Scaffold" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Scaffold")}
          >
            Scaffold
          </button>
        </nav>

        <div className="sidebar-footer">
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Jobsite"}
          </button>
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            ← Back to Jobsites
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="inventory-content">
        {selectedCategory ? (
          <>
            <div className="content-header">
              <h2 className="content-title">
                {selectedCategory} Inventory
                <span className="item-count">{items.length} items</span>
              </h2>
              <button
                className="add-item-btn"
                onClick={() => {
                  setEditingItem(null);
                  setFormData({ item_code: "", quantity: "", description: "", notes: "" });
                  setShowModal(true);
                }}
                disabled={isLoading}
              >
                <span className="btn-icon">+</span> Add New Item
              </button>
            </div>

            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading inventory items...</p>
              </div>
            ) : items.length > 0 ? (
              <div className="inventory-table-container">
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item Code</th>
                      <th>Quantity</th>
                      <th>Description</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="item-code">{item.item_code}</td>
                        <td>
                          <span
                            className={`quantity-badge ${
                              item.quantity > 0 ? "in-stock" : "out-of-stock"
                            }`}
                          >
                            {item.quantity}
                          </span>
                        </td>
                        <td className="item-description">
                          {item.description || "-"}
                        </td>
                        <td className="item-notes">{item.notes || "-"}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="edit-btn"
                              onClick={() => handleEditItem(item)}
                              disabled={isLoading}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteItem(item.id)}
                              disabled={isLoading}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <h3>No Items Found</h3>
                <p>This category doesn't have any inventory items yet.</p>
                <button
                  className="add-item-btn"
                  onClick={() => {
                    setEditingItem(null);
                    setFormData({ item_code: "", quantity: "", description: "", notes: "" });
                    setShowModal(true);
                  }}
                  disabled={isLoading}
                >
                  <span className="btn-icon">+</span> Add Your First Item
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="welcome-state">
            <h3>Welcome to {jobsiteName}</h3>
            <p>
              Please select a category from the sidebar to view or manage
              inventory.
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Item Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container modal--sheet">
            <div className="modal-header">
              <h3>{editingItem ? "Edit Item" : "Add New Item"}</h3>
              <button
                className="modal-close-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                }}
                disabled={isLoading}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              {/* Info row */}
              <div className="modal-info">
                <div className="modal-info__icon" aria-hidden>
                  i
                </div>
                <div className="modal-info__text">
                  {editingItem
                    ? "You can edit this inventory item here."
                    : "Fill out the form to add a new inventory item."}
                </div>
              </div>

              {/* Item / Quantity */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="item_code">Item</label>
                  <input
                    id="item_code"
                    name="item_code"
                    type="text"
                    value={formData.item_code}
                    onChange={handleFormChange}
                    placeholder="Search & Select item"
                    required
                    autoComplete="off"
                    className="field--soft"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={handleFormChange}
                    placeholder="Set Quantity"
                    required
                    className="field--soft"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Type the description..."
                  className="field--soft"
                />
              </div>

              {/* Notes */}
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="2"
                  value={formData.notes}
                  onChange={handleFormChange}
                  placeholder="Type a note..."
                  className="field--soft"
                />
              </div>
            </div>

            <div className="modal-footer modal-footer--spaced">
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="save-btn save-btn--check"
                onClick={handleSaveItem}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>{" "}
                    {editingItem ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    {editingItem ? "Update Item" : "Save Changes"}{" "}
                    <span className="checkmark" aria-hidden>✓</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryPage;
