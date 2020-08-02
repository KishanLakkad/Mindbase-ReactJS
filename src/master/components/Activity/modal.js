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
import validate from "./validate";
import { ToastContainer, toast } from "react-toastify";
import { ApiGet, ApiPost, ApiPut } from "../../helpers/API/ApiData";

class ActivityModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isEdit: false,
            _id: '',
            shortTitle: '',
            title: '',
            description: '',
            image: null,
            errors: { shortTitle: '', title: '', description: '', image: '' }
        };

        this.modalClose = this.modalClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onSave = this.onSave.bind(this);
        this.getActivity = this.getActivity.bind(this);
    }

    modalClose() {
        this.resetState();
        this.props.modalClose();
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (name == "image") {
            this.setState({ image: event.target.files[0] });
        } else {
            this.setState({
                [name]: value
            });
        }

    }

    componentDidMount() { }

    componentWillReceiveProps(nextProps, nextContext) {
        this.state._id = nextProps.editId;

        if (this.state._id) {
            this.setState({
                isEdit: true
            });
            this.resetState();
            this.getActivity();
        } else {
            this.setState({
                isEdit: false
            });
            this.resetState();
        }
    }

    resetState() {
        this.setState({
            shortTitle: "",
            title: '',
            description: '',
            image: '',
            errors: { shortTitle: '', title: '', description: '', image: '' }
        });
    }

    getActivity() {
        ApiGet("activity/" + this.state._id)
            .then(async (res) => {
                this.setState({
                    shortTitle: res.data.data.shortTitle,
                    title: res.data.data.title,
                    description: res.data.data.description,
                    image: res.data.data.image
                })
            })
            .catch((err) => {
                console.log("err", err)
            });
    }

    validateForm() {
        const data = {
            shortTitle: this.state.shortTitle,
            title: this.state.title,
            description: this.state.description,
            image: this.state.image
        };

        let isValid = false;
        let errors = validate(data);

        if (!errors.shortTitle && !errors.title && !errors.description && !errors.image) {
            isValid = true;
        }

        this.setState({
            errors: errors
        })

        console.log("isValid", isValid);
        return isValid;
    }

    onSave(event) {
        event.preventDefault();
        if (this.validateForm()) {
            var formData = new FormData()
            formData.append('shortTitle', this.state.shortTitle);
            formData.append('title', this.state.title);
            formData.append('description', this.state.description);

            if (typeof this.state.image === 'object') {
                formData.append('image', this.state.image);
            }

            if (this.state._id) {
                formData.append('_id', this.state._id);
                ApiPut("activity", formData)
                    .then(async (res) => {
                        toast.success(res.data.message);

                        this.resetState();
                        this.props.onRefresh();
                        this.props.modalClose();
                    })
                    .catch((err) => {
                        console.log("err", err)
                        toast.error("Authentication error");
                    });
            } else {
                ApiPost("activity", formData)
                    .then(async (res) => {
                        toast.success(res.data.message);

                        this.resetState();
                        this.props.onRefresh();
                        this.props.modalClose();
                    })
                    .catch((err) => {
                        console.log("err", err)
                        toast.error("Authentication error");
                    });
            }
        }
    }

    render() {
        return (
            <>
                <ToastContainer />
                <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">

                    <Modal
                        isOpen={this.props.modalOpen}
                        onRequestClose={this.modalClose}
                        title={this.state.isEdit ? "Edit Activity" : "Add Activity"}
                    >
                        <div className="">
                            <form onSubmit={this.onSave}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Short Title</label>
                                            <input type="text" className="form-control" name="shortTitle" value={this.state.shortTitle} onChange={this.handleChange} placeholder="Short Title" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["shortTitle"]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["title"]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea type="text" rows="3" className="form-control" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Description" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["description"]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Upload Image File</label>
                                            <input type="file" name="image" accept="image/*" onChange={this.handleChange} className="image-box form-control" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["image"]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-secondary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </>
        );
    }
}

export default ActivityModal;