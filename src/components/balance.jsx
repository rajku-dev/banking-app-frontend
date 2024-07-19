import React, { Component } from "react";
import { getUser } from "../services/userService";

class Balance extends Component {
  state = {
    balance: 0,
    account: "",
    bank: "",
    createdAt:""
  };

  async componentDidMount() {
    const { data } = await getUser();
    this.setState({
      balance: data.bankBalance,
      account: data.accountNumber,
      bank: data.bankName,
      createdAt: new Date(data.openingDate).toLocaleDateString()
    });
  }

  render() {
    const { balance, account, bank, createdAt } = this.state;

    const cardStyle = {
      width: "100%",
      height: "auto",
      background: "linear-gradient(132deg, rgb(241, 242, 11) 0.00%, rgb(248, 161, 27) 100.00%)",
      color: "#000000",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
    };

    const textStyle = {
      fontSize: "1.25rem",
      color: "#484848", 
      margin:'0'
    };

    return (
      <div className="container pt-5 pb-5">
          <div className="col-md-6 offset-md-3">
            <div className="card text-center" style={cardStyle}>
              <div className="card-body">
                <h2 className="card-title" style={{ color: "#484848", fontWeight: "500" }}>Account Details</h2>
                <p className="card-text" style={textStyle}>
                  <strong>Balance: </strong> <span className="text-success">&#8377;{balance}</span> only
                </p>
                <p className="card-text" style={textStyle}>
                  <strong>Account: </strong> {account}
                </p>
                <p className="card-text" style={textStyle}>
                  <strong>Opening date: </strong> {createdAt}
                </p>
                <p className="card-text" style={textStyle}>
                  <strong>Bank: </strong> {bank}
                </p>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Balance;
