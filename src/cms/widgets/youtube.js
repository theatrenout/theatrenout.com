import React from "react";
import styled from "styled-components";

import YoutubeVideo from "../../components/pellicule/youtubeVideo";


const YoutubeThumbContainer = styled.div`
  flex: 0 0 auto;
  height: 100px;
  width: 178px;
  background-color: black;
  border-radius: 5px;
`

const YoutubeThumb = styled(YoutubeVideo)`
  height: 100px;
  width: 178px;
  border-radius: 5px;
`

const YoutubeThumbPreview = styled(YoutubeVideo)`
  height: 300px;
  width: 533px;
`

const TextDiv = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`

const YoutubeInput = styled.input`
  flex: 0 0 auto
  color: #444a57;
  font-size: 15px;
  line-height: 1.5;
`

const ErrorDiv = styled.p`
  color: red;
  margin: 0;
  padding: 0;
  flex: 1 0 auto;
`

export class YoutubeControl extends React.Component {
  constructor(props) {
    super(props);

    this.getValue = this.getValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getValue() {
    return this.props.value ? this.props.value : '';
  }

  onChange(e) {
    this.props.onChange(e.currentTarget.value);
  }

  isValid() {
    if (this.props.value &&
      !this.props.value.startsWith("https://youtu.be/") &&
      !this.props.value.startsWith("https://www.youtube.com/")) {
        return { error: 'This is not a valid Youtube URL.' };
    }
    return true;
  };

  render() {
    const video = this.props.value ? this.getValue() : '';
    let isValid = false;
    let hasError = false;
    let errorMessage = '';
    if (this.props.value) {
      if (this.isValid() === true) {
        isValid = true;
      }
      else {
        hasError = true;
        errorMessage=this.isValid().error;
      }
    }

    return (
      <div className="nc-controlPane-widget">
        <YoutubeThumbContainer>
          {isValid ? (
              <YoutubeThumb
                url={video}
              />
            )
          : null }
        </YoutubeThumbContainer>
        <TextDiv>
          <YoutubeInput
            type='text'
            value={video}
            placeholder='Copiez ici un lien vers une vidéo ou une liste de lecture YouTube'
            onChange={this.onChange}
          />
        { !hasError ? (
              <ErrorDiv>
                {errorMessage}
              </ErrorDiv>
            )
          : null }
        </TextDiv>
      </div>
    );
  }
}

export class YoutubePreview extends React.Component {
  render() {
    return (
      <div>
        <YoutubeThumbPreview
          url={this.props.value}
        />
      </div>
    )
  }
}
