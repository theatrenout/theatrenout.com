import React from "react";
import remark from "remark";
import reactRenderer from "remark-react";


const ReviewsList = props =>
  <div className="reviews-list">
    {props.children}
  </div>

const Review = props =>
  <blockquote className="reviews-review">
    {props.children}
  </blockquote>

const Text = props =>
  <div className="reviews-text">
    {props.children}
  </div>

const Author = props =>
  <p className="reviews-author">
    {props.children}
  </p>

export default class SpectacleReviews extends React.Component {
  render() {
    return (
      <div>
        <ReviewsList>
          {this.props.reviews.map((review, index) => (
            <Review
              key={index}
            >
              <Text>{remark().use(reactRenderer).processSync(review.text).contents}</Text>
              <Author>{review.author}</Author>
            </Review>
          ))}
        </ReviewsList>
      </div>
    );
  }
}
