// src/components/InventoryPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router";

function InventoryPage() {
  const { jobsiteId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 border-end">
          <h5>262 3rd Avenue, New York</h5>
          <button className="btn btn-outline-primary w-100 mb-2">Sidewalk Shed</button>
          <button className="btn btn-outline-primary w-100">Scaffold</button>
          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>← Go Back</button>
        </div>
        <div className="col-md-9 text-center">
          <img src="https://cdn-icons-png.flaticon.com/512/679/679720.png" alt="No service" width="120" />
          <p className="mt-3">No Service Selected <br /> Please select a service on your left to proceed.</p>
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
