import React, { Component } from "react";
import DashboardSummary from "./../../common/dashboard/Summary.js";
import TopIncidents from "./../../common/dashboard/TopIncidents.js";
import IndicatorOverView from "./../../common/dashboard/IndicatorOverView.js";

import "../../app/styles.css";


const drawerWidth = 240;

class AdminDashboard extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = this.getInitState();

        this.getInitState = this.getInitState.bind(this);
    };

    componentDidMount() {
        console.log("this.props.params.id", this.props.match.params.id)
        localStorage.setItem("mb_department", this.props.match.params.id)
    }

    getInitState() {
        return {
            page: "Dashboard Page",
            departmentId: this.props.match.params.id
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

export default AdminDashboard;