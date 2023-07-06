import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const HomeEdit = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [file, setFile] = useState({});
  const [files, setFiles] = useState({});

  useEffect(() => {
    axios
      .get(`${domain}/home`)
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
      setCompanyName(singleUser.company_name || "");
      setAddress(singleUser.address || "");
      setPhone(singleUser.phone || "");
      setEmail(singleUser.email || "");
      setGoogleMap(singleUser.map || "");
    }
  }, [data, params.id, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("companyName", companyName);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("googleMap", googleMap);
    formData.append("file", file);

   
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    
    axios
      .post(`${domain}/updatehome/${params.id}`, formData)
      .then((res) => {
        console.log(res);
        navigate("/");
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
                <Form.Group controlId="company_name">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="Address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="Phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="Google map">
                  <Form.Label>Google map</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={googleMap}
                    onChange={(e) => setGoogleMap(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {/* <div className="bg-black">
                    <img
                      className="img-fluid"
                      src={`${domain}/uploads/${
                        singleUser && JSON.parse(singleUser.image)
                      }`}
                      alt=""
                      style={{ width: "100%", height: "50px" }}
                    />
                  </div> */}
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                  />
                  <div className="bg-black">
                    <img
                      className="img-fluid"
                      src={`${domain}/uploads/${
                        singleUser && JSON.parse(singleUser.home_slider)
                      }`}
                      alt=""
                      style={{ width: "100%", height: "50px" }}
                    />
                  </div>
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

export default HomeEdit;
