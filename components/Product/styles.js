import styled from "styled-components";

export const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  margin-top: 1rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    display: inline;
    line-height: 1.3;
    font-size: 1.6rem;
    text-align: center;
    color: ${props => props.theme.black};
    padding: 0 1rem;
  }
`;

export const ProductStyles = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  cursor: pointer;
  img {
    width: 100%;
    object-fit: cover;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export const PriceTag = styled.span`
  color: ${props => props.theme.primaryColor};
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 1.6rem;
  display: inline-block;
`;

export const OldPriceTag = styled.span`
  color: ${props => props.theme.lightgrey};
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 1.2rem;
  display: inline-block;
`;

const TestButton = styled.button`
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
