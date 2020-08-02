import React, { Component } from "react";
import "../../app/styles.css";

const drawerWidth = 240;

class AdminDashboard extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
        };
    }
    render() {
        return (
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-3 col-sm-12 col-xs-12">
                                        <div className="blue">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p>Active User</p>
                                                    <b>390</b>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="circle0 circle1">
                                                        <span>Today</span>
                                                    </div>
                                                    <div className="circle0 circle1">
                                                        <span>This Week</span>
                                                    </div>
                                                    <div className="circle0 circle1">
                                                        <span>This Month</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-12 col-xs-12">
                                        <div className="yellow">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p>Active User</p>
                                                    <b>390</b>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="circle0 circle2">
                                                        <span>Today</span>
                                                    </div>
                                                    <div className="circle0 circle2">
                                                        <span>This Week</span>
                                                    </div>
                                                    <div className="circle0 circle2">
                                                        <span>This Month</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-12 col-xs-12">
                                        <div className="red">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p>Active User</p>
                                                    <b>390</b>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="circle0 circle3">
                                                        <span>Today</span>
                                                    </div>
                                                    <div className="circle0 circle3">
                                                        <span>This Week</span>
                                                    </div>
                                                    <div className="circle0 circle3">
                                                        <span>This Month</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-12 col-xs-12">
                                        <div className="green">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p>Active User</p>
                                                    <b>390</b>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="circle0 circle4">
                                                        <span>Today</span>
                                                    </div>
                                                    <div className="circle0 circle4">
                                                        <span>This Week</span>
                                                    </div>
                                                    <div className="circle0 circle4">
                                                        <span>This Month</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default AdminDashboard;
