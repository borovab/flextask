import React, { useState } from "react";
import "./JobsiteModal.css";

function JobsiteModal({ closeModal, addJobsite }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !status) return alert("Please fill all required fields!");

    setLoading(true);

    // Përgatit të dhënat për Supabase
    const newJobsite = {
      name,
      status,
      category,
    };

    const success = await addJobsite(newJobsite);

    setLoading(false);

    if (success) {
      closeModal();
    } else {
      alert("Error adding jobsite. Try again.");
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h5>Title</h5>
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
        </div>

        <div className="custom-modal-info">
          <span className="info-icon">i</span>
          <span>Informative piece of text that can be used regarding this modal.</span>
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Type the jobsite's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category Included</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select</option>
              <option value="Category A">Category A</option>
              <option value="Category B">Category B</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select one</option>
              <option value="On Road">On Road</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn cancel" onClick={closeModal}>
            Cancel Changes <span>❌</span>
          </button>
          <button className="btn save" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"} <span>✅</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobsiteModal;
