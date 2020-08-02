import React from "react";
import {
  NavLink
} from "react-router-dom";
import history from './history';

class Sidebar extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changeShowNavbar = this.changeShowNavbar.bind(this);
  }
  getInitState(){
    return {
      page: "Login Page"
    }
  }
  componentDidMount(){

  }
  handleLogout(){
    localStorage.removeItem("mb_autorization");
    localStorage.removeItem("mb_department");
    history.push("/");
  }
  changeShowNavbar(){
    this.props.changeShowNavbar();
  }
  render(){
    return (
      <aside className="main-sidebar sidebar-light-primary">
        <a onClick={this.changeShowNavbar} data-widget="pushmenu" className="brand-link" style={{cursor: "pointer"}}>
          <span className="brand-text font-weight-light"><i class="fas fa-times"></i></span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" style={{height: "100%"}}>

              <li className="nav-item">
                <NavLink to="/admin/dashboard" activeClassName="active" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/messages" className="nav-link">
                  <i className="nav-icon far fa-envelope"></i>
                  <p>
                    Message
                  </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/indicators" className="nav-link">
                  <i className="nav-icon fas fa-sign"></i>
                  <p>
                    Indicators
                  </p>
                </NavLink>
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
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" style={{position: "absolute",bottom: 50,width: "93%"}}>
              <li className="nav-item">
                <a onClick={this.handleLogout} href="#" className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p>
                    Logout
                  </p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}

export default Sidebar
