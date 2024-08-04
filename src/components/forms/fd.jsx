import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import {makeFD} from "../../services/fdServices"
import { toast } from "react-toastify";
import { getFdOption } from "../../services/fdServices";

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
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const data = { ...this.state.data };  
    const option = params.get("option");  
    if(option>'3' || option<0) window.location='/notFound'
    // console.log(option)
    const {data:fdOption}=await getFdOption(option);
    data.age=fdOption.age;
    data.interest=fdOption.interest;
    data.minTime=fdOption.minTime;
    data.maxTime=fdOption.maxTime;
    this.setState({ data });       
  }

  doSubmit = async () => {
    try {
      const {data}= this.state;
      await makeFD(data);
      toast.success("Your FD was made successfully");
      setTimeout(() => {
        window.location = "/";
      }, 1500);
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
          {this.renderInput("minTime", "Minimum Duration in days","text",true)}
          {this.renderInput("maxTime", "Maximum Duration in days","text",true)}
          {this.renderInput("interest", "Interest Applicable","text",true)}
          {this.renderInput("age", "Your age","text",true)}
          {this.renderInput("nominee", "Nominee")}
          {this.renderInput("pin", "Your PIN", "password")}
          {this.renderButton("Request FD")}
        </form>
      </div>
    );
  }
}

export default FDForm;
