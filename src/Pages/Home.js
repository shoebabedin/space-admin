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
      .get(`${domain}/home`)
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
      .post(`${domain}/deletehome/${id}`)
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
    } 
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="text-center title">Home Page</h2>
              {data.length === 0 && (
                <Link to={"/home-added"} className="btn btn-primary">
                  Home data add
                </Link>
              )}
            </div>
          </div>
          <div className="col-12">
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <td colSpan={1}>ID</td>
                  <td colSpan={1}>Company Name</td>
                  <td colSpan={1}>Address</td>
                  <td colSpan={1}>Phone</td>
                  <td colSpan={1}>Email</td>
                  <td colSpan={1}>Google map</td>
                  <td colSpan={1}>Logo</td>
                  <td colSpan={1}>Action</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td colSpan={1}>{item.id}</td>
                      <td colSpan={1}>{item.company_name}</td>
                      <td colSpan={1}>{item.address}</td>
                      <td colSpan={1}>{item.phone}</td>
                      <td colSpan={1}>{item.email}</td>
                      <td colSpan={1}>{item.google_map}</td>
                      <td colSpan={1}>
                        {item.image == null ? (
                          "No Image Uploaded"
                        ) : (
                          <>
                            {JSON.parse(item.image).map((item) => (
                              <img
                                className="img-fluid mx-2"
                                src={`${domain}/uploads/${item}`}
                                alt=""
                                style={{ width: "50px", height: "50px" }}
                              />
                            ))}
                          </>
                        )}
                      </td>
                      <td colSpan={1}>
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
