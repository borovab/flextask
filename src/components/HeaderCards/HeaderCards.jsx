// src/components/HeaderCards.jsx
import React from "react";
import "./HeaderCards.css";

function HeaderCards({ jobSites }) {
  const countStatus = (status) =>
    jobSites.filter((j) => j.status === status).length;

  return (
    <div className="header-cards">
      <div className="card on-road">
        {countStatus("On Road")} On Road
      </div>
      <div className="card completed">
        {countStatus("Completed")} Completed
      </div>
      <div className="card on-hold">
        {countStatus("On Hold")} On Hold
      </div>
    </div>
  );
}

export default HeaderCards;
