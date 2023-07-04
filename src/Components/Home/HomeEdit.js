import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const HomeEdit = () => {
    const domain = process.env.REACT_APP_DOMAIN;
    const params = useParams();
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
  
    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
  
      formData.append("title", title);
      formData.append("content", content);
      for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
  
  console.log(formData.get('files'));
      axios
        .post(`${domain}/createblog`, formData)
        .then((res) => {
          console.log(res);
          navigate('/blog')
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
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
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

export default HomeEdit;