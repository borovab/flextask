import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { supabase } from "../../supabase/supabaseClient"; 
import "./InventoryPage.css";

function InventoryPage() {
  const { jobsiteId } = useParams();
  const navigate = useNavigate();

  const [jobsiteName, setJobsiteName] = useState("");
  const [selectedService, setSelectedService] = useState(null); // <-- shtimi i këtij state

  useEffect(() => {
    const fetchJobsite = async () => {
      if (!jobsiteId) return;
      const { data, error } = await supabase
        .from("jobsites")
        .select("name")
        .eq("id", jobsiteId)
        .single();

      if (error) {
        console.error("Error fetching jobsite:", error);
      } else {
        setJobsiteName(data.name);
      }
    };

    fetchJobsite();
  }, [jobsiteId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${jobsiteName}"?`);
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("jobsites")
      .delete()
      .eq("id", jobsiteId);

    if (error) {
      alert("Failed to delete jobsite: " + error.message);
      console.error(error);
    } else {
      alert(`Jobsite "${jobsiteName}" deleted successfully.`);
      navigate(-1); // Shko prapa pasi fshihet
    }
  };

  return (
    <div className="inventory-wrapper">
      <div className="card-container">
        {/* Sidebar */}
        <div className="sidebar-card">
          <h5 className="sidebar-title">{jobsiteName || "Loading..."}</h5>
          <button className="sidebar-btn" onClick={() => setSelectedService("Sidewalk Shed")}>
            Sidewalk Shed
          </button>
          <button className="sidebar-btn" onClick={() => setSelectedService("Scaffold")}>
            Scaffold
          </button>

          <button className="delete-btn" onClick={handleDelete} style={{backgroundColor: "red", color: "white", marginTop: "10px"}}>
            Delete Jobsite
          </button>

          <button className="go-back-btn" onClick={() => navigate(-1)}>
            Go Back <span className="arrow">←</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="content-card">
          {!selectedService ? (
            <div className="no-service">
              <img
                src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
                alt="No service"
                className="no-service-img"
              />
              <h6>No Service Selected</h6>
              <p>Please select a service on your left to proceed.</p>
            </div>
          ) : (
            // Këtu mund të vendosësh listën që do shfaqet për secilin service
            <div>
              <h4>{selectedService}</h4>
              {/* Shembull tabela për "Sidewalk Shed" */}
             {selectedService === "Sidewalk Shed" && (
  <div className="table-container">
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Nr.</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>G42295</td><td>10</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>2</td><td>M721</td><td>83</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>3</td><td>M94796</td><td>31</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>4</td><td>S25907</td><td>47</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>5</td><td>A68446</td><td>52</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>6</td><td>F3786</td><td>10</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>7</td><td>R69895</td><td>30</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>8</td><td>A29259</td><td>32</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>9</td><td>A41878</td><td>16</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>10</td><td>A37244</td><td>13</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
        <tr><td>11</td><td>M89319</td><td>10</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td></tr>
      </tbody>
    </table>
  </div>
)}
              {/* Mund të shtosh për Scaffold një përmbajtje tjetër */}
              {selectedService === "Scaffold" && (
                <div>
                  {/* Përmbajtje për Scaffold */}
                  <p>Kjo është lista për Scaffold...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
