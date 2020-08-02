import React, { Component } from "react";
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
import { ApiGet, ApiPost, ApiPut } from "../../helpers/API/ApiData";

class FeedbackModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            responseType: '',
            title: '',
            note: '',
            user: {},
            department: {}
        };

        this.modalClose = this.modalClose.bind(this);
        this.getFeedback = this.getFeedback.bind(this);
    }

    modalClose() {
        this.props.modalClose();
    }

    componentDidMount() { }

    componentWillReceiveProps(nextProps, nextContext) {
        this.state._id = nextProps.viewId;

        if (this.state._id) {
            this.getFeedback();
        }
    }

    getFeedback() {
        ApiGet("feedback/" + this.state._id)
            .then(async (res) => {
                this.setState({
                    title: res.data.data.title,
                    note: res.data.data.note,
                    responseType: res.data.data.responseType,
                    user: res.data.data.user,
                    department: res.data.data.department,
                })
            })
            .catch((err) => {
                console.log("err", err)
            });
    }


    render() {
        return (
            <>
                <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">

                    <Modal
                        isOpen={this.props.modalOpen}
                        onRequestClose={this.modalClose}
                        title={"View Feedback"}
                    >
                        {/* <div className="">
                            <h5>{this.state.title}</h5>
                            {this.state.note}
                        </div> */}
                        <div>
                            <div className="d-flex">
                                <div >
                                    <img alt="" src={this.state.user.profile} className="imageCircle" />
                                </div>
                                <div className="pl-3">
                                    <div style={{ fontSize: "22px" }}>{this.state.title}</div>
                                    <div style={{ fontSize: "16px" }}>Descripstion</div>
                                </div>
                            </div>
                            <div className="">{this.state.note}</div>
                        </div>
                    </Modal>
                </div>
            </>
        );
    }
}

export default FeedbackModal;