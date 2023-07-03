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

    const updateData = {
      email: formData.get("email"),
      u_name: formData.get("u_name")
    };

    axios
      .post(`${domain}/updateuser/${params.id}`, updateData)
      .then((res) => {
        console.log(res);
        navigate.push('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(email);
  console.log(u_name);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Form className="row" onSubmit={handleSubmit}>
              <Col>
                <Form.Group controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={u_name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="Name">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* <div className="col-lg-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={singleUser[0]?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div> */}
              {/* <div className="col-lg-6 mb-3">
                <label htmlFor="email">Name</label>
                <input
                  type="text"
                  name="u_name"
                  id="name"
                  value={singleUser[0]?.u_name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div> */}
              <div className="col-12">
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
