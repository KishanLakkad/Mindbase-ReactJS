import React from "react";
import axios from "axios";
import history from './../../common/history';
import toastr from "toastr";
import { signup, signin } from './../../helpers/auth';
import {
  NavLink
} from "react-router-dom";

class Login extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.loginFirebase = this.loginFirebase.bind(this)
  }
  getInitState(){
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      load: false,
      loginAdmin: false
    }
  }
  componentDidMount(){
    document.title="MindBase | Login"
  }
  handleLogin(){
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
    if(!this.state.password){
      this.setState({
        passwordError: "Please enter password!",
        load: false
      })
      return false;
    }
    let data = {
      email: this.state.email,
      password: this.state.password
    }, self = this;
    let url = null;
    if(this.state.loginAdmin){
      url = '/admin/login';
    }else{
      url = 'masterAdmin/login';
    }
    axios.post(url, data)
    .then(function async (response){
      if(response.status === 200){
        localStorage.setItem("mb_autorization",response.data.data.token);
        localStorage.setItem("mb_department",response.data.data._id);
        localStorage.setItem("mb_logo",response.data.data.profile);
        localStorage.setItem("mb_department_text",response.data.data.department);
        self.loginFirebase();
      }else{
        toastr.error("Authorization failed!");
      }
    })
    .catch(function (error) {
      self.setState({
        load: false
      });
      if(error.response.status === 401){
        toastr.error("Authorization failed!");
      }else{
        toastr.error(error.message);
      }
    });
  }
  async loginFirebase(){
    try {
      await signin(this.state.email, this.state.password);
      this.setState({
        load: false
      });
      if(this.state.loginAdmin){
        localStorage.setItem("mb_type","Admin");
        history.push('/admin/dashboard');
      }else{
        localStorage.setItem("mb_type","MasterAdmin");
        history.push('/master/dashboard');
      }
    } catch (error) {
      try {
        await signup(this.state.email, this.state.password);
        this.setState({
          load: false
        });
        if(this.state.loginAdmin){
          localStorage.setItem("mb_type","Admin");
          history.push('/admin/dashboard');
        }else{
          localStorage.setItem("mb_type","MasterAdmin");
          history.push('/master/dashboard');
        }
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
                    <p className="login-box-msg" style={{color: "black"}}>Login as admin <span style={{color: "#54D584",cursor: "pointer"}} onClick={ () => this.setState({ loginAdmin: !this.state.loginAdmin }) }>(change)</span> <span style={{borderBottom: "1px solid #BCBCBC",marginLeft: 10}}>{this.state.loginAdmin ? "Admin" : "Master Admin"}</span> </p>
                    <form>
                      <div style={{marginBottom: 40}}>
                        <label className="login-label">Email Id or User Name</label>
                        <div className="input-login-container">
                          <input onChange={(e) => this.setState({email: e.target.value }) } value={this.state.email} type="email" className="login-email-textbox" placeholder="Email" />
                          <img src="/assets/img/user-name-icon.png" className="img-fluid login-icon" />
                        </div>
                      </div>
                      {this.state.emailError ? <span style={{color: "red",display: "block",fontSize: 14}} className="mb-3">{this.state.emailError}</span> : <span style={{display: "block"}} className="mb-3"></span>}

                      <div>
                        <label className="login-label">Password</label>
                        <div className="input-login-container">
                          <input onChange={(e) => this.setState({password: e.target.value }) } value={this.state.password} type="password" className="login-email-textbox" placeholder="Password" />
                          <img src="/assets/img/password-icon.png" className="" className="img-fluid login-icon" />
                        </div>
                      </div>
                      {this.state.passwordError ? <span style={{color: "red",display: "block",fontSize: 14}} className="mb-3">{this.state.passwordError}</span> : <span style={{display: "block"}} className="mb-3"></span>}

                      <div className="row">
                        <div className="col-12">
                          {/*<button disabled={this.state.load} onClick={this.handleLogin} type="button" className="btn btn-primary btn-block"> {this.state.load && <i className="fas fa-spinner fa-spin fa-pulse"></i>} Sign In</button>*/}
                          <span disabled={this.state.load} onClick={this.handleLogin} className="login-btn-design">
                            {this.state.load && <i className="fas fa-spinner fa-spin fa-pulse"></i>} Login
                          </span>
                          <NavLink to="/admin/forgot" className="forgot-text-design">
                            Forgot Password?
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

export default Login
