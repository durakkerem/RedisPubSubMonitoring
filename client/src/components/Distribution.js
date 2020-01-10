import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { VictoryPie, VictoryContainer } from "victory";

import Loading from "./Loading";

const QUERY = gql`
  query Distribution {
    distribution {
      x
      percentage
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription Distribution {
    distribution {
      x
      percentage
    }
  }
`;

class Distribution extends Component {
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
      <VictoryPie
        standalone={true}
        animate={{ duration: 0 }}
        height={300}
        data={data.distribution || []}
        colorScale={["#ffff66", "#99ff66", "#993333", "#666699"]}
        containerComponent={<VictoryContainer responsive={true} />}
        y="percentage"
      />
    );
  }
}

export default class DistributionContainer extends Component {
  render() {
    return (
      <div>
        <Query query={QUERY}>
          {({ subscribeToMore, ...result }) => (
            <Distribution
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
  }
}
