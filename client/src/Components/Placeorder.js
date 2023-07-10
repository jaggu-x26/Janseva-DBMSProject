import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Placeorder.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navigation from "./Navigation";

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth()+1;
const day = now.getDate();


const ordertime = `${year}-${month}-${day}`;


const MySwal = withReactContent(Swal);

const order_id = Math.floor(Math.random() * 100000);
// const order_id = orderid.generate();

export default function Placeorder() {
  const packID = localStorage.getItem("packID");
  const pilgID = localStorage.getItem("pilgID");
  const ltkID = localStorage.getItem("ltk");
  const url = `http://localhost:8000/placeorder?pilgID=${pilgID}&packID=${packID}`;
  const userurl = `http://localhost:8000/userdata?custID=${ltkID}`;
  const nav = useNavigate();
  const [ordersummary, setOrdersummary] = useState("");
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setOrdersummary(data);
      });

    fetch(userurl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUserdata(data);
      });
  }, []);

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Payment was successful. Wait while we redirect you to home page",
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: "error",
      title: "Payment was not successful",
      time: 4000,
    });
  };

  // posting the payment request //
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/payment",
        method: "post",
        data: {
          amount: amount + 1500,
          token,
          orderdetails: ordersummary,
          order_id: order_id,
          timestamp : ordertime,
          custID : ltkID,
        },
      });
      if (response.data.status === "success") {
        handleSuccess();
        setTimeout(function () {
          nav("/home");
        }, 3000);
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  console.log(ordersummary);
  console.log(userdata);

  var pilg = ordersummary.length > 0 ? ordersummary[0].pilgName : "";
  var pack = ordersummary.length > 0 ? ordersummary[0].packName : "";
  var email = userdata.length > 0 ? userdata[0].custEmail : "";
  var phone = userdata.length > 0 ? userdata[0].custContact : "";
  var address = userdata.length > 0 ? userdata[0].custAddress : "";
  var amount = ordersummary.length > 0 ? ordersummary[0].packCost : "";
  return (
    <>
      {/*Navigation*/}
      <Navigation />
      {/*Payment*/}
      <div className="container my-5">
        <div className="panel panel-primary orderback">
          <div className="panel-body">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="orderhead">Order Summary</div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>OrderID</label>
                    <input
                      className="form-control"
                      name="id"
                      value={order_id}
                      disabled
                      muted
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label> Pilg Name</label>
                    <input
                      className="form-control"
                      name="name"
                      value={pilg}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label> Package Name</label>
                    <input
                      className="form-control"
                      name="name"
                      value={pack}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      name="email"
                      value={email}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      className="form-control"
                      name="phone"
                      value={phone}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      className="form-control"
                      name="address"
                      value={address}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <h2 className="orderhead" style={{ marginTop: "5rem" }}>
                  Total Cost <span style={{ fontSize: "20px" }}>(in Rs)</span>{" "}
                </h2>
                <div className="col-md-6">
                  <div className="form-group">
                    <h5>
                      {" "}
                      Package Cost{" "}
                      <span style={{ float: "right" }}>Rs {amount}.00</span>
                    </h5>
                    <h5>
                      {" "}
                      Pilgrimage Cost{" "}
                      <span style={{ float: "right" }}>Rs 400.00</span>
                    </h5>
                    <h5>
                      {" "}
                      Priest Cost{" "}
                      <span style={{ float: "right" }}>Rs 1000.00</span>
                    </h5>
                    <h5>
                      {" "}
                      Convinience Charges{" "}
                      <span style={{ float: "right" }}>Rs 100.00</span>
                    </h5>
                    <hr />
                    <h5>
                      Payable Total cost{" "}
                      <span style={{ fontSize: "10px" }}>
                        (inclusive of Taxes)
                      </span>{" "}
                      <span style={{ float: "right" }}>
                        Rs {amount + 1500}.00
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="paybutton">
              <StripeCheckout
                stripeKey="pk_test_51MqgLVSG25tr98J4WPHHgCHrnNy8SCgWta9ozjZSqakWMJeKEKOKySaW2k8MNrizMwnd33hs5yu46APPmVlAjnbD00nbaoVhnS"
                label="Confirm Order"
                name="Pay with cards"
                billingAddress
                shippingAddress
                amount={amount}
                description={`Total amount: ${amount + 1500}`}
                token={payNow}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
