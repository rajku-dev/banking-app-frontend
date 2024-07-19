import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import {withdraw} from '../../services/transactionService'
import { toast } from "react-toastify";

// import auth from "../services/authService";

class WithdrawForm extends Form {
  state = {
    data: { accountNumber:"",pin:"",amount:""},
    errors: {}
  };
  schema = {
    accountNumber:Joi.string().required().label("Account Number"),
    pin: Joi.string()
      .required()
      .label("PIN"),
    amount: Joi.string()
      .required()
      .label("Amount")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await withdraw(data);
      toast.success("Withdrawal successful!")
      window.location='/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.backend = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const {errors}={...this.state}
    return (
      <div className="form" style={{padding:'16rem', paddingTop:'2rem'}}>
        <h1>Withdraw</h1>
        {errors && errors.backend && <div className="alert alert-danger">{errors.backend}</div>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accountNumber", "Account Number")}
          {this.renderInput("pin", "PIN","password")}
          {this.renderInput("amount", "Amount")}
          {this.renderButton("Request Withdraw")}
        </form>
      </div>
    );
  }
}

export default WithdrawForm;