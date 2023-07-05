import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateCareer = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [context, setContext] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [education, setEducation] = useState("");
  const [requirement, setRequirement] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("vacancy", vacancy);
    formData.append("context", context);
    formData.append("responsibilities", responsibilities);
    formData.append("education", education);
    formData.append("requirement", requirement);
    formData.append("salary", salary);

    axios
      .post(`${domain}/createcareer`, formData)
      .then((res) => {
        console.log(res);
        navigate("/career");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form className="row" onSubmit={handleSubmit}>
              <Col lg={6}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="vacancy">
                  <Form.Label>Vacancy</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setVacancy(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group controlId="context">
                  <Form.Label>Context</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    onChange={(e) => setContext(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group controlId="responsibilities">
                  <Form.Label>Responsibilities</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="email"
                    onChange={(e) => setResponsibilities(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group controlId="requirement">
                  <Form.Label>Requirement</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    onChange={(e) => setRequirement(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="education">
                  <Form.Label>Education</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group controlId="salary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Button type="submit" className="mt-2 w-100">
                  Create new
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateCareer;
