import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import { changePin } from "../../services/userService";
import { toast } from "react-toastify";
// import auth from "../services/authService";

class PINForm extends Form {

  state = {
    data: { accountNumber:"",oldPin:"",newPin:"",cNewPin:""},
    errors: {}
  };

   schema = {
    accountNumber:Joi.string().required().label("Account Number"),
    oldPin: Joi.string()
      .required()
      .label("Old PIN"),
    newPin: Joi.string()
      .required()
      .label("New PIN"),
    cNewPin: Joi.string()
      .required()
      .label("Confirm New PIN")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await changePin(data);
      toast.success("Pin changed successfully")
      window.location='/';
    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status<500) {
        const errors = { ...this.state.errors };
        errors.backend = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const {errors}={...this.state}
    // if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="form">
        <h1>Change PIN</h1>
        {errors && errors.backend && <div className="alert alert-danger">{errors.backend}</div>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accountNumber", "Account Number")}
          {this.renderInput("oldPin", "Old PIN")}
          {this.renderInput("newPin", "New PIN", "password")}
          {this.renderInput("cNewPin", "Confirm New PIN","password")}
          {this.renderButton("Request Change")}
        </form>
      </div>
    );
  }
}

export default PINForm;