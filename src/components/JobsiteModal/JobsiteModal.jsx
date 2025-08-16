// src/components/JobsiteModal.jsx
import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert
} from "react-bootstrap";

function JobsiteModal({ closeModal, setJobSites }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = () => {
    if (!name || !status) return;
    setJobSites(prev => [
      ...prev,
      {
        id: Date.now(),
        name,
        status
      }
    ]);
    closeModal();
  };

  return (
    <Modal show onHide={closeModal} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="info">
          Informative piece of text that can be used regarding this modal.
        </Alert>

        <Form>
          <Form.Group controlId="formJobsiteName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type the jobsite's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formCategory" className="mb-3">
                <Form.Label>Category Included</Form.Label>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Category A">Category A</option>
                  <option value="Category B">Category B</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formStatus" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select one</option>
                  <option value="On Road">On Road</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="In Progress">In Progress</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>
          Cancel Changes ❌
        </Button>
        <Button variant="success" onClick={handleSave}>
          Save Changes ✅
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default JobsiteModal;
