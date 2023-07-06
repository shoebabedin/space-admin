import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const WorkEdit = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState({});

  useEffect(() => {
    axios
      .get(`${domain}/work`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const singleUser = data.find((item) => item.id == params.id);

  useEffect(() => {
    if (data.length > 0 && params.id && singleUser) {
      setTitle(singleUser.title || "");
      setDescription(singleUser.description || "");
    }
  }, [data, params.id, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    axios
      .post(`${domain}/updatework/${params.id}`, formData)
      .then((res) => {
        console.log(res);
        navigate("/work");
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
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    file
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
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

export default WorkEdit;
