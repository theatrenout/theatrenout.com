import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import theme from "../theme";
import Icon from "./styledComponents/icon";


const FooterContainer = styled.footer`
  padding: 0.5rem 0;
  text-align: center;
  font-size: .8rem;
  background-color: ${theme.color.primary};
  color: ${theme.color.lighter};
`;

const FooterList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const FooterItem = styled.li.attrs({
  role: 'none',
})`
  display: flex;
  margin: 0;

  &:not(:last-child):after {
    content: "\\2022";
    padding: 0 .2rem;
  }
`

const Logo = styled(Icon)`
  height: 1rem;
`

class Footer extends React.Component {
  render() {
    return (
      <FooterContainer role="contentinfo">
        <FooterList>
          <FooterItem>
            <Logo type="theatrenout" title={this.props.siteTitle} />
          </FooterItem>
          <FooterItem>
            {
              this.props.address.street + ', ' +
              this.props.address.postalCode + ' ' +
              this.props.address.city
            }
          </FooterItem>
          <FooterItem>
            {'Tél. ' + this.props.phone}
          </FooterItem>
        </FooterList>
      </FooterContainer>
    );
  }
}

Footer.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  phone: PropTypes.string.isRequired,
}

export default Footer;
