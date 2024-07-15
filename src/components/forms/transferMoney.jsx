import React from "react";
// import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import {transfer} from '../../services/transactionService'

// import auth from "../services/authService";

class Transfer extends Form {
  state = {
    data: { accountNumber: "", pin: "", amount: "", bankName: "" },
    errors: {},
  };
  schema = {
    accountNumber: Joi.string().required().label("Account Number"),
    pin: Joi.string().required().label("PIN"),
    amount: Joi.string().required().label("Amount"),
    bankName: Joi.string().required().label("Bank Name"),
  };
  
    doSubmit = async () => {
      try {
        const { data } = this.state;
        await transfer(data);
        window.location='/';

      } catch (ex) {
        if (ex.response && ex.response.status >= 400 && ex.response.status<500 ) {
          const errors = { ...this.state.errors };
          errors.backend = ex.response.data;
          this.setState({ errors });
        }
      }
    };

  render() {
    const { errors } = { ...this.state };
    // if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="w-50 m-auto">
        <h2>Money Transfer Form</h2>
        {errors && errors.backend && (
          <div className="alert alert-danger">{errors.backend}</div>
        )}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accountNumber", "Receiver Account Number")}
          {this.renderInput("pin", "Your PIN", "password")}
          {this.renderInput("amount", "Amount to transfer")}
          {this.renderInput("bankName", "Reciever Bank Name")}
          {this.renderButton("Send Money")}
        </form>
      </div>
    );
  }
}

export default Transfer;
