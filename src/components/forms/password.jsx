import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";

// import auth from "../services/authService";

class PasswordForm extends Form {
  state = {
    data: { accountNumber:"",oldPass:"",newPass:"",cNewPass:""},
    errors: {}
  };
  schema = {
    accountNumber:Joi.string().required().label("Account Number"),
    oldPass: Joi.string()
      .required()
      .label("Old Password"),
    newPass: Joi.string()
      .required()
      .label("New Password"),
    cNewPass: Joi.string()
      .required()
      .min(2)
      .label("Confirm New Password")
  };

//   doSubmit = async () => {
//     try {
//       const { data } = this.state;
//       await auth.login(data.accountNumber, data.password, data.email);
//       window.location='/';
      
//     } catch (ex) {
//       if (ex.response && ex.response.status === 400) {
//         const errors = { ...this.state.errors };
//         errors.username = ex.response.data;
//         this.setState({ errors });
//       }
//     }
//   };

  render() {
    const {errors}={...this.state}
    // if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="w-50 m-auto">
        <h1>Change Password</h1>
        {errors && errors.backend && <div className="alert alert-danger">{errors.backend}</div>}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accountNumber", "Account Number")}
          {this.renderInput("oldPass", "Old Password")}
          {this.renderInput("newPass", "New Password", "password")}
          {this.renderInput("cNewPass", "Confirm New Password","password")}
          {this.renderButton("Request Change")}
        </form>
      </div>
    );
  }
}

export default PasswordForm;