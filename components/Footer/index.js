import React from "react";
import styled from "styled-components";
import FooterStyles from "./styles";

const Footer = props => (
  <FooterStyles>
    <div className="footer-container">
      <p className="copyright">Copyright &copy; 2019 T-Shirt Shop</p>
      <div className="navigation">
        <ul className="footer-list">
          <li className="footer-list-item">
            <a href="#">Contact</a>
          </li>
          <li className="footer-list-item">
            <a href="#">Privacy</a>
          </li>
          <li className="footer-list-item">
            <a href="#">Terms</a>
          </li>
        </ul>
      </div>
    </div>
  </FooterStyles>
);

export default Footer;
