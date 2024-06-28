import { NavLink } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import "./Landing.css";
import { useDispatch } from "react-redux";
import { loadAlbumsThunk } from "../../redux/album";
import { useEffect } from "react";
import { Carousel } from "../Carousel";
import { FaLinkedin, FaSquareGithub } from "react-icons/fa6";
import "../Footer/Footer.css";
// import Footer from "../Footer/Footer";
export function Landing() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAlbumsThunk());
  }, [dispatch]);
  // let albums = useSelector((state) => state.albums);
  // console.log(albums);
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
              <NavLink to="/albums/11">
                Check out Sublime&apos;s new single{" "}
                <SlArrowRight style={{ fontSize: "14px" }} />
              </NavLink>
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
              <NavLink to="/albums/1">
                We&apos;re just trying to warn you of <span>THE BRIDGE!</span>
              </NavLink>
            </div>
          </div>
          <div id="aic-promo">
            <img
              src="https://bandfishbucket.s3.amazonaws.com/Alice-In-Chains-Unplugged-2.jpg"
              alt="Layne staley being cute"
            />
            <div id="aic-link">
              <NavLink to="/albums/3">
                You&apos;ll have &quot;No Excuses&quot; not to check out Alice
                in Chains
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <h3 id="rest-of-page-header">Hot right now...</h3>
      <Carousel />
      {/* <Footer /> */}
      <>
        <footer id="footer">
          <div id="topfootersection">
            <ul>
              <li>
                {"© "} this site, the name BandFish and site logo were created
                by Joseph Rashid in 2024. all works unless otherwise noted are
                not the property of this site's author, are not for sale or for
                distribution and are hosted on this site solely for
                demonstrative purposes.
              </li>
              <li>
                <div id="about-links-container">
                  <a href="https://github.com/poedude5229">
                    Joseph Rashid On GitHub <FaSquareGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/joseph-rashid/">
                    Joseph Rashid On LinkedIn <FaLinkedin />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </footer>
      </>
    </>
  );
}
