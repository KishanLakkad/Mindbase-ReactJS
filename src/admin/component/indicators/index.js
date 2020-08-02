import React from "react";
import Sidebar from "./../../common/Sidebar.js";
import Navbar from "./../../common/Navbar.js";
import Footer from "./../../common/Footer.js";
import BreadCrumb from "./../../common/BreadCrumb.js";
import DashboardSummary from "./../../common/dashboard/Summary.js";
import TopIncidents from "./../../common/dashboard/TopIncidents.js";
import IndicatorOverView from "./../../common/dashboard/IndicatorOverView.js";

class Indicators extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState(){
    return {
      page: "Indicator Page"
    }
  }
  componentDidMount(){
    document.title = "Mindbase Indicators"
  }
  render(){
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid" style={{paddingTop: 15}}>
            <div className="row" style={{backgroundColor: "#FFFFFF",borderRadius: 20,marginLeft: 0,marginRight: 0}}>
              <div className="col-md-4" style={{padding: 15}}>
                <span>Current Indicators</span>
              </div>
              <div className="col-md-4" style={{padding: 15}}>
                <div className="form-group has-search">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input type="text" className="form-control" style={{backgroundColor: "#f2f2f2",borderRadius: 50}} placeholder="Search" />
                </div>
              </div>
              <div className="col-md-4 text-right" style={{padding: 15}}>
                <span style={{paddingLeft: 20,paddingRight: 20,paddingTop: 5,paddingBottom: 5,backgroundColor: "#48e2b4",borderRadius: 7,textAlign: "center",cursor: "pointer",color: "white"}}>Update</span>
              </div>
              <div className="col-md-12" style={{marginTop: 15}}>
                <div className="custom-grid-mood">
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Mood</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Stress</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Rest</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Thoughts</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50,backgroundColor: "#65bddf"}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10,color: "#65bddf"}}>Breath</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Shift</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Ground</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Step</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Mood</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Stress</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Rest</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Thoughts</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50,backgroundColor: "#65bddf"}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10,color: "#65bddf"}}>Breath</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Shift</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Ground</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Step</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Mood</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Stress</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Rest</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Thoughts</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50,backgroundColor: "#65bddf"}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10,color: "#65bddf"}}>Breath</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Shift</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Ground</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Step</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Mood</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Stress</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Rest</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Thoughts</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50,backgroundColor: "#65bddf"}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10,color: "#65bddf"}}>Breath</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Shift</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Ground</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Step</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Mood</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Stress</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Rest</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Thoughts</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50,backgroundColor: "#65bddf"}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10,color: "#65bddf"}}>Breath</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Shift</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Ground</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Step</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                  <div className="text-center" style={{padding: 5}}>
                    <div className="card" style={{marginBottom: 5}}>
                      <div className="card-body text-center" style={{padding: 5,height: 50}}>

                      </div>
                    </div>
                    <span style={{fontSize: 10}}>Get Help</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Indicators
