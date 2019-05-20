import styled from 'styled-components';

const ConfirmationStyles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 3rem;
  .headings {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .delivery {
    width: 100%;
    span {
      font-weight: bold;
    }
  }
  .cart {
    width: 100%;
    margin-top: 3rem;
  }
  .checkout {
    width: 100%;
    .checkoutSummary {
      border: 1px solid ${props => props.theme.offWhite};
      box-shadow: ${props => props.theme.bs};
      padding: 2rem;
      display: grid;
      grid-template-rows: 1fr;
      grid-gap: 0.25rem;
      .totalCost {
        display: flex;
        justify-content: space-between;
        font-size: 1.6rem;
        font-weight: bold;
      }
      .breakline {
        width: 100%;
        margin: 1rem 0;
        height: 0.1rem;
        background-color: #e1e1e1;
      }
    }
  }
`;

const CartItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 38.5rem));
  grid-gap: 3rem;
`;

const CartItemStyles = styled.div`
  max-width: 100%;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr 3fr;
  grid-auto-flow: column;
  padding: 1rem;
  position: relative;
  img {
    width: 100%;
    display: block;
    object-fit: contain;
  }
  .details {
    margin: 0rem 2rem;
    font-size: 1.6rem;
  }
`;

export { ConfirmationStyles, CartItemsList, CartItemStyles }