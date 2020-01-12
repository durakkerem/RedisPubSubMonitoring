import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { VictoryPie, VictoryLabel } from "victory";
import RetroHitCounter from "react-retro-hit-counter";

import Loading from "./Loading";

const QUERY = gql`
  query REVIEWCOUNT {
    reviewCount {
      percentage
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription REVIEWCOUNT {
    reviewCount {
      percentage
    }
  }
`;

class CpuUsage extends Component {
  componentDidMount() {
    this.props.subscribeToNewData();
  }

  render() {
    const { data, error, loading } = this.props;
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <p>Error!</p>;
    }
    return (
      <div style={{ textAlign: "center" }}>
        <RetroHitCounter
          hits={data.reviewCount.percentage}
          withBorder={true}
          withGlow={true}
          minLength={4}
          size={70}
          padding={4}
          digitSpacing={3}
          segmentThickness={5}
          segmentSpacing={0.5}
          segmentActiveColor="#86C047"
          segmentInactiveColor="#202e11"
          backgroundColor="#222222"
          borderThickness={7}
          glowStrength={0.5}
        />
      </div>
    );
  }
}

const ReviewCounterContainer = () => (
  <div>
    <Query query={QUERY}>
      {({ subscribeToMore, ...result }) => (
        <CpuUsage
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
  </div>
);

export default ReviewCounterContainer;
