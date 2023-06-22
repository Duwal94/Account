import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Dashboard from "./component/Dashboard";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Disputeclaim from "./Pages/Disputeclaim";
import Generalrequest from "./Pages/Generalrequest";
import Loaneligibility from "./Pages/Loaneligibility";
import Merchantqrcode from "./Pages/Merchantqrcode";
import Onlineaccount from "./Pages/Onlineaccount";
import OnlineKyc from "./Pages/OnlineKyc";
import Savingacctform from "./Pages/Savingacctform";
import SavingacctformSecond from "./Pages/SavingacctformSecond";
import Fixedacctform from "./Pages/Fixedacctform";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/OnlineKyc" element={<OnlineKyc />} />
          <Route path="/Onlineaccount" element={<Onlineaccount />} />
          <Route path="/Loaneligibility" element={<Loaneligibility />} />
          <Route path="/Generalrequest" element={<Generalrequest />} />
          <Route path="/Disputeclaim" element={<Disputeclaim />} />
          <Route path="/Merchantqrcode" element={<Merchantqrcode />} />
          <Route path="/Savings" element={<Savingacctform />} />
          <Route path="/Fixed" element={<Fixedacctform />} />
          <Route path="/SavingSecond" element={<SavingacctformSecond />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
