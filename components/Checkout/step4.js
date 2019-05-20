import React from "react";
import Button from "../Button/styles";
import ChargeMyCard from "./ChargeMyCard";

const Step4 = props => {
  return (
    <>
      <p>Please click on the button below to start the payment process.</p>
      <ChargeMyCard user={props.user} cart={props.cart} values={props.values} shippingTypes={props.shippingTypes}>
        <Button style={{ marginTop: "3rem" }}>Pay with Credit Card</Button>
      </ChargeMyCard>
    </>
  );
};

export default Step4;
