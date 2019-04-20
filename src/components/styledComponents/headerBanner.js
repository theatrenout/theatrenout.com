import React from "react";
import styled from "styled-components";

import theme from "../../theme";


export const HeaderBannerContainer = styled.aside`
  background-color: red;
  width: 100%;


  ${theme.media.desktop} {
    position: absolute;
    top: 0;
  }
`;

export const HeaderBannerText = styled.p`
  text-align: center;
  margin: 0;
  padding: .25rem;
`;

export const HeaderBannerLink = styled.a`
  color: white;
  text-decoration: none;
  min-height: 0;
`;
