import React from "react";
import axios from "axios";
class ActiveUsers extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState() {
    return {
      moods: {
        month: 0,
        today: 0,
        week: 0
      },
      current: "today"
    }
  }
  componentDidMount() {
    let self = this;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
    axios.get(`/dailyMood/getActiveUser`)
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            moods: response.data.data
          })
        }
      })
      .catch(function (error) {

      });
  }
  render() {
    return (
      <div className="bg-image bg-image1">
        <div className="small-box" style={{ borderRadius: "20px", overflow: "hidden" }}>
          <div className="inner">
            <div className="row">
              <div className="col-7">
                <p style={{ marginBottom: 10, fontSize: 14, color: "#FFFFFF" }}>Active Users</p>
                <h3 style={{ fontSize: 24, color: "#FFFFFF" }}>{this.state.moods[this.state.current]}</h3>
              </div>
              <div className="col-5">
                <span onClick={() => this.setState({ current: "today" })} style={{ cursor: "pointer", display: "block", textAlign: "center", marginBottom: 5, fontSize: 10, color: "white", backgroundColor: "#FFFFFF29", padding: "6px 12px", borderRadius: 15 }}>Today</span>
                <span onClick={() => this.setState({ current: "week" })} style={{ cursor: "pointer", display: "block", textAlign: "center", marginBottom: 5, fontSize: 10, color: "white", backgroundColor: "#FFFFFF29", padding: "6px 12px", borderRadius: 15 }}>This Week</span>
                <span onClick={() => this.setState({ current: "month" })} style={{ cursor: "pointer", display: "block", textAlign: "center", marginBottom: 5, fontSize: 10, color: "white", backgroundColor: "#FFFFFF29", padding: "6px 12px", borderRadius: 15 }}>This Month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ActiveUsers
