import React from "react";
import Sidebar from "./../../common/Sidebar.js";
import Navbar from "./../../common/Navbar.js";
import Footer from "./../../common/Footer.js";
import BreadCrumb from "./../../common/BreadCrumb.js";
import DashboardSummary from "./../../common/dashboard/Summary.js";
import TopIncidents from "./../../common/dashboard/TopIncidents.js";
import IndicatorOverView from "./../../common/dashboard/IndicatorOverView.js";
import { auth } from "./../../services/firebase";
import { db } from "./../../services/firebase";
import moment from "moment";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class Profile extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState(){
    return {
      page: "Profile Page",
      adminProfile: null
    }
  }
  componentDidMount() {
    document.title ="Mindbase | Admin Profile";
    let self = this;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("mb_autorization");
    axios.get(`/admin/${localStorage.getItem("mb_department")}`)
    .then(function (response) {
      if(response.status === 200){
        console.log(response.data);
        self.setState({
          adminProfile: response.data.data
        });
      }
    })
    .catch(function (error) {

    });
  }
  render(){
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row" style={{paddingTop: 15,paddingBottom: 20}}>
              <div className="col-md-6" style={{padding: 15}}>
                <div style={{backgroundColor: "white",padding: 15,borderRadius: 20}}>
                  {
                    this.state.adminProfile &&
                    <div>
                      <div className="text-center">
                        <img src={this.state.adminProfile.profile} style={{height: 120,borderRadius: 60}} />
                        <span style={{display: "block",fontSize: 20}}>{this.state.adminProfile.email}</span>
                      </div>
                      <div style={{marginTop: 30}}>
                        <table className="table">
                          <tr>
                            <td><span style={{fontWeight: "bold"}}>Department:</span></td>
                            <td>{this.state.adminProfile.department}</td>
                          </tr>
                          <tr>
                            <td><span style={{fontWeight: "bold"}}>Department Logo:</span></td>
                            <td><img src={this.state.adminProfile.logo} style={{height: 70}} /></td>
                          </tr>
                          <tr>
                            <td><span style={{fontWeight: "bold"}}>Email:</span></td>
                            <td>{this.state.adminProfile.email}</td>
                          </tr>
                          <tr>
                            <td><span style={{fontWeight: "bold"}}>Phone:</span></td>
                            <td>{this.state.adminProfile.phone}</td>
                          </tr>
                          <tr>
                            <td><span style={{fontWeight: "bold"}}>Join Date:</span></td>
                            <td>{moment(this.state.adminProfile.createdAt).format("DD MMM YYYY")} at {moment(this.state.adminProfile.createdAt).format("hh:mm A")}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Profile
