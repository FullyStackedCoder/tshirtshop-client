import styled from "styled-components";

const Form = styled.form`
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    font-size: 1.6rem;
    border: 1px solid black;
    border-radius: 4px;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.primaryColor};
    }
  }
  button,
  input[type="submit"] {
    background: ${props => props.theme.primaryColor};
    color: white;
    border: 0;
    border-radius: 4px;
    font-size: 1.6rem;
    font-weight: 700;
    padding: 0.6rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }
  }
  p {
    margin: 3rem 0 0.5rem 0;
    font-size: 2rem;
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    /*safari and chrome*/
    select {
      height: 30px;
      line-height: 30px;
      background: #f4f4f4;
    }
  }
`;

export default Form;
