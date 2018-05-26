import React from "react";
import styled from "styled-components";

import theme from "../../theme";

const GradientWrapper = styled.div`
  width: 100%;
  padding: 1rem 5%;
  background: rgba(30,44,136,.8);

  ${theme.media.desktop} {
    padding: 1rem 0;
    background: linear-gradient(to right, rgba(30,44,136,0) 0%, rgba(30,44,136,.8) 20%, rgba(30,44,136,.8) 80%, rgba(30,44,136,0) 100%);
  }
`

export default GradientWrapper;
