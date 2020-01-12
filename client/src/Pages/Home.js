import React, { Component } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

import ReviewCounter from "../components/ReviewCounter";
import Header from "../components/Header";
import Activity from "../components/Activity";
import Distribution from "../components/Distribution";
import Messages from "../components/Messages";

import "../home.css";
const Label = ({ title }) => (
  <div
    style={{
      width: "100%",
      background: "#000",
      color: "#fff",
      height: 35,
      textAlign: "center",
      fontSize: "1.3em",
      padding: 4
    }}
  >
    {title}
  </div>
);

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />

        <div style={{ margin: "20px 40px" }}>
          <Row type="flex" gutter={8}>
            <Col span={6}>
              <Label title="Real-time Reviews" />
              <br />
              <Row>
                <div className="scrollable" style={{ height: "700px" }}>
                  <Messages />
                </div>
              </Row>
              <br />
            </Col>
            <Col span={6}>
              <Label title="Activities" />
              <br />
              <Row>
                <div className="scrollable" style={{ height: "700px" }}>
                  <Activity />
                </div>
              </Row>
              <br />
            </Col>

            <Col span={5}>
              <Label title="Today's Review Count" />
              <br />
              <div style={{ height: "700px" }}>
                <ReviewCounter />
              </div>
            </Col>
            <Col span={6}>
              <Label title="Number of processed reviews" />
              <br />
              <Distribution />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
