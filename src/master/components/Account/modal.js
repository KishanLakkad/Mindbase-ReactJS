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

class AccountModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitState();

        this.getInitState = this.getInitState.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onSave = this.onSave.bind(this);
        this.getDepartment = this.getDepartment.bind(this);
    }

    getInitState() {
        return {
            isOpen: false,
            modalTital: "Add Department",
            isEdit: false,
            _id: '',
            department: '',
            email: '',
            phone: '',
            password: '',
            profile: '',
            errors: { department: '', email: '', password: '', phone: '' }
        };
    }

    modalClose() {
        this.resetState();
        this.props.modalClose();
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (name == "profile") {
            this.setState({ profile: event.target.files[0] });
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.state._id = nextProps.editId;

        if (this.state._id) {
            this.setState({
                isEdit: true
            });
            this.resetState();
            this.getDepartment();
        } else {
            this.setState({
                isEdit: false
            });
            this.resetState()
        }
    }

    resetState() {
        this.setState({
            department: '',
            email: '',
            phone: '',
            password: '',
            profile: '',
            errors: { department: '', email: '', password: '', phone: '' }
        });
    }

    getDepartment() {
        ApiGet("admin/" + this.state._id)
            .then(async (res) => {
                this.setState({
                    department: res.data.data.department,
                    email: res.data.data.email,
                    phone: res.data.data.phone || '',
                    password: ''
                });
            })
            .catch((err) => {
                console.log("err", err)
            });
    }

    validateForm() {
        const data = {
            department: this.state.department,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            profile: this.state.profile
        };

        let isValid = false;
        let errors = validate(data);

        if (this.state.isEdit) {
            errors.password = '';
        }

        if (!errors.email && !errors.department && !errors.phone && !errors.password && !errors.profile) {
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
            formData.append('email', this.state.email);
            formData.append('department', this.state.department);
            formData.append('phone', this.state.phone);

            if (this.state.password) {
                formData.append('password', this.state.password);
            }

            if (typeof this.state.profile === 'object') {
                formData.append('profile', this.state.profile);
            }


            if (this.state._id) {
                formData.append('_id', this.state._id);
                ApiPut("admin", formData)
                    .then(async (res) => {
                        toast.success(res.data.message);

                        this.resetState();
                        this.props.onRefresh();
                        this.props.modalClose();
                    })
                    .catch((err) => {
                        console.log("err", err)
                        toast.error("Some thing went wrong !! ");
                    });
            } else {
                ApiPost("admin/signup", formData)
                    .then(async (res) => {
                        toast.success(res.data.message);

                        this.resetState();
                        this.props.onRefresh();
                        this.props.modalClose();
                    })
                    .catch((err) => {
                        console.log("err", err)
                        toast.error("Some thing went wrong !! ");
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
                        title={this.state.isEdit ? "Edit Department" : "Add Department"}
                    >
                        <div className="">
                            <form onSubmit={this.onSave}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input type="text" className="form-control" name="department" value={this.state.department} onChange={this.handleChange} placeholder="Department Name" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["department"]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["email"]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Contact No.</label>
                                            <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Contact Number" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["phone"]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="text" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                                            <span
                                                style={{
                                                    color: "red",
                                                    position: "relative",
                                                    top: "5px",
                                                    fontSize: "10px",
                                                    fontFamily: "Poppins",
                                                }}
                                            >
                                                {this.state.errors["password"]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>profile</label>
                                            <input type="file" onChange={this.handleChange} name="profile" className="image-box form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6"></div>
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

export default AccountModal;
