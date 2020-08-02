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
import ActivityModal from "./modal";
import * as authUtil from "../../utils/auth.util";
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ApiGet, ApiPost, ApiDelete } from "../../helpers/API/ApiData";
import { confirmAlert } from 'react-confirm-alert';
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

class Activity extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
            modalShow: false,
            editId: '',
            data: [],
            columns: [
                {
                    Header: "id",
                    accessor: "_id",
                    show: false,
                },
                {
                    Header: "Short Title",
                    accessor: "shortTitle",
                },
                {
                    Header: "Title",
                    accessor: "title",
                },
                {
                    Header: "Description",
                    accessor: "description",
                },
                {
                    Header: "Image",
                    accessor: "image",
                    Cell: ({ value }) => {
                        return (
                            <div>
                                <img style={imagePosition} alt="" src={value} />
                            </div>
                        );
                    }
                },
                {
                    Header: "Action",
                    accessor: "_id",
                    Cell: (value) => (
                        <>
                            <div className="text-center">
                                <MDBIcon className="editButton" icon="pencil-alt" size="1x" onClick={() => this.handleModel(true, value.row._id)} />&nbsp;
                                <MDBIcon className="editButton" icon="trash" size="1x" onClick={() => this.delete(value.index, value.row._id)} />
                            </div>
                        </>
                    )
                }
            ]
        };

        this.handleModel = this.handleModel.bind(this);
        this.getDepartments = this.getDepartments.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    handleModel(modalShow, editId = null) {
        this.setState({ modalShow, editId });
    }

    componentDidMount() {
        this.getDepartments();
    }

    onRefresh() {
        this.getDepartments()
    }

    getDepartments() {
        ApiGet("activity")
            .then(async (res) => {
                this.setState({ data: res.data.data })
            })
            .catch((err) => {
                console.log("err", err)
            });
    }

    delete(index, id) {
        confirmAlert({
            title: 'Are you sure ?',
            message: "You won't be able to revert this!",
            buttons: [
                {
                    label: 'Yes, delete it!',
                    onClick: () => ApiDelete("activity/" + id)
                        .then(async (res) => {
                            this.setState({ data: this.state.data.filter(item => item._id !== id) })
                            toast.success(res.data.message);
                        })
                        .catch((err) => {
                            console.log("err", err)
                        })
                },
                {
                    label: 'No, cancel!',
                    onClick: () => { }
                }
            ]
        })

    }

    render() {
        return (
            <>
                <div className="content-wrapper">
                    <ToastContainer />
                    <section className="content">
                        <div className="container-fluid">

                            <div className="row padding-10" >
                                <div className="">
                                    Activity
                                </div>
                                <div className="addButton ">
                                    <Button
                                        className="float-right"
                                        onClick={this.onModalOpen}
                                        onClick={() => this.handleModel(true)}
                                        label="Add Activity">
                                    </Button>
                                    <ActivityModal modalOpen={this.state.modalShow} modalClose={() => this.handleModel(false)} onRefresh={this.onRefresh} editId={this.state.editId} />
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

export default Activity;
