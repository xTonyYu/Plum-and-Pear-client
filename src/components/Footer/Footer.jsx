import React from 'react';
import { ExternalLink } from 'react-external-link'
import { NavLink, Link } from 'react-router-dom';
import './Footer.css'

const Footer = ({currentUser, admin, logout}) => {
  
  return(
    <footer>

        <section className="about-me">
            <p>
            Copyright &copy; {(new Date().getFullYear())} Tony Yu  
            </p>
            <div className="ext-links">
              <ExternalLink href="mailto:xtonyyu@gmail.com" className="footer-div"><i className="fa fa-envelope-square fa-2x"></i></ExternalLink>
              <ExternalLink href="https://www.linkedin.com/in/xtonyyu/" target="_blank" className="footer-div"><i className="fa fa-linkedin fa-2x"></i></ExternalLink>
              <ExternalLink href="https://github.com/xTonyYu" target="_blank" className="footer-div"><i className="fa fa-github-square fa-2x"></i></ExternalLink>
            </div>
        </section>
        <section className="about-site">
          <div className="storegit">
            <p>Store Github:  </p>
            <ExternalLink href="https://github.com/xTonyYu/Plum-and-Pear-client" target="_blank" className="footer-div"><i className="fa fa-github-square fa-2x"></i></ExternalLink>
          </div>
          <div className="apigit">
            <p>API Github:  </p>
            <ExternalLink href="https://github.com/xTonyYu/Plum-and-Pear-api" target="_blank" className="footer-div"><i className="fa fa-github-square fa-2x"></i></ExternalLink>
          </div>
        </section>
    </footer>
  )
}

export default Footer;