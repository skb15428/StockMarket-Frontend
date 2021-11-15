import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeIndex,setActiveIndex] = React.useState(0);
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${activeIndex === 0 && `active`}`} onClick={()=>setActiveIndex(0)}>
            <Link className="nav-link" to="/admin">
              Manage Company
            </Link>
          </li>
          <li className={`nav-item ${activeIndex === 1 && `active`}`} onClick={()=>setActiveIndex(1)}>
            <Link className="nav-link" to="/admin/exchange">
              Manage Exchange
            </Link>
          </li>
          <li className={`nav-item ${activeIndex === 2 && `active`}`} onClick={()=>setActiveIndex(2)}>
            <Link className="nav-link" to="/admin/data">
              Import Data
            </Link>
          </li>
          <li className={`nav-item ${activeIndex === 3 && `active`}`} onClick={()=>setActiveIndex(3)}>
            <Link className="nav-link" to="/admin/ipo">
              Update IPO details
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
