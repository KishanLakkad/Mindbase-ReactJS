import React from "react";
import { Link } from "react-router-dom";
import history from '../history';
import * as authUtil from "../utils/auth.util";
import { ToastContainer, toast } from "react-toastify";

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.logout = this.logout.bind(this);
  }
  getInitState() {
    return {
      page: "Login Page"
    }
  }

  componentDidMount() { }

  logout() {
    authUtil.logout();
    toast.success("You have been successfully logged out!");
    history.push("/");
  };

  render() {
    return (
      <>
        <ToastContainer />
        <aside className="main-sidebar sidebar-light-primary">
          <a className="brand-link">
            <span className="brand-text font-weight-light">&nbsp;</span>
          </a>
          <div className="sidebar">
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                <li className="nav-item">
                  <Link to="/master/dashboard" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Dashboard
                  </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/master/department" className="nav-link">
                    <i className="nav-icon 	fas fa-users"></i>
                    <p>
                      Department
                  </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/master/message" className="nav-link">
                    <i className="nav-icon far fa-envelope"></i>
                    <p>
                      Message
                  </p>
                  </Link>
                </li>


                <li className="nav-item">
                  <Link to="/master/activity" className="nav-link">
                    <i className="nav-icon fas fa-skating"></i>
                    <p>
                      Activity
                  </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/master/icon" className="nav-link">
                    <i className="nav-icon fas fa-icons"></i>
                    <p>
                      Icons
                  </p>
                  </Link>
                </li>
                <li className="nav-item">

                  <Link to="/master/music" className="nav-link">
                    <i className="nav-icon fas fa-music"></i>
                    <p>
                      Music
                  </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/master/feedback" className="nav-link">
                    <i className="nav-icon fas fa-comments"></i>
                    <p>
                      Feedback
                  </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/master/gethelp" className="nav-link">
                    <i className="nav-icon fas fa-address-card"></i>
                    <p>
                      Get help
                  </p>
                  </Link>
                </li>
                <li className="nav-item" onClick={this.logout}>
                  <a className="nav-link">
                    <i className="nav-icon fas fa-sign-out-alt"></i>
                    <p>
                      Logout
                  </p>
                  </a>
                </li>
                {/*<li className="nav-item has-treeview menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./index.html" className="nav-link active">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v1</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index2.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v2</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index3.html" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Dashboard v3</p>
                    </a>
                  </li>
                </ul>
              </li>*/}
              </ul>
              <ul className="navbar-nav ml-auto">
              </ul>
            </nav>
          </div>
        </aside>
      </>
    )
  }
}

export default Sidebar
