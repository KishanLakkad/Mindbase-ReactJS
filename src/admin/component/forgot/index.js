import React from "react";
import axios from "axios";
import history from './../../common/history';
import toastr from "toastr";
import { signup, signin } from './../../helpers/auth';
import {
  NavLink
} from "react-router-dom";

class Forgot extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
  }
  getInitState(){
    return {
      email: "",
      emailError: "",
      load: false
    }
  }
  componentDidMount(){
    document.title="MindBase | Login"
  }
  handleForgot(){
    this.setState({
      emailError: "",
      passwordError: "",
      load: true
    })
    if(!this.state.email){
      this.setState({
        emailError: "Please enter email address!",
        load: false
      })
      return false;
    }
    let data = {
      email: this.state.email
    }, self = this;
    // axios.post('/admin/login', data)
    // .then(function async (response){
    //   if(response.status === 200){
    //     localStorage.setItem("mb_autorization",response.data.data.token);
    //     localStorage.setItem("mb_department",response.data.data._id);
    //     localStorage.setItem("mb_logo",response.data.data.profile);
    //     self.loginFirebase();
    //   }else{
    //     toastr.error("Authorization failed!");
    //   }
    // })
    // .catch(function (error) {
    //   self.setState({
    //     load: false
    //   });
    //   if(error.response.status === 401){
    //     toastr.error("Authorization failed!");
    //   }else{
    //     toastr.error(error.message);
    //   }
    // });
  }
  async loginFirebase(){
    try {
      await signin(this.state.email, this.state.password);
      this.setState({
        load: false
      });
      history.push('/dashboard');
    } catch (error) {
      try {
        await signup(this.state.email, this.state.password);
        this.setState({
          load: false
        });
        history.push('/dashboard');
      } catch (e) {
        this.setState({
          load: false
        });
        console.log(e);
      }
    }
  }
  render(){
    return (
      <div className="hold-transition">
        <div className="text-right" style={{position: "absolute",right: 20,top: 15,zIndex: 1}}>
          <img className="img-fluid" src="/assets/img/MindBase4.png" />
        </div>
        <div className="text-right" style={{position: "absolute",right: 40,bottom: 10,zIndex: 1}}>
          <p style={{fontSize: 12}}><a style={{color: "grey",marginRight: 10}} href="#">Privacy Policy</a> | <a style={{color: "grey",marginLeft: 10}} href="#">Terms and conditions</a></p>
        </div>
        <div className="row no-gutters">
          <div className="col-md-6">
            <div className="login-page">
              <div className="login-box">
                <div className="login-logo">
                  <img className="img-fluid" src="/assets/img/MindBase1.png" />
                </div>
                <div className="card">
                  <div className="card-body login-card-body">
                    <p className="login-box-msg">Forgot password?</p>
                    <form>
                      <div style={{marginBottom: 40}}>
                        <label className="login-label">Email Id</label>
                        <div className="input-login-container">
                          <input onChange={(e) => this.setState({email: e.target.value }) } value={this.state.email} type="email" className="login-email-textbox" placeholder="Email" />
                          <img src="/assets/img/user-name-icon.png" className="img-fluid login-icon" />
                        </div>
                      </div>
                      {this.state.emailError ? <span style={{color: "red",display: "block",fontSize: 14}} className="mb-3">{this.state.emailError}</span> : <span style={{display: "block"}} className="mb-3"></span>}

                      <div className="row">
                        <div className="col-12">
                          {/*<button disabled={this.state.load} onClick={this.handleForgot} type="button" className="btn btn-primary btn-block"> {this.state.load && <i className="fas fa-spinner fa-spin fa-pulse"></i>} Sign In</button>*/}
                          <span disabled={this.state.load} onClick={this.handleForgot} className="login-btn-design">
                            {this.state.load && <i className="fas fa-spinner fa-spin fa-pulse"></i>} Send Reset Link
                          </span>
                          <NavLink to="/" className="forgot-text-design">
                            Back to Login
                          </NavLink>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-md-block d-lg-block d-xl-block">
            <div className="login-page">
              <div className="login-logo">
                <img src="/assets/img/gggjnjnj.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Forgot
