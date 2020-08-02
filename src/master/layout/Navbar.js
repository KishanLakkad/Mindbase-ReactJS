import React from "react";

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState() {
    return {
      page: "Login Page"
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <img src="/assets/img/MindBase1.png" style={{ height: 60, marginLeft: 10 }} className="img-fluid" />
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
