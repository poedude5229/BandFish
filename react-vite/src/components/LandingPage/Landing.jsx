import { NavLink } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import "./Landing.css";

export function Landing() {
  return (
    <>
      <div id="sublime-promo">
        <img
          id="fivedolla-atdoor"
          src="https://bandfishbucket.s3.amazonaws.com/5dollaatthedoor.jpg"
          alt="5 dollars at the door image"
        />

        <div id="five-dollar-div">
          <p>Lord have his grilled cheese</p>
          <div>
            <NavLink>Check this out</NavLink>
            <SlArrowRight style={{ fontSize: "14px" }} />
          </div>
        </div>
      </div>
      <div id="bbb-lpotl">
        <img
          src="https://bandfishbucket.s3.amazonaws.com/bbb3.png"
          alt="Beach Blanket Bingo Promo"
        />
        <div id="lpotl-link">
          <NavLink>
            We're just trying to warn you of <span>THE BRIDGE!</span>
          </NavLink>
        </div>
      </div>
      <div id="aic-promo"></div>
    </>
  );
}
