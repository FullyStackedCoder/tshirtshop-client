import styled, { keyframes } from "styled-components";

const glow = keyframes`
  from {
    box-shadow: 0 0 0px #0590c7;
  }
  to {
    box-shadow: 0 0 10px 1px #0590c7;
  }
`;

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
  height: 40rem;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  cursor: pointer;
  .side {
    font-size: 2rem;
    height: 52rem;
    transition: all 0.8s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 1.5rem 4rem rgba($color-black, 0.15);
    &__front {
      background-color: $color-white;
    }
    &__back {
      transform: translateY(-100%);
    }
  }
  img {
    width: 100%;
    object-fit: cover;
  }
  p {
    font-size: 1.2rem;
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
  &:hover {
    animation: ${glow} 0.5s ease-in-out infinite alternate;
  }
  &:hover .side__front {
  }
  &:hover .side__back {
    transform: translateY(0);
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

export const NewProductStyles = styled.div`
  width: 100%;
  height: 38rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  text-align: left;
  @media only screen and (max-width: 971px) {
    height: 52rem;
  }
  @media only screen and (max-width: 920px) {
    height: 48rem;
  }
  @media only screen and (max-width: 840px) {
    height: 46rem;
  }
  @media only screen and (max-width: 780px) {
    height: 44rem;
  }
  @media only screen and (max-width: 740px) {
    height: 40rem;
  }
  @media only screen and (max-width: 700px) {
    height: 38rem;
  }
  @media only screen and (max-width: 37.5em) {
    height: 50rem;
  }
  .box-up {
    width: 100%;
    height: 80%;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .box-down {
    width: 100%;
    height: 60px;
    position: relative;
    overflow: hidden;
  }
  .img {
    width: 100%;
    object-fit: cover;
    -webkit-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
    -moz-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
    -o-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
    transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
  }
  .heading {
    font-size: 1.8rem;
    margin: 0 1rem;
    text-align: center;
    margin-top: 1rem;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    -webkit-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
    -moz-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
    -o-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
    transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    a {
      display: inline;
      line-height: 1.3;
      font-size: 1.8rem;
      text-align: center;
      color: ${props => props.theme.black};
      padding: 0 1rem;
    }
  }
  .aSizes {
    -webkit-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
    -moz-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
    -o-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
    transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    position: absolute;
    width: 100%;
    bottom: -2rem;
    opacity: 0;
  }
  .h-bg {
    -webkit-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
    -moz-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
    -o-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
    transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.primaryColor};
    position: absolute;
    left: -100%;
    border-radius: 4px;
  }

  .h-bg .h-bg-inner {
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.primaryColor};
    border-radius: 4px;
  }
  .priceBox {
    backface-visibility: hidden;
    -webkit-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
    -moz-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
    -o-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
    transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
    /* ease-out */
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .priceTag {
      color: ${props => props.theme.primaryColor};
      font-weight: 600;
      padding: 5px;
      line-height: 1;
      font-size: 1.6rem;
      display: inline-block;
    }
    .oldPriceTag {
      color: ${props => props.theme.lightgrey};
      font-weight: 600;
      padding: 5px;
      line-height: 1;
      font-size: 1.2rem;
      display: inline-block;
    }
    .viewDetails {
      color: ${props => props.theme.offWhite};
      display: none;
    }
  }
  &:hover .img {
    filter: blur(7px);
    filter: progid:DXImageTransform.Microsoft.Blur(pixelradius='7', shadowopacity='0.0');
    opacity: 0.4;
  }
  &:hover .heading {
    transform: translateY(-120%);
    @media only screen and (max-width: 998px) {
      transform: translateY(-180%);
    }
  }
  &:hover .aSizes {
    -webkit-transition-delay: 300ms;
    -o-transition-delay: 300ms;
    transition-delay: 300ms;
    bottom: 1rem;
    opacity: 1;
    @media only screen and (max-width: 998px) {
      bottom: 1rem;
    }
  }
  &:hover .h-bg {
    left: 0px;
  }
  &:hover .priceBox {
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  &:hover .priceBox .priceTag {
    color: ${props => props.theme.offWhite};
  }
  &:hover .priceBox .oldPriceTag {
    display: none;
  }
  &:hover .priceBox .viewDetails {
    display: inline-block;
  }
`;
