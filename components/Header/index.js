import Link from "next/link";
import styled from "styled-components";
import NProgress from "nprogress";
import Router from "next/router";
import logoImage from "../../static/tshirtshop.png";
import Search from "../Search";
import UserNav from "../UserNav";
import UserPanel from "../UserPanel";

Router.onRouteChangeStart = () => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  font-size: 1.6rem;
  height: ${props => props.theme.headerHeightNormal};
  background-color: #fff;
  border-bottom: 1px solid #f4f2f2;
  position: sticky;
  top: 0;
  z-index: 1000;
  -webkit-box-shadow: 0 5px 5px -5px #929292;
  -moz-box-shadow: 0 5px 5px -5px #929292;
  box-shadow: 0 5px 5px -5px #929292;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-container {
    width: ${props => props.theme.maxWidth};
    height: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 43.75em) {
      flex-wrap: wrap;
      align-content: space-around;
    }
  }

  .logo {
    height: 6.25rem;
    margin-left: 2rem;
    @media only screen and (max-width: 43.75em) {
      height: 5.25rem;
    }
  }

  @media only screen and (max-width: 43.75em) {
    flex-wrap: wrap;
    align-content: space-around;
    height: ${props => props.theme.headerHeightMobile};
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="header-container">
      <Link href="/">
        <a>
          <img src={logoImage} alt="logo" className="logo" />
        </a>
      </Link>
      <Search />
      <UserNav />
      <UserPanel />
    </div>
  </StyledHeader>
);

export default Header;
