import React, { useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";

import { ApiPostNoAuth } from "../../helpers/API/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as authUtil from "../../utils/auth.util";
import * as userUtil from "../../utils/user.util";
import { signup, signin } from './../../helpers/firebase-auth';
import validate from "./validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import "../../app/styles.css";

class Login extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = this.getInitState();

        this.getInitState = this.getInitState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSignIn = this.getSignIn.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.loginFirebase = this.loginFirebase.bind(this)
    }

    // history = useHistory();

    getInitState() {
        return {
            email: "",
            password: "",
            errors: { email: '', password: '' }
        }
    }

    componentDidMount() {

    }

    getSignIn(event) {
        console.log("getSignIn")
        event.preventDefault();
        if (this.validateForm()) {

            const data = {
                email: this.state.email,
                password: this.state.password,
            };

            ApiPostNoAuth("masterAdmin/login", data)
                .then(async (res) => {
                    authUtil.setToken(res.data.data.token);
                    delete res.data.data.token;
                    userUtil.setUserInfo(res.data.data);

                    toast.success(res.data.message);

                    // this.setState({
                    //     email: '',
                    //     password: ''
                    // })

                    this.loginFirebase();
                    // this.history.push("/dashboard");

                })
                .catch((err) => {
                    console.log("err", err)
                    toast.error("Authentication error");
                });
        }
    };

    async loginFirebase(){
      try {
        await signin(this.state.email, this.state.password);
        this.props.history.push("/dashboard");
      } catch (error) {
        try {
          await signup(this.state.email, this.state.password);
          this.props.history.push("/dashboard");
        } catch (e) {

        }
      }
    }

    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })

        // if (field == 'email') {
        //     setEmail(value);

        //     console.log("email", email);
        //     if (!email) {
        //         setErrors({ email: 'Please Enter Valid Email or User Name' })
        //     } else {
        //         setErrors({ email: '' })
        //     }
        // }
    }

    validateForm() {
        const data = {
            email: this.state.email,
            password: this.state.password,
        };

        let formIsValid = false;
        let error = validate(data);

        if (!error.email && !error.password) {
            formIsValid = true;
        }

        this.setState({
            errors: error
        })

        console.log("errors", this.state.errors)
        return formIsValid;
    }


    render() {
        return (
            <>
                <ToastContainer />
                <div className="bg">
                    <div className="container padding-100">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="">
                                    <div className="logo" style={{paddingBottom:"10px"}}>

                                        <img src='/assets/img/MindBase1.png'   className="logoImage img-responsive" alt="logo"/>
                                    </div>
                                    <div className="card">
                                        <div className="green-text">
                                            Login as admin &nbsp;
                                        <span style={{ color: "#0FD2AD" }}>(Change)</span>
                                        </div>
                                        <form onSubmit={this.getSignIn}>
                                            <div className="border-bottom display-just">
                                                <div className="">
                                                    <div className="">
                                                        <label>Email id or Username</label>
                                                    </div>
                                                    <div className="">
                                                        <input type="text" placeholder="" name="email" value={this.state.email} onChange={this.handleChange} />
                                                    </div>
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
                                                <div className="">
                                                   <img src="/assets/img/1.png" alt=""/>
                                                </div>
                                            </div>
                                            <div className="border-bottom display-just">
                                                <div className="">
                                                    <div className="">
                                                        <label>Password</label>
                                                    </div>
                                                    <div className="">
                                                        <input type="password" placeholder="" type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                                                    </div>
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
                                                <div className="">
                                                <img src="/assets/img/login.png" alt=""/>
                                                </div>
                                            </div>
                                            <div className="">
                                                <button className="login" type="submit">LogIn</button>
                                            </div>
                                            <p className="display" style={{color:"#000"}}>Forgot Password?</p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="">
                                    <img src="/assets/img/2.png" className="response" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
