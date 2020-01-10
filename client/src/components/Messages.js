import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Row from "antd/lib/row";

import Loading from "./Loading";

const QUERY = gql`
  query Traffic {
    reviews {
      title
      description
      color
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription Traffic {
    reviews {
      title
      description
      color
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
    const { data: { ReviewData: nextReviewData = {} } = {} } = this.props;
    const { data: { ReviewData: prevReviewData = {} } = {} } = prevProps;
    const reviews = this.state.reviews;
    console.log("kerem1", this.props);

    if (this.props.data.reviews !== prevProps.data.reviews) {
      const appendedReviews = reviews.concat(this.props.data.reviews);
      console.log("kerem7", reviews.concat(appendedReviews));

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
    const reviews = this.state.reviews || [];
    return (
      <React.Fragment>
        {reviews.map(message => (
          <Row>
            <div style={{ border: `2px solid #aaa`, height: "100%" }}>
              <div style={{ background: "#3274C2", padding: 5, color: "#fff" }}>
                <strong>{message.title}</strong>
              </div>
              <div style={{ padding: 5 }}>{message.description}</div>
            </div>
          </Row>
        ))}
      </React.Fragment>
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
