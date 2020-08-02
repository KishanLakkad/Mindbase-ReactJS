import React from "react";

class BreadCrumb extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState(){
    return {
      page: "Login Page"
    }
  }
  componentDidMount(){

  }
  render(){
    return (
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">{this.props.pagetitle}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">{this.props.parent1}</a></li>
                <li className="breadcrumb-item active">{this.props.parent2}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BreadCrumb
