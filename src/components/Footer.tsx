import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import ContentWrapper from "./ContentWrapper";

import { GITHUB_PROFILE, LINKEDIN_PROFILE, TWITTER_PROFILE } from "@/constants";
import "@/styles/scss/other/components/footer.scss";
import { memo } from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms of use</li>
          <li className="menuItem">Privacy Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          <span className="text">
            © 2023 Movie App |{" "}
            <span className="font-bold hover:underline">Movix</span>
          </span>
          <div className="text">
            All rights reserved. By:{" "}
            <span className="font-bold hover:underline">Vaibhav Chopra</span>
          </div>
        </div>
        <div className="socialIcons">
          <a href={GITHUB_PROFILE} target="_blank" className="icon">
            <FaGithub />
          </a>
          <a href={TWITTER_PROFILE} target="_blank" className="icon">
            <FaTwitter />
          </a>
          <a href={LINKEDIN_PROFILE} target="_blank" className="icon">
            <FaLinkedin />
          </a>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default memo(Footer);
