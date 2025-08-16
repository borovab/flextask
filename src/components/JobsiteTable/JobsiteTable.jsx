// src/components/JobsiteTable.jsx
import React from "react";
import "./JobsiteTable.css"; // Importo CSS të jashtëm për stilet

function JobsiteTable({ jobSites }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "badge-completed"; // Jeshile
      case "On Hold":
        return "badge-onhold";    // Verdhe
      case "In Progress":
        return "badge-inprogress"; // Blu
      case "On Road":
        return "badge-onroad";    // (nëse nevojitet)
      default:
        return "badge-default";   // Gri
    }
  };

  return (
    <table className="jobsite-table">
      <thead>
        <tr>
          <th></th>
          <th>Jobsite Name</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {jobSites.map((site) => (
          <tr key={site.id}>
            <td></td>
            <td className="jobsite-name">{site.name}</td>
            <td>
              <span className={`status-badge ${getStatusClass(site.status)}`}>
                {site.status}
              </span>
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JobsiteTable;
