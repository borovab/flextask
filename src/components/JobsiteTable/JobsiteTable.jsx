// src/components/JobsiteTable.jsx
import React from "react";
import { Table, Badge } from "react-bootstrap";

function JobsiteTable({ jobSites }) {
  const getVariant = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "On Hold":
        return "danger";
      case "In Progress":
        return "primary";
      case "On Road":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Table striped bordered hover responsive className="align-middle">
      <thead>
        <tr>
          <th>Jobsite Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {jobSites.map((site) => (
          <tr key={site.id}>
            <td className="text-primary fw-semibold">{site.name}</td>
            <td>
              <Badge bg={getVariant(site.status)} className="px-3 py-2 fs-6">
                {site.status}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default JobsiteTable;
