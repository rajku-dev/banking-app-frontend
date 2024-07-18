import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1 className="text-center">BANK OF ORIGIN</h1>
      <h6 className="fst-italic text-center mb-5">
        Empowering Your Financial Journey with Trust and Innovation
      </h6>
      <div className="d-flex justify-content-around align-items-center mb-5">
        <div
          className="card mb-1 text-bg-secondary text-center border-secondary"
          style={{ width: "20rem", height: "12rem" }}
        >
          <div className="card-body">
            <h5 className="card-title fw-semibold lh-lg">
              <i className="fa-solid fa-paper-plane fs-3"></i>
            </h5>
            <p className="card-text lh-base fs-6">
              Send money to friends, family and more
            </p>
            <Link to="/transfer" className="btn btn-success border-success btn-sm p-2">
              Get started
            </Link>
          </div>
        </div>
        <div
          className="card mb-3 text-bg-secondary text-center border-secondary"
          style={{ width: "20rem", height: "12rem" }}
        >
          <div className="card-body">
            <h5 className="card-title fw-semibold lh-lg">
              <i className="fa-solid fa-piggy-bank fs-3"></i>
            </h5>
            <p className="card-text lh-base fs-6">
              Deposit money into your Savings account
            </p>
            <Link to="/deposit" className="btn btn-success border-success btn-sm p-2">
              Get started
            </Link>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <div
          className="card mb-3 text-bg-secondary text-center border-secondary"
          style={{ width: "20rem", height: "12rem" }}
        >
          <div className="card-body">
            <h5 className="card-title fw-semibold lh-lg">
              <i className="fa-solid fa-money-bill-transfer fs-3"></i>
            </h5>
            <p className="card-text lh-base fs-6">
              Withdraw money from your account
            </p>
            <Link to="/withdraw" className="btn btn-success border-success btn-sm p-2">
              Get started
            </Link>
          </div>
        </div>
        <div
          className="card mb-3 text-bg-secondary text-center border-secondary"
          style={{ width: "20rem", height: "12rem" }}
        >
          <div className="card-body">
            <h5 className="card-title fw-semibold lh-lg">
              <i className="fa-solid fa-coins fs-3"></i>
            </h5>
            <p className="card-text lh-base fs-6">
              Request a FD and see your money grow
            </p>
            <Link to="/fdoptions" className="btn btn-success border-success btn-sm p-2">
              See plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
