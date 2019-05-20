import styled from "styled-components";

const UserPanelStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 20%;
  min-width: 250px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr 1fr;
  ${props => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 2px solid ${props => props.theme.black};
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  .userAccountButtons {
    width: 100%;
    display: inline-grid;
    grid-template-columns: repeat(2, auto);
    align-items: stretch;
    align-content: center;
    margin: 2rem 0;
    & > * {
      margin: 0;
      padding: 15px 30px;
      text-align: center;
      border: 1px solid ${props => props.theme.lightgrey};
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      cursor: pointer;
      &:last-child {
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      &:hover {
        background-color: ${props => props.theme.lightgrey};
      }
    }
    p[aria-selected="true"] {
      color: white;
      background-color: ${props => props.theme.primaryColor};
      border-color: ${props => props.theme.primaryColor};
    }
  }
`;

export const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  padding: 0 1rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
  }
`;

export default UserPanelStyles;
