import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Row from "antd/lib/row";
import Loading from "./Loading";
import { FaRegStar, FaStar } from "react-icons/fa";
import TimeAgo from "react-timeago";

const QUERY = gql`
  query Traffic {
    reviews {
      reviewerName
      description
      starRating
      timestamp
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription Traffic {
    reviews {
      reviewerName
      description
      starRating
      timestamp
    }
  }
`;

class Message extends Component {
  state = {
    reviews: []
  };

  componentDidMount() {
    this.props.subscribeToNewData();
  }

  componentDidUpdate(prevProps) {
    const reviews = this.state.reviews;

    if (this.props.data.reviews !== prevProps.data.reviews) {
      const appendedReviews = reviews.concat(this.props.data.reviews);

      this.setState({ reviews: appendedReviews });
      //this.state.reviews.push(this.props.data.ReviewData);
    }
  }

  render() {
    const { data, error, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <p>Error!</p>;
    }
    var reviews = this.state.reviews || [];
    reviews = reviews.reverse();
    var messageDiv = [];
    for (var i = 0; i < reviews.length; i++) {
      var stars = [];

      console.log("kerem", reviews);
      for (var j = 0; j < reviews[i].starRating; j++) {
        stars.push(<FaStar />);
      }
      for (var k = 0; k < 5 - reviews[i].starRating; k++) {
        stars.push(<FaRegStar />);
      }
      messageDiv.push(
        <Row>
          <div style={{ border: `2px solid #aaa`, height: "100%" }}>
            <div style={{ background: "#3274C2", padding: 5, color: "#fff" }}>
              <div style={{ textAlign: "left" }}>
                <strong>
                  {reviews[i].reviewerName} {stars}{" "}
                </strong>
                <TimeAgo date={reviews[i].timestamp} />
              </div>
            </div>
            <div style={{ padding: 5 }}>{reviews[i].description}</div>
          </div>
        </Row>
      );
    }

    return <React.Fragment>{messageDiv}</React.Fragment>;
  }
}

export default class MessageContainer extends Component {
  render() {
    return (
      <Query query={QUERY}>
        {({ subscribeToMore, ...result }) => (
          <Message
            {...result}
            subscribeToNewData={() =>
              subscribeToMore({
                document: SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;
                  return subscriptionData.data;
                }
              })
            }
          />
        )}
      </Query>
    );
  }
}
