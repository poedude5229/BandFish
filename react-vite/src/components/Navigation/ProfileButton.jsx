import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { NavLink, useNavigate } from "react-router-dom";
import cart from "../../../public/cart.png";
import "./ProfileButton.css";
function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const albums = useSelector((state) => state.albumReducer);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef();
  // let albItems = [];
  // albums?.forEach((album) => {
  //   const albDetails = album ?? [];
  //   albItems.push(...albDetails);
  // });
  // console.log(albItems);
  useEffect(() => {
    const storedCartState = localStorage.getItem("cartState");
    if (storedCartState) {
      dispatch(setCartState(JSON.parse(storedCartState)));
    }
  }, [dispatch]);
  let cartItems = useSelector((state) => state.cart);
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartState", JSON.stringify(cartState));
    } else if (cartItems.length == 0) {
      localStorage.removeItem("cartState");
    }
  });

  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    }
    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen]);

  const navigate = useNavigate();
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
      {user && (
        <img
          src={cart}
          id="cart-button"
          alt="The shopping cart logo. You don't need an alt tag for everything"
          onClick={() => {
            setCartOpen(cartOpen === true ? false : true);
          }}
        />
      )}
      <button
        id="pfp-button"
        style={{ cursor: "pointer", border: "none" }}
        onClick={toggleMenu}
      >
        {user && (
          <img
            src={user?.profile_pic}
            style={{ width: "45px", height: "45px", borderRadius: "50%" }}
          />
        )}
      </button>
      {user && cartOpen && (
        <>
          <div className="cartMenu">
            <div class="triangle-container">
              <div class="triangle-top"></div>
              <div class="triangle-bottom"></div>
            </div>
            <span id="cart-title">Shopping Cart</span>
            <hr id="cart-break-top" />
            <span
              id="cart-close-button"
              title="Close Cart"
              onClick={() => setCartOpen(false)}
            >
              X
            </span>
          </div>
        </>
      )}
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
