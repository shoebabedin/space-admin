import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${domain}/viewuser`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteData]);

  //   delete user
  const handleClick = (id) => {
    axios
      .post(`${domain}/deleteuser/${id}`)
      .then((res) => {
        setDeleteData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(localStorage.getItem("data"));

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items == null) {
      navigate("login");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="text-center title">Home Page</h2>
              <Link to={"/home-added"} className="btn btn-primary">
                Home data add
              </Link>
            </div>
          </div>
          <div className="col-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Company Name</td>
                  <td>Address</td>
                  <td>Phone</td>
                  <td>Email</td>
                  <td>Google map</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.email}</td>
                      <td>{item.email}</td>
                      <td>{item.u_name}</td>
                      <td>
                        {item.image == null ? (
                          "No Image Uploaded"
                        ) : (
                          <>
                            <img
                              className="img-fluid"
                              src={`${domain}/uploads/${item.image}`}
                              alt=""
                              style={{ width: "100px" }}
                            />
                          </>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/home-edit/${item.id}`}
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </Link>
                        <Button
                          onClick={() => handleClick(item.id)}
                          className="btn btn-danger"
                          role="button"
                          type="submit"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
