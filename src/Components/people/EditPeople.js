import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditPeople = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    axios
      .get(`${domain}/people`)
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
      setName(singleUser.name || "");
      setDesignation(singleUser.designation || "");
      setFile(singleUser.image || "");
    }
  }, [data, params.id, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("file", file);

    console.log(formData.get("file", file));
    // return

    axios
      .post(`${domain}/updatepeople/${params.id}`, formData)
      .then((res) => {
        console.log(res);
        navigate("/people");
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
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="Designation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" className="mt-2">
                Create Blog Post
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPeople;
