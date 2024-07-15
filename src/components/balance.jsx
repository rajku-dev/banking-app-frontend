import React, { Component } from "react";
import {getUser} from "../services/userService"; 
class Balance extends Component {
  state = {
    balance: 0,
    account: "",
    bank: "",
  };

  async componentDidMount() {
    const { data } = await getUser();
    this.setState({
      balance: data.bankBalance,
      account: data.accountNumber,
      bank: data.bankName,
    });
  }

  render() {
    const { balance, account, bank } = this.state;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Account Details</h2>
                <p className="card-text" style={{ fontSize: "1.25rem", color: "#2c3e50" }}>
                  <strong>Balance:</strong> <span className="text-success">&#8377;{balance}</span> only
                </p>
                <p className="card-text" style={{ fontSize: "1.25rem", color: "#34495e" }}>
                  <strong>Account:</strong> {account}
                </p>
                <p className="card-text" style={{ fontSize: "1.25rem", color: "#34495e" }}>
                  <strong>Bank:</strong> {bank}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Balance;
