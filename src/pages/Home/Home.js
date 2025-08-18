import React, { useState, useEffect } from "react";
import HeaderCards from "../../components/HeaderCards/HeaderCards";
import JobsiteTable from "../../components/JobsiteTable/JobsiteTable";
import JobsiteModal from "../../components/JobsiteModal/JobsiteModal";
import "./Home.css";
import { supabase } from "../../supabase/supabaseClient";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobSites, setJobSites] = useState([]);

  // Fetch jobsite data from supabase
  const fetchJobSites = async () => {
    const { data, error } = await supabase.from("jobsites").select("*");
    if (error) {
      console.error("Error fetching jobsites:", error);
    } else {
      setJobSites(data);
    }
  };

  useEffect(() => {
    fetchJobSites();
  }, []);

  // Filter jobSites based on search term
  const filteredJobSites = jobSites.filter((site) =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add jobsite to supabase
  const addJobsite = async (newJobsite) => {
    const { data, error } = await supabase.from("jobsites").insert([newJobsite]);
    if (error) {
      console.error("Error adding jobsite:", error);
      return false;
    } else {
      fetchJobSites(); // Refresh after insert
      return true;
    }
  };

  return (
    <div className="container mt-4 home-wrapper">
      <HeaderCards jobSites={jobSites} />

      <div className="d-flex justify-content-between align-items-center my-4 position-relative">
        <div>
          <h6 className="mb-2 fw-bold">Jobsites Overview</h6>
          <div className="info-box">
            <span className="info-icon">i</span>
            <span>
              You currently have <strong>{jobSites.length}</strong> jobsites in the system.
              Use the search bar to quickly find a jobsite by name, or click{" "}
              <strong>Create</strong> to add a new one.
            </span>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search a jobsite"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="create-button" onClick={() => setModalOpen(true)}>
          Create <span>+</span>
        </button>
      </div>

      <JobsiteTable jobSites={filteredJobSites} />

      {modalOpen && (
        <JobsiteModal
          closeModal={() => setModalOpen(false)}
          addJobsite={addJobsite}
        />
      )}
    </div>
  );
}

export default Home;
