import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="fw-medium fs-5">{label}</label>
      <select name={name} id={name} {...rest} className="form-control  p-3 border border-success">
      <option value=""></option> 
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
