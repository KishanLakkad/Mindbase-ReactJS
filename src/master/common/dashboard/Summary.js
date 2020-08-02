import React from "react";
import ActiveUsers from "./common/ActiveUsers.js";
import PeerSupportUnits from "./common/PeerSupportUnits.js";
import PulseChecks from "./common/PulseChecks.js";
import AssistanceRequests from "./common/AssistanceRequests.js";

class DashboardSummary extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState(){
    return {
      page: "Login Page"
    }
  }
  componentDidMount(){

  }
  render(){
    return (
      <div className="row" style={{paddingTop: 15}}>
        <div className="col-lg-3 col-6">
          <ActiveUsers />
        </div>
        <div className="col-lg-3 col-6">
          <PeerSupportUnits />
        </div>
        <div className="col-lg-3 col-6">
          <PulseChecks />
        </div>
        <div className="col-lg-3 col-6">
          <AssistanceRequests />
        </div>
      </div>
    )
  }
}

export default DashboardSummary
