import styled from "styled-components";

const PaginationStyles = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${props => props.theme.lightgrey};
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 10px 10px;
    border-right: 1px solid ${props => props.theme.lightgrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled="true"] {
    color: grey;
    pointer-events: none;
  }
`;

const PaginationClass = styled.div`
  margin: 2rem 0;
  display: inline-block;
  a {
    color: black;
    float: left;
    padding: 0.8rem 1.6rem;
    text-decoration: none;
    transition: background-color 0.3s;
    border: 1px solid #ddd;
    margin: 0 4px;
  }
  a.active {
    background-color: #0590c7;
    color: white;
    border: 1px solid #0590c7;
  }
  a:hover:not(.active) {
    background-color: #ddd;
  }
  a[aria-disabled="true"] {
    color: grey;
    cursor: not-allowed;
    pointer-events: none;
  }
  a.mobile {
    @media only screen and (max-width: 43.75em) {
      display: none;
    }
  }
`;

export default PaginationStyles;
export { PaginationClass };
