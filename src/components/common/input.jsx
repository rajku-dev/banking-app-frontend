import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="fs-5">{label}</label>
      <input {...rest} name={name} id={name} className="form-control p-3 border border-success fw-medium"/>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;