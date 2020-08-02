import React, { Component } from "react";
import DashboardSummary from "./../../common/masterDashboard/Summary.js";
import TopIncidents from "./../../common/masterDashboard/TopIncidents.js";
import IndicatorOverView from "./../../common/masterDashboard/IndicatorOverView.js";
import "../../app/styles.css";

const drawerWidth = 240;

class Dashboard extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = this.getInitState();

        this.getInitState = this.getInitState.bind(this);
    };

    componentDidMount() {

    }

    getInitState() {
        return {
            page: "Dashboard Page",
        }
    }

    render() {
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

export default Dashboard;
