// src/components/JobsiteModal.jsx
import React, { useState } from "react";

function JobsiteModal({ closeModal, setJobSites }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("On Road");

  const handleSave = () => {
    setJobSites(prev => [...prev, {
      id: Date.now(),
      name,
      status
    }]);
    closeModal();
  };

  return (
    <div className="modal-backdrop show">
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <h5>Title</h5>
            <p><i>Informative piece of text that can be used regarding this modal.</i></p>
            <input className="form-control mb-2" placeholder="Jobsite name" onChange={e => setName(e.target.value)} />
            <select className="form-select mb-2" onChange={e => setStatus(e.target.value)}>
              <option value="On Road">On Road</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
            <div className="d-flex justify-content-between">
              <button className="btn btn-danger" onClick={closeModal}>Cancel Changes ❌</button>
              <button className="btn btn-success" onClick={handleSave}>Save Changes ✅</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsiteModal;
