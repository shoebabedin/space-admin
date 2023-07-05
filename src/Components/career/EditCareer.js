import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditCareer = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [context, setContext] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [education, setEducation] = useState("");
  const [requirement, setRequirement] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    axios
      .get(`${domain}/career`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);

  const singleUser = data.find((item) => item.id == params.id);

  useEffect(() => {
    if (data.length > 0 && params.id && singleUser) {
      setTitle(singleUser.title || "");
      setVacancy(singleUser.vacancy || "");
      setContext(singleUser.context || "");
      setResponsibilities(singleUser.responsibilities || "");
      setEducation(singleUser.education || "");
      setRequirement(singleUser.requirement || "");
      setSalary(singleUser.salary || "");
    }
  }, [data, params.id, singleUser]);

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
      .post(`${domain}/updatecareer/${params.id}`, formData)
      .then((res) => {
        console.log(res);
        navigate("/career");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(singleUser);
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
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="vacancy">
                  <Form.Label>Vacancy</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={vacancy}
                    onChange={(e) => setVacancy(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="education">
                  <Form.Label>Education</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group controlId="salary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group controlId="context">
                  <Form.Label>Context</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={context}
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
                    defaultValue={responsibilities}
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
                    defaultValue={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
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

export default EditCareer;
