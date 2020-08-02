import React from "react";
import axios from "axios";
import {
  NavLink
} from "react-router-dom";

class Navbar extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.changeShowNavbar = this.changeShowNavbar.bind(this);
  }
  getInitState(){
    return {
      page: "Login Page"
    }
  }
  componentDidMount(){

  }
  changeShowNavbar(){
    this.props.changeShowNavbar();
  }
  render(){
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          {
            this.props.showNavBar &&
            <li onClick={this.changeShowNavbar} className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
            </li>
          }
          <li className="nav-item d-none d-sm-inline-block">
            <img src="/assets/img/MindBase1.png" style={{height: 60,marginLeft: 10}} className="img-fluid" />
          </li>
        </ul>
        <ul className="navbar-nav mx-auto">
          <li className="nav-item d-none d-sm-inline-block">
            <img src={localStorage.getItem("mb_logo") ? localStorage.getItem("mb_logo") : "/assets/img/Imagecbi.png"} style={{height: 60,marginLeft: 10}} className="img-fluid" />
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {/*<li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i style={{fontSize: 26,color: "#3F577B"}} className="fas fa-bell"></i>
              <div className="circle-checkwell" style={{position: "absolute",bottom: 20,right: 15}}></div>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">15 Notifications</span>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2"></i> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2"></i> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2"></i> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
          </li>*/}
          <li className="nav-item">
            <NavLink to="/admin/profile">
              <img src="/assets/img/user_avtar.jpg" className="img-fluid" style={{height: 40,marginLeft: 20,borderRadius: 50}} />
              <div className="circle-checkwell" style={{position: "absolute",bottom: 20,right: 8}}></div>
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
