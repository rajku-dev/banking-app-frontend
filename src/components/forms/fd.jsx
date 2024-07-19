import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import {getUser} from "../../services/userService"; 
import {makeFD} from "../../services/fdServices"

class FDForm extends Form {
  state = {
    data: {
      amount: "",
      minTime: "",
      maxTime: "",
      interest: "",
      age: "",
      nominee: "",
      pin: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const {data:user}=await getUser();
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const data = { ...this.state.data };  
    data.minTime = params.get("min");   
    data.maxTime = params.get("max"); 
    data.age=user.age;
    if(user.age<60){
      data.interest=params.get("interestUnder60");
    }else{
      data.interest=params.get("interestOver60")
    }
    this.setState({ data });       
  }

  doSubmit = async () => {
    try {
      const {data}= this.state;
      await makeFD(data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status >= 400 && ex.response.status<500) {
        const errors = { ...this.state.errors };
        errors.backend = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  schema = {
    amount: Joi.number().integer().required().label("Amount"),
    minTime: Joi.string().required().label("Min Duration"),
    maxTime: Joi.string().required().label("Max Duration"),
    interest: Joi.string().required().label("Interest"),
    age: Joi.number().required().label("Age"),
    nominee: Joi.string().required().label("Nominee"),
    pin: Joi.string().required().label("PIN"),
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="form">
        <h1>Issue Fixed Deposit</h1>
        {errors && errors.backend && (
          <div className="alert alert-danger">{errors.backend}</div>
        )}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("amount", "Amount")}
          {this.renderInput("minTime", "Minimum Duration in days")}
          {this.renderInput("maxTime", "Maximum Duration in days")}
          {this.renderInput("interest", "Interest Applicable")}
          {this.renderInput("age", "Your age")}
          {this.renderInput("nominee", "Nominee")}
          {this.renderInput("pin", "Your PIN", "password")}
          {this.renderButton("Request FD")}
        </form>
      </div>
    );
  }
}

export default FDForm;
