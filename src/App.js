import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/LoginPage/Login";
import Company from "./Pages/AdminPage/ManageCompany/Company";
import Exchange from "./Pages/AdminPage/ManageExchange/Exchange";
import Data from "./Pages/AdminPage/ManageDate/Data";
import Ipo from "./Pages/AdminPage/ManageIpo/Ipo";
import UserCompany from './Pages/UserPage/Company/UserCompany'
import UserIpo from './Pages/UserPage/Ipo/UserIpo'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/admin" element={<Company />} />
          <Route exact path="/admin/exchange" element={<Exchange />} />
          <Route exact path="/admin/data" element={<Data />} />
          <Route exact path="/admin/ipo" element={<Ipo/>} />
          <Route exact path="/user" element={<UserCompany />} />
          <Route exact path="/user/ipo" element={<UserIpo />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
