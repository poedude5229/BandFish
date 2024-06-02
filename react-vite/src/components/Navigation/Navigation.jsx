import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(true);
  const ulRef = useRef();
  let user = useSelector((state) => state.session.user);
  // let session = useSelector((state) => state.sessionReducer)
  useEffect(() => {
    if (user && user !== null) {
      setShowMenu(false);
    }
  }, [user]);

  return (
    <div>
      <div>
        <ul id="topNavbar">
          <li id="home-navlink">
            <NavLink id="homenavlinkchild" to="/">
              <img src="https://bandfishbucket.s3.amazonaws.com/bf.png" />
              bandfish
            </NavLink>
          </li>

          <div style={{ position: "relative", right: "75px" }}>
            {/* <ProfileButton /> */}
            {showMenu && (
              <ul id="login-list">
                <>
                  <OpenModalMenuItem
                    style={{ color: "white" }}
                    itemText="Log in"
                    modalComponent={<LoginFormModal />}
                  />
                  <OpenModalMenuItem
                    style={{ color: "white" }}
                    itemText="Sign up"
                    modalComponent={<SignupFormModal />}
                  />
                </>
              </ul>
            )}
          </div>
        </ul>
      </div>
      <div id="secondNavbar">
        <ul id="secondNavlist">
          <li>
            <NavLink className="secondNavlist-link">Genres</NavLink>
          </li>
          <li>
            <NavLink className="secondNavlist-link">Albums</NavLink>
          </li>
          <li>
            <NavLink className="secondNavlist-link">Podcasts</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
