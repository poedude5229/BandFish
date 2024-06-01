import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul id="topNavbar">
      <li>
        <NavLink id="home-navlink" to="/">
          <img src="https://bandfishbucket.s3.amazonaws.com/bf.png" />
          bandfish
        </NavLink>
      </li>

      <li style={{paddingRight: "12px"}}>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
