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

class MusicModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isEdit: false,
            _id: '',
            title: '',
            voiceType: 'male',
            duration: '',
            image: null,
            mp3: null,
            errors: { title: '', voiceType: '', duration: '', image: '', mp3: '' }
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
            title: '',
            voiceType: 'male',
            duration: '',
            image: null,
            mp3: null,
            errors: { title: '', voiceType: '', duration: '', image: '', mp3: '' }
        });
    }

    getActivity() {
        ApiGet("mp3/" + this.state._id)
            .then(async (res) => {
                this.setState({
                    title: res.data.data.title,
                    voiceType: res.data.data.voiceType,
                    duration: res.data.data.duration,
                    image: res.data.data.image,
                    mp3: res.data.data.mp3
                })
            })
            .catch((err) => {
                console.log("err", err)
            });
    }

    validateForm() {
        const data = {
            title: this.state.title,
            voiceType: this.state.voiceType,
            duration: this.state.duration,
            image: this.state.image,
            mp3: this.state.mp3
        };

        let isValid = false;
        let errors = validate(data);

        if (!errors.title && !errors.voiceType && !errors.duration && !errors.image && !errors.mp3) {
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
            formData.append('title', this.state.title);
            formData.append('voiceType', this.state.voiceType);
            formData.append('duration', this.state.duration);

            if (typeof this.state.image === 'object') {
                formData.append('image', this.state.image);
            }

            if (typeof this.state.mp3 === 'object') {
                formData.append('mp3', this.state.mp3);
            }

            if (this.state._id) {
                formData.append('_id', this.state._id);
                ApiPut("mp3", formData)
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
                ApiPost("mp3", formData)
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
                        title={this.state.isEdit ? "Edit Music" : "Add Music"}
                    >
                        <div className="">
                            <form onSubmit={this.onSave}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input type="text" className="form-control" title="title" value={this.state.title} onChange={this.handleChange} placeholder="title" />
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
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Voice Type</label>
                                            <select className="form-control" name="voiceType" value={this.state.voiceType} onChange={this.handleChange}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Duration</label>
                                            <input type="text" className="form-control" name="duration" value={this.state.duration} onChange={this.handleChange} placeholder="Duration" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["duration"]}
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
                                            <label>Upload Audio File</label>
                                            <input type="file" name="mp3" accept="image/*" onChange={this.handleChange} className="image-box form-control" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["mp3"]}
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

export default MusicModal;