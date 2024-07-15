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
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email Address"),
    password: Joi.string().required().label("Password"),
    cPassword: Joi.string().required().label("Confirm Password"),
    age: Joi.string().required().label("Age"),
    gender: Joi.string().required().label("Gender"),
    DOB: Joi.date().required().label("DOB"),
    aadhaarCard: Joi.string().required().label("Aadhar Card"),
    panCard: Joi.string().required().label("PAN Card").min(10).max(10),
    PhoneNo: Joi.string().required().label("Phone Number").min(10).max(10),
    FatherName: Joi.string().required().label("Father Name"),
    pin: Joi.string().required().label("PIN"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("State"),
    country: Joi.string().required().label("Country"),
    bankBalance: Joi.string().required().label("Bank Balance"),
    accountType: Joi.string().required().label("Account Type"),
    bankName: Joi.string().required().label("Bank Name"),
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
      <div className="w-50 m-auto">
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
