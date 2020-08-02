import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

class Layout extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState() {
    return {
      page: "Dashboard Page"
    }
  }
  componentDidMount() {
    document.title = "Mindbase Dashboard"
  }
  render() {
    return (
      <div className="sidebar-mini layout-fixed">
        <div className="wrapper">
          <Sidebar />
          <Navbar />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
