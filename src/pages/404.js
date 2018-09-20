import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";

import theme from "../theme";
import Layout from "../components/layout";
import { PageTitle, PageSubtitle, PageSeparator } from "../components/page/page";
import PageHeader from "../components/page/pageHeader";


const Container = styled(PageHeader).attrs({
  tag: 'article',
})`
  padding-bottom: 0;
`

const Title = styled(PageTitle)`
  color: ${theme.color.lighter};
`

const Separator = styled(PageSeparator)`
  font-size: 2rem;
  margin-bottom: 2rem;
`

export default class ErrorPage extends React.Component {
  constructor(props) {
    super(props);

    this.siteMetadata = props.data.site.siteMetadata;
    this.page = props.data.page.frontmatter;
    this.page.slug = props.data.page.fields.slug;
  }

  render() {
    const pageTitle = this.siteMetadata.title + this.siteMetadata.titleSeparator + this.page.title;

    return(
      <Layout>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={this.page.overview} />
        </Helmet>
        <Container
          background={this.page.image}
        >
          <Title>{this.page.title}</Title>
          <Separator />
          <PageSubtitle>{this.page.overview}</PageSubtitle>
        </Container>
      </Layout>
    )
  }
}

export const query = graphql`
  query ErrorQuery {
    site {
      siteMetadata {
        title
        titleSeparator
        siteUrl
      }
    }
    page: markdownRemark(
      fields: { slug: { eq: "/404/" } }
      frontmatter: { layout: { eq: "page" } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
        image {
          full: childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        overview
      }
    }
  }
`
