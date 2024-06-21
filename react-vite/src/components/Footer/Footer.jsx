import "./Footer.css";
import { FaLinkedin, FaSquareGithub } from "react-icons/fa6";
function Footer() {
  return (
    <>
      <footer id="footer">
        <div id="topfootersection">
          <ul>
            <li>
              {"© "} this site, the name BandFish and site logo were created by
              Joseph Rashid in 2024. all works unless otherwise noted are not the
              property of this site's author, are not for sale or for
              distribution and are hosted on this site solely for demonstrative
              purposes.
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
  );
}

export default Footer;
