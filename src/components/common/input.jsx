import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="fs-5 d-inline">{label}</label>
      <input {...rest} name={name} id={name} className="form-control p-3 border border-2 border-info fw-medium"
             style={{ backgroundColor: "rgba(0, 123, 255, 0.1)" }} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
