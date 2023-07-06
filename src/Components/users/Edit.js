import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const params = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [u_name, setName] = useState("");
  const [file, setFile] = useState();


  useEffect(() => {
    axios
      .get(`${domain}/viewuser`)
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
      setEmail(singleUser.email || "");
      setName(singleUser.u_name || "");
    }
  }, [data, params.id, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

   
    formData.append("email", email);
    formData.append("u_name", u_name);
    formData.append("file", file);

    

    axios
      .post(`${domain}/updateuser/${params.id}`, formData)
      .then((res) => {
        console.log(res);
        navigate('/users')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Form className="row" onSubmit={handleSubmit}>
              <Col lg={6} className="mb-2">
                <Form.Group controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={u_name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-2">
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-2">
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    
                  />
                </Form.Group>
              </Col>
              
              <Col lg={12} className="mt-2">
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Col>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
