import styled from "styled-components";

const UserNavStyles = styled.nav`
  align-self: stretch;

  display: flex;
  align-items: center;
  & > * {
    padding: 0 2rem;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
  }
  & > *:hover {
    background-color: rgba(0,0,0,0.10);
  }
  .icon-box {
    position: relative;
    flex-direction: column;
    justify-content: center;
  }
  .icon {
    height: 2.25rem;
    width: 2.25rem;
  }
  .notification {
    font-size: 1.2rem;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: ${props => props.theme.primaryColor};
    color: #fff;
    position: absolute;
    top: 1.2rem;
    right: 0.6rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .menu {
    display: flex;
    flex-direction: column;
    margin-top: 10rem;
  }
`;

export default UserNavStyles;
