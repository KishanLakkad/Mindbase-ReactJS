import React from "react";
import axios from "axios";

class PeerSupportUnits extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState() {
    return {
      activeUsers: 0
    }
  }
  componentDidMount() {
    let self = this;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
    axios.get(`/user/getCountByPeer`)
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            activeUsers: response.data.data.activeUsers
          })
        }
      })
      .catch(function (error) {

      });
  }
  render() {
    return (
      <div className="bg-image bg-image5">
        <div className="small-box" style={{ borderRadius: 20, overflow: "hidden" }}>
          <div className="inner">
            <div className="row">
              <div className="col-7">
                <p style={{ marginBottom: 10, fontSize: 14, color: "#FFFFFF" }}>Peer Support Units</p>
                <h3 style={{ fontSize: 24, color: "#FFFFFF" }}>{this.state.activeUsers}</h3>
              </div>
              <div className="col-5">
                <span style={{ cursor: "pointer", display: "block", textAlign: "center", marginBottom: 5, fontSize: 10, color: "white", backgroundColor: "#FFFFFF29", padding: "6px 12px", borderRadius: 15 }}>Today</span>
                <span style={{ cursor: "pointer", display: "block", textAlign: "center", marginBottom: 5, fontSize: 10, color: "white", backgroundColor: "#FFFFFF29", padding: "6px 12px", borderRadius: 15 }}>This Week</span>
                <span style={{ cursor: "pointer", display: "block", textAlign: "center", marginBottom: 5, fontSize: 10, color: "white", backgroundColor: "#FFFFFF29", padding: "6px 12px", borderRadius: 15 }}>This Month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PeerSupportUnits
