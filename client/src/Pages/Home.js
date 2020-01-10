import React, { Component } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

import CpuUsage from "../components/CpuUsage";
import Header from "../components/Header";
import Traffic from "../components/Traffic";
import Distribution from "../components/Distribution";
import Messages from "../components/Messages";
import SubscribeForm from "../components/SubscribeForm";
import { FaBeer } from "react-icons/fa";

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
              <Label title="Data Collector Log" />
              <br />
              <Row>
                <div className="scrollable" style={{ height: "400px" }}>
                  <Messages />
                </div>
              </Row>
              <br />
            </Col>
            <Col span={6}>
              <Label title="Data Collector Log" />
              <br />
              <Row>
                <div className="scrollable" style={{ height: "400px" }}>
                  <Messages />
                </div>
              </Row>
              <br />
            </Col>
            <Col span={6}>
              <Label title="Data Collector Log" />
              <br />
              <Row>
                <div className="scrollable" style={{ height: "400px" }}>
                  <Messages />
                </div>
              </Row>
              <br />
            </Col>
            <Col span={5}>
              <Label title="Today's Review Count" />
              <br />
              <div style={{ height: "400px" }}>
                <CpuUsage />
              </div>
            </Col>
          </Row>

          <Row type="flex" gutter={8}></Row>
          <Row type="flex" gutter={8}>
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
