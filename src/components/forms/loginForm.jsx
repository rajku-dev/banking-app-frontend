import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from '../../services/authService'

class LoginForm extends Form {
  state = {
    data: { accountNumber: "", password: "" ,email:""},
    errors: {}
  };
  schema = {
    accountNumber: Joi.string()
      .required()
      .label("Account Number"),
      email: Joi.string()
      .required()
      .label("Account Number"),
    password: Joi.string()
      .required()
      .min(2)
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      console.log(data)
      await auth.login(data);
      window.location='/'
    } catch (ex) {
      console.log(ex)
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
        <h1>Login Form</h1>
        {errors && errors.backend && <div className="alert alert-danger">{errors.backend}</div>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accountNumber", "Account Number")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("email", "Email Address")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
