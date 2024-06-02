import { NavLink } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import "./Landing.css";

export function Landing() {
  return (
    <>
      <div style={{ width: "100%", position: "absolute", left: "0", top: "0" }}>
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
        <div id="sidebar-promo-container">
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
          <div id="aic-promo">
            <img
              src="https://bandfishbucket.s3.amazonaws.com/Alice-In-Chains-Unplugged-2.jpg"
              alt="Layne staley being cute"
            />
            <div id="aic-link">
              <NavLink>
                You'll have "No Excuses" not to check out Alice in Chains
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <h3 id="rest-of-page-header">Hot right now...</h3>
    </>
  );
}
