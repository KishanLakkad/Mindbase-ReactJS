import React from "react";
import Sidebar from "./../../common/Sidebar.js";
import Navbar from "./../../common/Navbar.js";
import Footer from "./../../common/Footer.js";
import BreadCrumb from "./../../common/BreadCrumb.js";
import DashboardSummary from "./../../common/dashboard/Summary.js";
import TopIncidents from "./../../common/dashboard/TopIncidents.js";
import IndicatorOverView from "./../../common/dashboard/IndicatorOverView.js";

class Dashboard extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState(){
    return {
      page: "Dashboard Page"
    }
  }
  componentDidMount(){
    document.title = "Mindbase Dashboard"
  }
  render(){
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <DashboardSummary />
            <div className="row">
              <div className="col-md-8">
                <IndicatorOverView />
              </div>
              <div className="col-md-4">
                <TopIncidents />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Dashboard
