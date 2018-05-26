import React from "react";


export const SectionTitle = props =>
  <h1 className="section-title">
    {props.children}
  </h1>

const SectionContainer = props =>
  <div className="section-container">
    {props.children}
  </div>

const SectionWrapper = props =>
  <div className="section-wrapper">
    {props.children}
  </div>

export default class StyledSection extends React.Component {
  render() {
    return (
      <SectionContainer
        className={this.props.className}
      >
        <SectionWrapper>
          {this.props.children}
        </SectionWrapper>
      </SectionContainer>
    );
  }
}
