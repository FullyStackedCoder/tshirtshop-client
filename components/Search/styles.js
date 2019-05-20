import styled, { keyframes } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  top: 8rem;
  width: 50%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
  order: 1;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? "#f7f7f7" : "white")};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${props => (props.highlighted ? props.theme.lightgrey : "white")};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }
  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const StyledSearch = styled.div`
  flex: 0 0 40%;

  display: flex;
  align-items: center;
  justify-content: center;
  .full-width {
    width: 100%;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  input {
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.23);
      padding: 0.7rem 4rem;
      border-radius: 4px;
      width: 100%;
      transition: all 0.2s;
      position: relative;
      &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.primaryColor};
        background-color: #fff;
      }

      &.loading {
        animation: ${glow} 0.5s ease-in-out infinite alternate;
      }

      &::-webkit-input-placeholder {
        font-weight: 100;
        color: #ccc;
      }
    }
  }
  .searchIcon {
    margin-right: -3rem;
    cursor: text;
    z-index: 1;
  }

  @media only screen and (max-width: 43.75em) {
        order: 1;
        flex: 0 0 110%;
        /* background-color: var(--color-grey-light-2); */
    }
`;

export { DropDown, DropDownItem, StyledSearch };
