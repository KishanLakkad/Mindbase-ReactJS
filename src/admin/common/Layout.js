import React from "react";
import Sidebar from "./Sidebar.js";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import BreadCrumb from "./BreadCrumb.js";

class Layout extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.changeShowNavbar = this.changeShowNavbar.bind(this);
  }
  getInitState(){
    return {
      page: "Dashboard Page",
      showNavBar: false
    }
  }
  componentDidMount(){
    document.title = "Mindbase Dashboard"
  }
  changeShowNavbar(){
    this.setState({
      showNavBar: !this.state.showNavBar
    })
  }
  render(){
    return (
      <div className="sidebar-mini layout-fixed">
        <div className="wrapper">
          <Sidebar changeShowNavbar={this.changeShowNavbar} />
          <Navbar showNavBar={this.state.showNavBar} changeShowNavbar={this.changeShowNavbar} />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
