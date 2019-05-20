import React from "react";
import styled, { keyframes } from "styled-components";

const sweep = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const SkeletonStyles = styled.div`
  position: relative;
  overflow: hidden;
  /* height: 40px; */
  margin-bottom: 10px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    animation: ${sweep} 2s infinite;
    background-image: linear-gradient(
      to left,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
  }
  .product {
    min-height: 35rem;
    width: 100%;
    border-radius: 3px;
    background-color: rgba(58, 57, 57, 0.3);
  }
`;

const Skeleton = props => <SkeletonStyles><div className="product" /></SkeletonStyles>;

export default Skeleton;
