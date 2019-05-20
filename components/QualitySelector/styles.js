import styled from "styled-components";

const QuantitySelectorStyles = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: start;
  align-content: center;
  margin: 1.5rem 0;
  & > * {
    margin: 0;
    padding: 6px 14px;
  background-color: rgba(0, 0, 0, 0.12);
    &:first-child {
      background-color: transparent;
      padding-left: 0;
    }
    &:last-child {
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
  .selectors {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.22);
    }
  }
`;

export default QuantitySelectorStyles;
