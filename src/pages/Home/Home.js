// src/pages/Home.jsx
import React, { useState } from "react";
import HeaderCards from "../../components/HeaderCards/HeaderCards";
import JobsiteTable from "../../components/JobsiteTable/JobsiteTable";
import JobsiteModal from "../../components/JobsiteModal/JobsiteModal";
import "./Home.css"; // style custom


function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobSites, setJobSites] = useState([
    { id: 1, name: "1658 E 23rd St, Brooklyn, NY 11229, USA", status: "Completed" },
    { id: 2, name: "1705 E 22nd St, Brooklyn, NY 11229, USA", status: "On Hold" },
    { id: 3, name: "47 Lake St, Brooklyn, NY 11223, USA", status: "Completed" },
    { id: 4, name: "256 Bay 19th St, Brooklyn, NY 11214, USA", status: "On Hold" },
    { id: 5, name: "6908 13th Ave, Brooklyn, NY 11228, USA", status: "On Hold" },
    // shto më shumë sipas nevojës...
  ]);

  return (
    <div className="container mt-4 home-wrapper">
      <HeaderCards jobSites={jobSites} />

      <div className="d-flex justify-content-between align-items-center my-4">
        <div>
          <h6 className="mb-2 fw-bold">Title</h6>
          <div className="info-box">
            <span className="info-icon">i</span>
            <span>
              Informative piece of text that can be used regarding this modal.
            </span>
          </div>
        </div>
        <button className="btn btn-success create-button" onClick={() => setModalOpen(true)}>
          Create +
        </button>
      </div>

      <JobsiteTable jobSites={jobSites} />

      {modalOpen && (
        <JobsiteModal closeModal={() => setModalOpen(false)} setJobSites={setJobSites} />
      )}
    </div>
  );
}

export default Home;