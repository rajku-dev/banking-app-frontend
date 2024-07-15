import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from "../logo.svg";
import Navbar from './Navbar';
import Home from './Home';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TransferMoney from './forms/transferMoney';
import WithdrawForm from './forms/withdraw';
import DepositForm from './forms/deposit';
import FDForm from './forms/fd';
import FDWithdrawForm from './forms/withdrawFD';
import LoginForm from './forms/loginForm';
import RegisterForm from './forms/registerForm';
import Balance from './balance';
import PINForm from './forms/pin';
import PasswordForm from './forms/password';
import ProtectedRoute from './protectedRoute';
import 'bootstrap/dist/css/bootstrap.css';
import '@popperjs/core/dist/umd/popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../App.css";
import FDOptions from './fdoptions';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/fdoptions" element={<FDOptions />} />
        <Route path="/" element={<Home />} />
        <Route path="/transfer" element={<ProtectedRoute element={TransferMoney} />} />
        <Route path="/withdraw" element={<ProtectedRoute element={WithdrawForm} />} />
        <Route path="/deposit" element={<ProtectedRoute element={DepositForm} />} />
        <Route path="/fd" element={<ProtectedRoute element={FDForm} />} />
        <Route path="/fd-withdraw" element={<ProtectedRoute element={FDWithdrawForm} />} />
        <Route path="/pin" element={<ProtectedRoute element={PINForm} />} />
        <Route path="/password" element={<ProtectedRoute element={PasswordForm} />} />
        <Route path="/balance" element={<ProtectedRoute element={Balance} />} />
        <Route path="/fdoptions/form" element={<ProtectedRoute element={FDForm} />} />
      </Routes>
    </Router>
  );
}

export default App;
