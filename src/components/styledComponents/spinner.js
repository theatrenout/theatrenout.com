import React from "react";
import styled from "styled-components";

import theme from "../../theme";


const SpinnerIcon = styled.div`
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }

  &:before {
    content: '';
    box-sizing: border-box;
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border-top: 2px solid ${theme.color.light};
    border-right: 2px solid transparent;
    animation: spinner .6s linear infinite;
  }
`

const SpinnerContainer = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spinner = (props) =>
  <SpinnerContainer className={props.className}>
    <SpinnerIcon />
  </SpinnerContainer>

export default Spinner;
