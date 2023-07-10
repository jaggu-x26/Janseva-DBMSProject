import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const url = "http://localhost:8000/userinfo";


export default function Navigation() {
    const [userdata, setUserdata] = useState("");
    const nav = useNavigate();
    useEffect(() => {
        fetch(url, {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("ltk"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.auth == true) {
              //console.log(data.token[0])
              setUserdata(data.token[0]);
              //console.log("updated userdata");
              //console.log(userdata);
            }
          });
      }, []);
      const handleLogout = () => {
       
        setUserdata("");
        localStorage.removeItem("userdata");
        localStorage.removeItem("ltk");
        nav('/');
        //this.props.history.push('/')
      };
  return (
    <>
        <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <Link class="navbar-brand brand" to="/home">
            Janseva
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list" style={{ color: "white" }}></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul
              class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ scrollHeight: "100px" }}
            >
              <li class="nav-item">
                <Link class="nav-link active brand" to="/pilgrimage">
                  Pilgrimages
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link brand" to="/about">
                  About Us
                </Link>
              </li>
              </ul>
              <div class="nav-item">
                {userdata.custName ? (
                  <div>
                    <Link className="btn btn-light" to='/userprofile'>
                      Hi {userdata.custName} <i class="bi bi-person-circle"></i>
                    </Link> &nbsp; &nbsp;
                    <button onClick={handleLogout} className="btn btn-danger">
                      Logout <i class="bi bi-box-arrow-right"></i>
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link to="/login" className="btn btn-success">
                      Login <i class="bi bi-box-arrow-in-left"></i>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to="/register" className="btn btn-warning">
                      Register <i class="bi bi-check2-circle"></i>
                    </Link>
                  </div>
                )}
              </div>
          </div>
        </div>
      </nav>

    </>
  )
}
