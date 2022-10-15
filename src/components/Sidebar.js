import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((value, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = value.link;
              }}
            >
              {" "}
              <div id="icon">{value.icon}</div>{" "}
              <div id="title">{value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
