// src/components/HeaderCards.jsx
import React from "react";
import "./HeaderCards.css";

function HeaderCards({ jobSites }) {
  const countStatus = (status) =>
    jobSites.filter((j) => j.status === status).length;

  return (
    <div className="header-cards">
      <div className="card on-road">
        <div className="info">
          <h4>{countStatus("On Road")}</h4>
          <p>On Road</p>
        </div>
      </div>

      <div className="card completed">
        <div className="info">
          <h4>{countStatus("Completed")}</h4>
          <p>Completed</p>
        </div>
      </div>

      <div className="card on-hold">
        <div className="info">
          <h4>{countStatus("On Hold")}</h4>
          <p>On Hold</p>
        </div>
      </div>
    </div>
  );
}

export default HeaderCards;
