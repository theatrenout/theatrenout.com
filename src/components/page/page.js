import styled from "styled-components";

import theme from "../../theme";
import Icon from "../styledComponents/icon";
import GradientWrapper from "../styledComponents/gradientWrapper";


export const PageContainer = styled.article`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  width: 100%;
`

export const PageTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: ${theme.color.lighter};

  ${theme.media.desktop} {
    font-size: 2.7rem;
  }
`

export const PageSubtitle = styled.h2`
  font-size: 1.1rem;
  font-style: italic;
  margin: .5rem 0 0;
  color: ${theme.color.light};

  ${theme.media.desktop} {
    font-size: 1.5rem;
  }
`

export const PageSeparator = styled(Icon).attrs({
  type: 'nout',
  role: 'presentation',
})`
  display: block;
  width: 4rem;
  margin: .5rem;
  color: ${theme.color.lighter};
`

export const PageOverview = styled.p`
  margin: .5rem 0 0;

  ${theme.media.desktop} {
    margin: .5rem 20% 0;
  }
`

export const PageInfo = styled(GradientWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  color: ${theme.color.light};
`
