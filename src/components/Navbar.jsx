import React from "react";
import { Link, NavLink } from "react-router-dom";
import bankLogo from "../bank3801.jpg";
import auth from "../services/authService";
import { getFds } from "../services/fdServices";
import { deleteUser } from "../services/userService";
import { transactions } from "../services/transactionService";
import html2pdf from "html2pdf.js";

const Navbar = () => {
  const user = auth.getCurrentUser();
  const handleDeleteUser = async () => {
    await deleteUser();
};


  const handleFdPdf = async () => {
    try {
      const { data: fds } = await getFds();
      fdPdf(fds);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleTransactionPdf = async () => {
    try {
      const { data: trans } = await transactions();
      transPdf(trans);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const transPdf = (trans) => {
    const pdfElement = document.createElement("div");

    // Create the content for the PDF (you can customize this based on your design)
    const pdfContent = trans
      .map((transaction) => {
        const sender =
          transaction.senderName === transaction.recieverName
            ? "Self"
            : transaction.senderName;
        return `<div style="border: 1px solid #ccc; padding: 10px; margin: auto; background-color: #f0f0f0;">
                <h1 style="text-align: center; background-color: #e0e0e0; padding: 8px; margin-bottom: 10px;">Transaction Statement</h1>
                <p><strong>Sender Name:</strong> ${sender}</p>
                <p><strong>Sender Email:</strong> ${transaction.senderEmail}</p>
                <p><strong>Sender Account Number:</strong> ${
                  transaction.senderAccountNo
                }</p>
                <p><strong>Receiver Name:</strong> ${
                  transaction.recieverName
                }</p>
                <p><strong>Receiver Email:</strong> ${
                  transaction.recieverEmail
                }</p>
                <p><strong>Receiver Account Number:</strong> ${
                  transaction.recieverAccountNo
                }</p>
                <p><strong>Amount:</strong> ${transaction.amount}</p>
                <p><strong>Transaction Type:</strong> ${
                  transaction.transactionType
                }</p>
                <p><strong>Transaction Date:</strong> ${new Date(
                  transaction.transactionDate
                ).toLocaleString()}</p>
            </div>`;
      })
      .join("");

    pdfElement.innerHTML = pdfContent;

    // Options for html2pdf
    const options = {
      filename: "transaction_statement.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate PDF
    html2pdf().from(pdfElement).set(options).save();
  };

  const fdPdf = (fds) => {
    const pdfElement = document.createElement("div");

    const pdfContent = fds
      .map(
        (fd) =>
          `<div style="border: 1px solid #ccc; padding: 10px; margin: auto; background-color: #f0f0f0;">
              <h1 style="text-align: center; background-color: #e0e0e0; padding: 8px; margin-bottom: 10px;">Fixed Deposit Register</h1>
              <p><strong>Name:</strong> ${fd.name}</p>
              <p><strong>Account Number:</strong> ${fd.accountNumber}</p>
              <p><strong>Amount:</strong> ${fd.amount}</p>
              <p><strong>Interest(per day):</strong> ${fd.interest}</p>
              <p><strong>Min Time(days):</strong> ${fd.minTime}</p>
              <p><strong>Max Time(days):</strong> ${fd.maxTime}</p>
              <p><strong>FD Date:</strong> ${new Date(
                fd.fdDate
              ).toLocaleString()}</p>
              <p><strong>Token:</strong> ${fd.token}</p>
              <p><strong>Nominee:</strong> ${fd.nominee}</p>
          </div>`
      )
      .join("");

    pdfElement.innerHTML = pdfContent;

    const options = {
      filename: "fixed_deposit_passbook.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(pdfElement).set(options).save();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand active" to="/">
          <img src={bankLogo} style={{ height: "90px" }} alt="Bank Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/balance">
                Balance
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Transaction
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/deposit">
                    Deposit
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/withdraw">
                    Withdraw
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/transfer">
                    Transfer
                  </NavLink>
                </li>
                <li>
                  {user && (
                    <button
                      className="dropdown-item"
                      onClick={handleTransactionPdf}
                    >
                      Download History
                    </button>
                  )}
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Fixed Deposit
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/fd">
                    Request FD
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/fd-withdraw">
                    Withdraw FD
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/fdoptions">
                    See options
                  </NavLink>
                </li>
                <li>
                  {user && (
                    <button className="dropdown-item" onClick={handleFdPdf}>
                      Download History
                    </button>
                  )}
                </li>
              </ul>
            </li>
          </ul>
          {user ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name.split(" ")[0]}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/password">
                      Change Password
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/pin">
                      Change PIN
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="dropdown-item btn btn-danger p-2 fs-6 fw-bold text-danger"
                      onClick={handleDeleteUser}
                    >
                      Delete Account
                    </button>
                  </li>
                </ul>
              </li>
              <li className="nav-item mt-2">
                <button
                  className="btn btn-danger shadow-sm btn-sm p-2 fs-6 fw-medium"
                  onClick={auth.logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="btn btn-warning shadow-sm btn-sm p-2 fs-6 fw-medium"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="btn btn-warning shadow-sm btn-sm ms-2 p-2 fs-6 fw-medium"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
