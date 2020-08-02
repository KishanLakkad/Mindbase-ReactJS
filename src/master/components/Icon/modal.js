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

class IconModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isEdit: false,
            _id: '',
            name: '',
            color: '',
            type: 'main',
            image: null,
            errors: { name: '', color: '', type: '', image: '' }
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
            name: '',
            color: '',
            type: 'main',
            image: null,
            errors: { name: '', color: '', type: '', image: '' }
        });
    }

    getActivity() {
        ApiGet("feeling/" + this.state._id)
            .then(async (res) => {
                this.setState({
                    name: res.data.data.name,
                    color: res.data.data.color,
                    type: res.data.data.type,
                    image: res.data.data.image
                })
            })
            .catch((err) => {
                console.log("err", err)
            });
    }

    validateForm() {
        const data = {
            name: this.state.name,
            color: this.state.color,
            type: this.state.type,
            image: this.state.image
        };

        let isValid = false;
        let errors = validate(data);

        console.log("errors", errors);
        if (!errors.name && !errors.color && !errors.type && !errors.image) {
            isValid = true;
        }

        this.setState({
            errors: errors
        })

        return isValid;
    }

    onSave(event) {
        event.preventDefault();
        if (this.validateForm()) {
            var formData = new FormData()
            formData.append('name', this.state.name);
            formData.append('color', this.state.color);
            formData.append('type', this.state.type);

            if (typeof this.state.image === 'object') {
                formData.append('image', this.state.image);
            }

            if (this.state._id) {
                formData.append('_id', this.state._id);
                ApiPut("feeling", formData)
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
                ApiPost("feeling", formData)
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
                {/* <ToastContainer /> */}
                <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">

                    <Modal
                        isOpen={this.props.modalOpen}
                        onRequestClose={this.modalClose}
                        title={this.state.isEdit ? "Edit Icon" : "Add Icon"}
                    >
                        <div className="">
                            <form onSubmit={this.onSave}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["name"]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Color</label>
                                            <input type="text" className="form-control" name="color" value={this.state.color} onChange={this.handleChange} placeholder="color" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["color"]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Icon Type</label>
                                            <select className="form-control" name="type" value={this.state.type} onChange={this.handleChange}>
                                                <option value="main">Main</option>
                                                <option value="extra">Extra</option>
                                            </select>
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

export default IconModal;