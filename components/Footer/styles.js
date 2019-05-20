import styled from "styled-components";

const FooterStyles = styled.div`
  background-color: #333;
  padding: 2rem 0;
  font-size: 1.4rem;
  color: #f7f7f7;

  .footer-container {
    max-width: ${props => props.theme.maxWidth};
    height: 100%;
    margin: 0 auto;
    padding: 0 3rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: stretch;

    @media only screen and (max-width: ${props => props.theme.bpSmall}) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .navigation {
    justify-self: end;
    @media only screen and (max-width: ${props => props.theme.bpSmall}) {
      justify-self: center;
    }
  }
  .copyright {
    @media only screen and (max-width: ${props => props.theme.bpSmall}) {
      justify-self: center;
    }
  }
  .footer-list {
    list-style: none;
  }
  .footer-list-item {
    display: inline-block;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
  a {
    &:link,
    &:visited {
      color: #f7f7f7;
      text-decoration: none;
      text-transform: uppercase;
      display: inline-block;
    }
    &:hover,
    &:active {
      color: ${props => props.theme.primaryColor};
    }
  }

  @media only screen and (max-width: 37.5em) {
      flex-wrap: wrap;
      align-content: space-around;
    }
`;

export default FooterStyles;
