import React from "react";

import YoutubeVideo from "../../components/pellicule/youtubeVideo";


const PelliculeContainer = props =>
  <div className="pellicule-container">
    {props.children}
  </div>

const ContentDiv = props =>
  <div className="pellicule-content">
    {props.children}
  </div>

const Control = props =>
  <div className="pellicule-control">
    {props.children}
  </div>

const StyledLink = props =>
  <a className="pellicule-link" {...props}>
    {props.children}
  </a>

export default class Pellicule extends React.Component {
  constructor(props) {
    super(props);

    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose(e) {
    e.preventDefault();
    this.props.closeHandle();
  }


  render() {

    return (
      <PelliculeContainer>
        <Control>
          <StyledLink
            href='#'
            onClick={this.onClickClose}
          >
            Fermer
          </StyledLink>
        </Control>
        <ContentDiv>
          <YoutubeVideo
            url={this.props.content.video}
          />
        </ContentDiv>
      </PelliculeContainer>
    );
  }
}
