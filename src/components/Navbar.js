import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();

  console.log("Navbar");
  console.log(props.state);
  console.log(props.user_id);

  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="navbar">
        {props.state===true ?<Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} />
          </Link>:<></> }
          

          {props.state===true ?<button
            className="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Logout
          </button>:<button
            className="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button> }
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
