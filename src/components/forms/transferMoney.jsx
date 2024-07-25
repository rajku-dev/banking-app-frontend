import React from "react";
// import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Form from "../common/form";
import { transfer } from "../../services/transactionService";

// import auth from "../services/authService";

class Transfer extends Form {
  state = {
    data: { accountNumber: "", pin: "", amount: "", bankName: "" },
    errors: {},
  };
  schema = {
    accountNumber: Joi.string().required().label("Account Number"),
    pin: Joi.string().required().label("PIN"),
    amount: Joi.number().min(1).required().label("Amount"),
    bankName: Joi.string().required().label("Bank Name"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await transfer(data);
      toast.success(`${data.amount} has been debited from your account`);
      setTimeout(() => {
        window.location = "/";
      }, 3000);
    } catch (ex) {
      if (
        ex.response &&
        ex.response.status >= 400 &&
        ex.response.status < 500
      ) {
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
      <div className="form">
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
