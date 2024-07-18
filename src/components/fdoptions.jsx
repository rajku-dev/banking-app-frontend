import React from 'react';
import { Link } from 'react-router-dom';

const fdir = [
  [7, 45, 3, 3.5],
  [46, 179, 4.5, 5.0],
  [180, 210, 5.35, 5.75],
  [211, 365, 5.88, 6.25],
];

const FDOptions = () => {
  return (
    <div className='optionsTable'>
      <h1 className='text- fs-2 fw-normal' style={{ marginLeft: '25%', marginTop: 50 }}>Choose what suits you the best</h1>
      <table className="table table-striped mx-auto shadow-sm my-4 mb-5" style={{ width: '85%' }}>
        <thead>
          <tr>
            <th scope="col" style={{ fontWeight: 400 }}>Min (Days)</th>
            <th scope="col" style={{ fontWeight: 400 }}>Max (Days)</th>
            <th scope="col" style={{ fontWeight: 400 }}>Interest (&lt; 60)</th>
            <th scope="col" style={{ fontWeight: 400 }}>Interest (&gt; 60)</th>
            <th scope="col" style={{ fontWeight: 400 }}>Issue FD</th>
          </tr>
        </thead>
        <tbody>
          {fdir.map((fd, index) => (
            <tr key={index}>
              <td>{fd[0]}</td>
              <td>{fd[1]}</td>
              <td>{fd[2]}%</td>
              <td>{fd[3]}%</td>
              <td>
                <Link className="btn btn-outline-success" to={`/fdoptions/form?min=${fd[0]}&max=${fd[1]}&interestUnder60=${fd[2]}&interestOver60=${fd[3]}`}>Proceed</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FDOptions;
