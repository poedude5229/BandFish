import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button
        id="pfp-button"
        style={{ cursor: "pointer", border: "none" }}
        onClick={toggleMenu}
      >
        <img
          src={user.profile_pic}
          style={{ width: "45px", height: "45px", borderRadius: "50%" }}
        />
      </button>
      {showMenu && user && (
        <>
          <ul className={"profile-dropdown"} ref={ulRef}>
            {user && (
              <>
                <li
                  style={{
                    height: "50px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "rgba(0,0,0,0)",
                      fontSize: "32px",
                    }}
                  >
                    {user.username}
                  </span>
                  <span
                    style={{ backgroundColor: "rgba(0,0,0,0)" }}
                    id="profile-button-link"
                  >
                    <NavLink
                      to="/profile"
                      style={{
                        color: "#8d8d8d",
                        backgroundColor: "rgba(0,0,0,0)",
                        textDecoration: "none",
                      }}
                      onClick={closeMenu}
                    >
                      profile
                    </NavLink>
                  </span>
                </li>
                <li>
                  <NavLink
                    style={{
                      backgroundColor: "rgba(0,0,0,0)",
                      textDecoration: "none",
                      color: "black",
                      fontSize: "28px",
                    }}
                    to="/new"
                  >
                    upload media
                  </NavLink>
                </li>
                <li>
                  <button
                    style={{ fontSize: "28px" }}
                    id="logout-button"
                    onClick={logout}
                  >
                    log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </>
  );
}

export default ProfileButton;
