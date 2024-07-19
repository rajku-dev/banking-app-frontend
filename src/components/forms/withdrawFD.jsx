import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import { withdrawFD } from "../../services/fdServices";
// import auth from "../services/authService";

class FDWithdrawForm extends Form {
  state = {
    data: {accountNumber:"", token:"",pin:""},
    errors: {}
  };
  schema = {
    accountNumber:Joi.string().required().label("Account Number"),
    token: Joi.string()
      .required()
      .label("Token"),
    pin:Joi.string().required().label("PIN")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await withdrawFD(data);
      window.location='/';
      
    } catch (ex) {
      if (ex.response && ex.response.status>=400 && ex.response.status<500) {
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
      <div className="form" style={{padding:'16rem', paddingTop:'2rem'}}>
  
        <h1>Withdraw FD</h1>
        {errors && errors.backend && <div className="alert alert-danger">{errors.backend}</div>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accountNumber", "Account Number")}
          {this.renderInput("token", "FD Token")}
          {this.renderInput("pin", "Your PIN","password")}
          {this.renderButton("Request")}
        </form>
      </div>
    );
  }
}

export default FDWithdrawForm;