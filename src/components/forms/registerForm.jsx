import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../../services/authService"

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      cPassword: "",
      age: "",
      gender: "",
      DOB: "",
      aadhaarCard: "",
      panCard: "",
      PhoneNo: "",
      FatherName: "",
      pin: "",
      city: "",
      state: "",
      country: "",
      bankBalance: "",
      accountType: "",
      bankName: "",
    },
    errors: {},
  };


  schema = {
    name: Joi.string().min(3).max(30).required().label("Name"),
    email: Joi.string().email().required().label("Email Address"),
    password: Joi.string().min(4).required().label("Password"),
    cPassword: Joi.string().min(4).required().label("Confirm Password"),
    age: Joi.number().integer().min(18).max(120).required().label("Age"),
    gender: Joi.string().required().label("Gender"),
    DOB: Joi.date().required().label("DOB"),
    aadhaarCard: Joi.string().length(12).label("Aadhaar Card"),
    panCard: Joi.string().length(10).required().label("PAN Card"),
    PhoneNo: Joi.string().length(10).regex(/^[0-9]+$/).required().label("Phone Number"),
    FatherName: Joi.string().min(3).max(30).required().label("Father's Name"),
    pin: Joi.string().min(3).max(4).regex(/^[0-9]+$/).required().label("PIN"),
    city: Joi.string().min(2).max(50).required().label("City"),
    state: Joi.string().min(2).max(50).required().label("State"),
    country: Joi.string().min(2).max(50).required().label("Country"),
    bankBalance: Joi.number().min(0).required().label("Bank Balance"),
    accountType: Joi.string().required().label("Account Type"),
    bankName: Joi.string().min(3).max(50).required().label("Bank Name")
  };




   doSubmit = async () => {
    try {
      const {data}= this.state;
      await auth.register(data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status<500) {
        const errors = { ...this.state.errors };
        errors.backend = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  
  render() {
    const { errors } = this.state;
    return (
      <div className="form">
        <h1>Registration Form</h1>
        <form onSubmit={this.handleSubmit}>
          {errors && errors.backend && <div className="alert alert-danger">{errors.backend}</div>}
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email Address")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("cPassword", "Confirm Password", "password")}
          {this.renderInput("age", "Age")}
          {this.renderSelect("gender", "Gender",["Male","Female","Rather not say"])}
          {this.renderInput("DOB","Date of birth")}
          {this.renderInput("aadhaarCard", "Aadhaar Card")}
          {this.renderInput("panCard", "PAN Card")}
          {this.renderInput("PhoneNo", "Phone Number")}
          {this.renderInput("FatherName", "Father Name")}
          {this.renderInput("pin", "PIN")}
          {this.renderInput("city", "City")}
          {this.renderInput("state", "State")}
          {this.renderInput("country", "Country")}
          {this.renderInput("bankBalance", "Bank Balance")}
          {this.renderSelect("accountType", "Account Type",["Savings","Current","Salary","Demat"])}
          {this.renderInput("bankName", "Bank Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
