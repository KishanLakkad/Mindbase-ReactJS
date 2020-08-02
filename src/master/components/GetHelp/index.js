import React, { Component } from "react";
import ReactTable from "react-table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import {
  Modal, Button, ButtonGroup,
  Field,
  Input,
  TimePicker,
  DatePicker,
  Lookup,
  Textarea,
} from 'react-rainbow-components';
import "../../app/styles.css";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ApiGet, ApiPost, ApiDelete } from "../../helpers/API/ApiData";
import { MDBIcon } from "mdbreact";

const drawerWidth = 240;
const textStyles = {
  textAlign: 'center',
};
const inputStyles = {
  width: 300,
};

const imagePosition = {
  width: "17%",
  height: "50%",
  marginLeft: "25%"
};

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      smsNo: null,
      callNo: null,
      smsText: ''
    };

    this.getData = this.getData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });

    // setTimeout(() => {
    //   this.saveData()
    // }, 1000);
  }

  getData() {
    ApiGet("aboutUs")
      .then(async (res) => {
        this.setState({
          smsNo: res.data.data.smsNo,
          callNo: res.data.data.callNo,
          smsText: res.data.data.smsText
        })
      })
      .catch((err) => {
        console.log("err", err)
      });
  }


  saveData() {
    let data = {
      smsNo: this.state.smsNo,
      callNo: this.state.callNo,
      smsText: this.state.smsText
    }

    ApiPost("aboutUs", data)
      .then(async (res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log("err", err)
        toast.error("Something went wrong!!");
      });
  }



  render() {
    return (
      <>
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
              <div className="row" style={{ paddingTop: 15, paddingBottom: 20 }}>
                <div className="col-md-8" style={{ padding: 15 }}>
                  <div style={{ backgroundColor: "white", padding: 15, borderRadius: 20 }}>
                    {
                      <div>
                        <div className="text-center">
                          <span style={{ display: "block", fontSize: 24 }}>Get Help</span>
                        </div>
                        <div style={{ marginTop: 5 }}>
                          <table className="table">
                            <tr>
                              <td><span style={{ fontWeight: "bold" }}>SMS NO : </span></td>
                              <td>
                                <input type="number" className="form-control" name="smsNo" value={this.state.smsNo} onChange={this.handleChange} placeholder="SMS Number" /></td>
                            </tr>
                            <tr>
                              <td><span style={{ fontWeight: "bold" }}>Call NO : </span></td>
                              <td>
                                <input type="number" className="form-control" name="callNo" value={this.state.callNo} onChange={this.handleChange} placeholder="Call Number" /></td>
                            </tr>
                            <tr>
                              <td><span style={{ fontWeight: "bold" }}>SMS Message : </span></td>
                              <td><textarea rows="5" type="text" className="form-control" name="smsText" value={this.state.smsText} onChange={this.handleChange} placeholder="SMS Message" /></td>
                            </tr>
                          </table>
                          <div className="form-group">
                            <button type="button" className="btn btn-secondary" onClick={this.saveData}>Save Changes</button>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">

              <div className="row padding-10" >
                <div className="">
                  Get help
                </div>
              </div>

              <div>
                <div className="card" style={{ padding: "12px" }}>
                  <h5><span>SMS NO: {this.state.smsNo} </span></h5>
                  <h5><span>SMS NO: {this.state.smsNo} </span></h5>
                  <h5><span>SMS NO: {this.state.smsNo} </span></h5>
                </div>
                <div className="card" style={{ padding: "12px" }}><h5> <span>Call NO: {this.state.callNo} </span></h5></div>
              </div>

            </div>
          </section>
        </div>*/}
      </>
    );
  }
}

export default AboutUs;