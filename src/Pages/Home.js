import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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

  console.log(data);

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
            <div className="home_info border px-2 py-3 bg-dark text-light">
              <div className="action_btn d-flex align-items-center justify-content-end">
                <Link
                  to={`/home-edit/${data[0]?.id}`}
                  className="btn btn-primary me-2"
                >
                  Edit
                </Link>
                <Button
                  onClick={() => handleClick(data[0]?.id)}
                  className="btn btn-danger"
                  role="button"
                  type="submit"
                >
                  Delete
                </Button>
              </div>
              <h4>
                Company Logo:{" "}
                <span>
                  {data[0]?.image == null ? (
                    "No Image Uploaded"
                  ) : (
                    <>
                        <img
                          className="img-fluid mx-2"
                          src={`${domain}/uploads/${data[0]?.image}`}
                          alt=""
                          style={{ width: "150px", height: "40px" }}
                        />
                    </>
                  )}
                </span>
              </h4>
              <h4>
                Company Name: <span>{data[0]?.company_name}</span>
              </h4>
              <h6>
                Company address: <span>{data[0]?.address}</span>
              </h6>
              <h6>
                Company phone: <span>{data[0]?.phone}</span>
              </h6>
              <h6>
                Company email: <span>{data[0]?.email}</span>
              </h6>
              <h6 className="text-break">
                Company google map:{" "}
                <span>{data[0]?.map}</span>
              </h6>
              <h4>Slider Image:</h4>
              <div className="row">
                {data[0]?.home_slider == null ? (
                  "No Image Uploaded"
                ) : (
                  <>
                    {JSON.parse(data[0]?.home_slider).map((item, index) => (
                      <div className="col-lg-4 mb-3">
                        <img
                          key={index}
                          className="img-fluid"
                          src={`${domain}/uploads/${item}`}
                          alt=""
                          style={{ width: "100%", height: "250px" }}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
