import React from "react";
import { useNavigate } from "react-router";  // Sigurohu që është react-router-dom
import "./JobsiteTable.css";

function JobsiteTable({ jobSites }) {
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "badge-completed";
      case "On Hold":
        return "badge-onhold";
      case "In Progress":
        return "badge-inprogress";
      case "On Road":
        return "badge-onroad";
      default:
        return "badge-default";
    }
  };

  const handleNameClick = (jobsiteId) => {
    navigate(`/inventory/${jobsiteId}`);
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
            <td
              className="jobsite-name"
              onClick={() => handleNameClick(site.id)}
            >
              {site.name}
            </td>
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
