import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Row from "antd/lib/row";
import Loading from "./Loading";
import { FaRegStar, FaStar } from "react-icons/fa";
import TimeAgo from "react-timeago";

const QUERY = gql`
  query Traffic {
    activity {
      reviewerName
      description
      starRating
      timestamp
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription Traffic {
    activity {
      reviewerName
      description
      starRating
      timestamp
    }
  }
`;

class Activity extends Component {
  state = {
    activity: []
  };

  componentDidMount() {
    this.props.subscribeToNewData();
  }

  componentDidUpdate(prevProps) {
    const reviews = this.state.activity;
    console.log("activity3", this.reviews);
    if (this.props.data.activity !== prevProps.data.activity) {
      const appendedReviews = reviews.concat(this.props.data.activity);

      this.setState({ activity: appendedReviews });
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
    var reviews = this.state.activity || [];
    console.log("activity2", this.props);

    reviews = reviews.reverse();
    var messageDiv = [];
    for (var i = 0; i < reviews.length; i++) {
      console.log("activity1", reviews);

      messageDiv.push(
        <Row>
          <div style={{ border: `2px solid #aaa`, height: "100%" }}>
            <div style={{ background: "#3274C2", padding: 5, color: "#fff" }}>
              <div style={{ textAlign: "left" }}>
                <strong>{reviews[i].reviewerName} </strong>
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
          <Activity
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
