import styled from "styled-components";

const CheckBoxStyles = styled.div`
  .CheckBoxGroup {
    width: 100%;
    display: inline-block;
    margin-bottom: 2rem;
  }
  .CheckBoxInput {
    display: none;
  }
  .CheckBoxLabel {
    font-size: 1.8rem;
    font-family: inherit;
    cursor: pointer;
    position: relative;
    padding-left: 3.5rem;
  }
  .CheckBoxButton {
    height: 2rem;
    width: 2rem;
    border: 2px solid ${props => props.theme.altGrey};
    border-radius: 10%;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0.2rem;
  }
  .CheckBoxButton::after {
    content: "";
    height: 1rem;
    width: 1rem;
    border-radius: 10%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.altGrey};
    opacity: 0;
    transition: opacity 0.2s;
  }
  .CheckBoxInput:checked ~ .CheckBoxLabel .CheckBoxButton::after {
    opacity: 1;
  }
`;

export default CheckBoxStyles;
