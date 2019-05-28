import styled, { keyframes } from "styled-components";

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
      margin-right: -3rem;
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

      @media only screen and (max-width: 43.75em) {
        margin-right: -4rem;
      }
    }
  }
  .searchIcon {
    margin-right: -3rem;
    cursor: text;
    z-index: 1;
  }

  .clearSearch {
    cursor: text;
    z-index: 1;
  }

  @media only screen and (max-width: 43.75em) {
    order: 1;
    flex: 0 0 100%;
    margin-left: -1rem;
  }
`;

export { StyledSearch };
