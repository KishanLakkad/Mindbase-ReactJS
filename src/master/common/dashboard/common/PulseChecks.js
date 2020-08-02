import React from "react";

class PulseChecks extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState(){
    return {

    }
  }
  componentDidMount(){

  }
  render(){
    return (
 <div className="bg-image bg-image2">
        <div className="small-box" style={{borderRadius: 20,overflow: "hidden"}}>
        <div className="inner">
          <div className="row">
            <div className="col-7">
              <p style={{marginBottom: 10,fontSize: 14,color: "#FFFFFF"}}>Event Checks</p>
              <h3 style={{fontSize: 24,color: "#FFFFFF"}}>0</h3>
            </div>
            <div className="col-5">
              <span style={{cursor: "pointer",display: "block",textAlign: "center",marginBottom: 5,fontSize: 10,color: "white",backgroundColor: "#FFFFFF29",padding: "6px 12px",borderRadius: 15}}>Today</span>
              <span style={{cursor: "pointer",display: "block",textAlign: "center",marginBottom: 5,fontSize: 10,color: "white",backgroundColor: "#FFFFFF29",padding: "6px 12px",borderRadius: 15}}>This Week</span>
              <span style={{cursor: "pointer",display: "block",textAlign: "center",marginBottom: 5,fontSize: 10,color: "white",backgroundColor: "#FFFFFF29",padding: "6px 12px",borderRadius: 15}}>This Month</span>
            </div>
          </div>
        </div>
      </div>
 </div>
    )
  }
}

export default PulseChecks
