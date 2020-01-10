import React from "react";

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: "log",
      channelName: "",
      logType: "information",
      isLogData: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    if (name === "dataType" && value === "statistic") {
      this.state.isLogData = false;
    } else {
      this.state.isLogData = true;
    }
    console.log("ker6", target);
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.channelName);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Select Data Type:
          <select
            name="dataType"
            value={this.state.dataType}
            onChange={this.handleInputChange}
          >
            <option value="log">Log</option>
            <option value="statistic">Statistic</option>
          </select>
        </label>
        <br />
        {this.state.isLogData && (
          <div>
            <label>
              Select Log Level:
              <select
                name="logType"
                value={this.state.logType}
                onChange={this.handleInputChange}
              >
                <option value="log">Information</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </label>
          </div>
        )}

        <label>
          Name:
          <input
            type="text"
            name="channelName"
            value={this.state.channelName}
            onChange={this.handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
        <br />
      </form>
    );
  }
}

export default SubscribeForm;
