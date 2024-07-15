import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DOB = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <form>
      <div className="form-group" style={{width:'100%'}}>
        <label htmlFor="date" className='d-block fw-medium fs-5' style={{width:'100%'}}>Date Of Birth</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="form-control p-3 border border-success"
          style={{width:'100%'}}
          id="date"
        />
      </div>
    </form>
  );
};

export default DOB;
