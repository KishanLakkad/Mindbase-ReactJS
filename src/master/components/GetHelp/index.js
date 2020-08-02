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
      callNo: null
    };

    this.getAboutUs = this.getAboutUs.bind(this);
  }

  componentDidMount() {
    this.getAboutUs();
  }

  getAboutUs() {
    ApiGet("aboutUs")
      .then(async (res) => {
        this.setState({
          smsNo: res.data.data.smsNo,
          callNo: res.data.data.callNo
        })
      })
      .catch((err) => {
        console.log("err", err)
      });
  }


  render() {
    return (
      <>
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">

              <div className="row padding-10" >
                <div className="">
                  Get help
                </div>
              </div>

              <div>
                <div className="card" style={{ padding: "12px" }}><h5><span>SMS NO: {this.state.smsNo} </span></h5></div>
                <div className="card" style={{ padding: "12px" }}><h5> <span>Call NO: {this.state.callNo} </span></h5></div>
              </div>

            </div>
          </section>
        </div>
      </>
    );
  }
}

export default AboutUs;