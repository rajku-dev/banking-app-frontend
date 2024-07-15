import React from "react";
import { toast } from 'react-toastify';
import Joi from "joi-browser";
import Form from "../common/form";
import { deposit } from '../../services/transactionService';

class DepositForm extends Form {
  state = {
    data: { accountNumber: "", pin: "", amount: "" },
    errors: {}
  };

  schema = {
    accountNumber: Joi.string().required().label("Account Number"),
    pin: Joi.string().required().label("PIN"),
    amount: Joi.string().required().label("Amount")
  };

  async doSubmit() {
    try {
      const { data } = this.state;
      await deposit(data);
      toast.success("Successfully Deposited!");
      window.location='/'
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.backend = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="w-50 m-auto mt-4">
        <h1>Deposit</h1>
        {errors && errors.backend && <div className="alert alert-danger">{errors.backend}</div>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accountNumber", "Account Number")}
          {this.renderInput("pin", "PIN", "password")}
          {this.renderInput("amount", "Amount")}
          {this.renderButton("Request Deposit")}
        </form>
      </div>
    );
  }
}

export default DepositForm;
