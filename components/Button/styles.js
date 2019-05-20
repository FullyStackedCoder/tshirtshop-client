import styled from "styled-components";

const Button = styled.button`
  font-size: 1.5rem;
  font-weight: 300;
  text-transform: uppercase;
  padding: 1.5rem 4rem;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.theme.primaryColor};
  color: #fff;
  ${props => props.disabled && 'background-color: #E1E1E1; color: #EDEDED;'};
  position: relative;
  overflow: hidden;
  ${props => props.disabled ? `cursor: not-allowed;` : `cursor: pointer;`};
  transition: all .2s;

  &:hover {
    background-color: ${props => props.theme.primaryColorDark};
    ${props => props.disabled && 'background-color: #E1E1E1; color: #EDEDED;'};
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
