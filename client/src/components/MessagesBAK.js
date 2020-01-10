import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Row from "antd/lib/row";

import Loading from "./Loading";
//import { message } from "antd";

const QUERY = gql`
  query ReviewData {
    ReviewData {
      reviewerName
      reviewText
      createdAt
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription ReviewData {
    ReviewData {
      reviewerName
      reviewText
      createdAt
    }
  }
`;

class Message extends Component {
  state = {
    reviews: []
  };

  componentDidMount() {
    this.props.subscribeToNewData();
    console.log("kerem", this.props);
  }

  componentDidUpdate(prevProps) {
    const { data: { ReviewData: nextReviewData = {} } = {} } = this.props;
    const { data: { ReviewData: prevReviewData = {} } = {} } = prevProps;
    const reviews = this.state.reviews;
    //console.log("kerem1", data);

    if (
      !this.props.data.ReviewData &&
      this.props.data.ReviewData !== prevProps.data.ReviewData
    ) {
      reviews.push(this.props.data.ReviewData);
      const appendedReviews = reviews;

      this.setState({ reviews: appendedReviews });
      //this.state.reviews.push(this.props.data.ReviewData);
    }
  }

  render() {
    const { error, loading } = this.props;
    const { reviews } = this.state;

    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <p>Error!</p>;
    }
    return (
      <>
        {reviews.map(message => (
          <Row>
            <div style={{ padding: 5, color: `${message.createdAt}` }}>
              {message.reviewText}
            </div>
          </Row>
        ))}
      </>
    );
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
