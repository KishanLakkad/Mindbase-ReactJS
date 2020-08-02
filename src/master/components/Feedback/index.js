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
import FeedbackModal from "./modal";
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
  width: "40px",
  height: "40px",
  marginLeft: "25%",
  borderRadius: "50%"
};

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
      modalShow: false,
      viewId: '',
      data: [],
      columns: [
        {
          Header: "id",
          accessor: "_id",
          show: false,
        },
        {
          Header: "User",
          accessor: "user",
          Cell: (value) => {
            return (
              <div className="d-flex">
                {/* <img style={imagePosition} alt="" src={value.row.user.profile} /> */}
                <p style={{ color: "#000" }}>{value.row.user.firstName} {value.row.user.lastName}</p>
              </div>
            );
          }
        },
        {
          Header: "Title",
          accessor: "title",
        },
        // {
        //   Header: "Description",
        //   accessor: "note",
        // },
        {
          Header: "Response Type",
          accessor: "responseType",
        },
        {
          Header: "Action",
          accessor: "_id",
          Cell: (value) => (
            <>
              <div className="text-center">
                <MDBIcon className="editButton" icon="eye" size="1x" onClick={() => this.handleModel(true, value.row._id)} />
              </div>
            </>
          )
        }
      ]
    };

    this.handleModel = this.handleModel.bind(this);
    this.getFeedbacks = this.getFeedbacks.bind(this);
  }

  componentDidMount() {
    this.getFeedbacks();
  }

  handleModel(modalShow, viewId = null) {
    this.setState({ modalShow, viewId });
  }


  getFeedbacks() {
    ApiGet("feedback")
      .then(async (res) => {
        this.setState({ data: res.data.data })
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
                  Feedback
                </div>
                <div className="float-right ">
                  <FeedbackModal modalOpen={this.state.modalShow} modalClose={() => this.handleModel(false)} viewId={this.state.viewId} />
                </div>
              </div>

              <ReactTable
                data={this.state.data}
                columns={this.state.columns}
                sortable={true}
                filterable={true}
                showPagination={true}
                defaultPageSize={5}
                // LoadingComponent={true}
                resizable={true}
                className="-striped -highlight"
              />
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Feedback;