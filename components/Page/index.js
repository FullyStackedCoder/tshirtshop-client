import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "../Header";
import Meta from "../Meta";
import Footer from "../Footer";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  altGrey: "#929292",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  primaryColor: "#0590c7",
  primaryColorDark: "#005d82",
  prijmaryColorLight: "#00abef",
  maxWidth: "130rem",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  headerHeightNormal: "8rem",
  headerHeightMobile: "11rem",
  // Related to Responsive design
  bpHuge: "125em", // more than 2000px
  bpLargest: "75em", // 1200px
  bpLarge: "68.75em", // 1100px
  bpMedium: "56.25em", // 900px
  bpSmall: "37.5em", // 600px
  bpSmallest: "31.25em" // 500px
};

const StyledPage = styled.div`
  background-color: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(94vh - ${props => props.theme.headerHeightNormal});

  @media only screen and (max-width: 43.75em) {
    min-height: calc(94vh - ${props => props.theme.headerHeightMobile});
  }
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 62.5%;

    @media only screen and (max-width: 75em) {
      font-size: 56.25%;
    }
    @media only screen and (max-width: 56.25em) {
      font-size: 50%;
    }
    @media only screen and (min-width: 125em) {
      font-size: 75%;
    }
  }
  *, *:before, *:after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }
  body {
    font-size: 1.6rem;
    line-height: 1.7;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
  .heading-primary {
    font-size: 6rem;
    font-weight: 400;
    letter-spacing: 3.5rem;
  }
  .heading-secondary {
    font-size: 3rem;
    font-weight: 700;
  }
  .heading-tertiary {
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
          <Footer />
          <div id="backdrop-root" />
          <div id="modal-root" />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
