import React from "react";
import { auth } from "./../../../admin/services/firebase";
import { db } from "./../../../admin/services/firebase";
import moment from "moment";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { ApiGet, ApiPost, ApiDelete } from "../../helpers/API/ApiData";
import { ToastContainer, toast } from "react-toastify";

class Messages extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  getInitState() {
    return {
      page: "Dashboard Page",
      user: auth().currentUser,
      chats: [],
      readError: null,
      writeError: null,
      content: '',
      userList: [],
      userLoad: true,
      senderId: null,
      recieverId: null,
      userName: "",
      senderProfile: "",
      showPicker: false,
      fileUploaded: null,
      fileUrl: null,
      fileUploadLoad: false
    }
  }
  async componentDidMount() {
    document.title = "Mindbase | Messages";
    let self = this;

    ApiGet("user")
      .then(async (res) => {
        self.setState({
          userList: res.data.data,
          userLoad: false
        });
      })
      .catch((err) => {
        console.log("err", err)
      });
    // this.setState({ readError: null });
    // try {
    //   db.ref("chats").on("value", snapshot => {
    //     let chats = [];
    //     snapshot.forEach((snap) => {
    //       chats.push(snap.val());
    //     });
    //     console.log(chats);
    //     this.setState({ chats });
    //   });
    // } catch (error) {
    //   this.setState({ readError: error.message });
    // }
  }

  componentDidUpdate() {
    let objDiv = document.getElementById("mychat");
    // console.log("objDiv", objDiv);

    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    let senderId = localStorage.getItem("mb_department");
  }

  async sendMessage() {
    if (this.state.fileUrl) {
      try {
        await db.ref(this.state.recieverId).push({
          text: this.state.content,
          createdAt: Date.now(),
          image: this.state.fileUrl,
          refid: this.state.senderId,
          id: this.state.recieverId,
          type: "ref"
        });
        await db.ref(this.state.senderId).push({
          text: this.state.content,
          createdAt: Date.now(),
          image: this.state.fileUrl,
          refid: this.state.recieverId,
          id: this.state.senderId,
          type: "my"
        });
        this.setState({
          content: '', showPicker: false,
          fileUploaded: null,
          fileUrl: null,
          fileUploadLoad: false
        });
        let objDiv = document.getElementById("mychat");
        objDiv.scrollTop = objDiv.scrollHeight;
      } catch (error) {
        console.log(error);
        this.setState({ writeError: error.message });
      }
    } else {
      if (this.state.content) {
        try {
          await db.ref(this.state.recieverId).push({
            text: this.state.content,
            createdAt: Date.now(),
            refid: this.state.senderId,
            id: this.state.recieverId,
            type: "ref"
          });
          await db.ref(this.state.senderId).push({
            text: this.state.content,
            createdAt: Date.now(),
            refid: this.state.recieverId,
            id: this.state.senderId,
            type: "my"
          });
          this.setState({
            content: '', showPicker: false,
            fileUploaded: null,
            fileUrl: null,
            fileUploadLoad: false
          });
          let objDiv = document.getElementById("mychat");
          objDiv.scrollTop = objDiv.scrollHeight;
        } catch (error) {
          console.log(error);
          this.setState({ writeError: error.message });
        }
      }
    }
  }
  loadChats(userIndex) {
    let objDiv = document.getElementById("mychat");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    let senderId = localStorage.getItem("mb_master"); // <-- put your admin id here
    let recieverId = this.state.userList[userIndex]._id;
    let senderProfile = this.state.userList[userIndex].profile;
    this.setState({
      senderId,
      recieverId,
      senderProfile,
      userName: this.state.userList[userIndex].firstName + " " + this.state.userList[userIndex].lastName
    });
    try {
      db.ref(recieverId).orderByChild("refid").equalTo(senderId).on('value', (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
        // objDiv = document.getElementById("mychat");
        // objDiv.scrollTop = objDiv.scrollHeight;
      });
    } catch (e) {
      this.setState({ readError: e.message });
    }
  }
  triggerInputFile = () => this.fileInput.click();
  uploadFile(event) {
    let self = this;
    var FR = new FileReader();
    FR.addEventListener("load", function (e) {
      self.setState({
        fileUploaded: e.target.result,
        fileUploadLoad: false
      });

      ApiPost(`media/uploadImageUrl`, { media: [e.target.result] })
        .then(async (res) => {
          self.setState({
            fileUploadLoad: true,
            fileUrl: res.data.data.media[0]
          });
        })
        .catch((err) => {
          console.log("err", err)
          toast.error("upload error");
        });
    });
    FR.readAsDataURL(event.target.files[0]);
  }
  render() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row" style={{ paddingTop: 15, paddingBottom: 20 }}>
              <div className="col-md-4">
                <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, overflow: "hidden" }}>
                  <div style={{ overflowY: "scroll", padding: 15, height: "82vh" }} data-simplebar data-simplebar-autohide="true">
                    {
                      this.state.userLoad ? <span style={{ display: "block", textAlign: "center" }}><i className="fas fa-spinner fa-spin fa-pulse"></i></span> :
                        <div>
                          {
                            this.state.userList.map((item, index) => {
                              if (localStorage.getItem("mb_department") != item._id) {
                                return <div onClick={this.loadChats.bind(this, index)} key={index} className="card" style={{ marginBottom: 10, marginTop: 10, cursor: "pointer" }}>
                                  <div className="card-body text-center" style={{ padding: 5 }}>
                                    <div className="row">
                                      <div className="col-md-3" style={{ padding: 0, paddingLeft: 0 }}>
                                        <img src={item.profile ? item.profile : "/assets/img/user_avtar.jpg"} style={{ borderRadius: "50%", height: 50, width: 50 }} />
                                      </div>
                                      <div className="col-md-6 text-left">
                                        <span style={{ display: "block" }}>{item.firstName} {item.lastName}</span>
                                        <span style={{ display: "block", fontSize: 12, color: "grey", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.email}</span>
                                      </div>
                                      <div className="col-md-3">
                                        {/*<div style={{fontSize: 12,backgroundColor: "#551afa",width: 25,height: 25,borderRadius: 20,color: "#FFFFFF",padding: 4}}>99</div>
                                        <span style={{color: "grey",fontSize: 10}}>9h</span>*/}
                                      </div>
                                    </div>
                                  </div>
                                </div>;
                              }
                            }
                            )
                          }
                        </div>
                    }
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                {
                  this.state.senderId && this.state.recieverId &&
                  <div style={{ backgroundColor: "#FFFFFF", borderRadius: 20, overflow: "hidden" }}>
                    <div style={{ borderBottom: "1px solid #e2e2e2" }} className="text-center">
                      <span style={{ fontSize: 20, display: "block" }}>Message</span>
                      <span style={{ fontSize: 20, display: "block", marginTop: 5 }}>{this.state.userName}</span>
                      <div style={{ position: "absolute", right: 30, top: 20 }}><i className="fas fa-plus"></i></div>
                      <div style={{ position: "absolute", right: 70, top: 20 }}><i className="fas fa-link"></i></div>
                    </div>
                    <div id="mychat" style={{ overflowY: "scroll", height: "61vh", padding: 30 }} data-simplebar data-simplebar-autohide="true">
                      {
                        this.state.chats.map(chat => {
                          if (chat.type === "ref") {
                            return <div style={{ width: "80%", float: "right", paddingTop: 20 }}>
                              <div className="row" style={{ marginBottom: 5 }}>
                                <div className="col-4">
                                  <span style={{ fontSize: 12, color: "lightgrey" }}>{moment(chat.createdAt).format("DD MMM YYYY")}</span>
                                </div>
                                <div className="col-7 text-right">
                                  <span style={{ display: "block", fontSize: 12 }}>Admin</span>
                                  <span style={{ display: "block", fontSize: 12, color: "grey" }}>Global Infotech Pvt Ltd., United States</span>
                                </div>
                                <div className="col-1 text-right" style={{ padding: 0 }}>
                                  <img src={localStorage.getItem("mb_logo") ? localStorage.getItem("mb_logo") : "/assets/img/user_avtar.jpg"} style={{ borderRadius: "50%", height: 40, width: 40 }} />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12" style={{ backgroundColor: "#5495fd20", padding: 10, borderRadius: 7 }}>
                                  {chat.image && <span style={{ fontSize: 14, display: "block" }}><a href={chat.image} target="_blank"><img src={chat.image} style={{ height: 50 }} /></a></span>}
                                  <span style={{ fontSize: 14, display: "block" }}>{chat.text}</span>
                                </div>
                              </div>
                            </div>;
                          } else {
                            return <div style={{ width: "80%", float: "left", paddingTop: 20 }}>
                              <div className="row" style={{ marginBottom: 5 }}>
                                <div className="col-1 text-right">
                                  <img src={this.state.senderProfile ? this.state.senderProfile : "/assets/img/user_avtar.jpg"} style={{ borderRadius: "50%", height: 40, width: 40 }} />
                                </div>
                                <div className="col-7 text-left">
                                  <span style={{ display: "block", fontSize: 12 }}>{this.state.userName}</span>
                                  <span style={{ display: "block", fontSize: 12, color: "grey" }}>Global Infotech Pvt Ltd., United States</span>
                                </div>
                                <div className="col-4 text-right">
                                  <span style={{ fontSize: 12, color: "lightgrey" }}>{moment(chat.createdAt).format("DD MMM YYYY")}</span>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12" style={{ backgroundColor: "#5495fd20", padding: 10, borderRadius: 7 }}>
                                  {chat.image && <span style={{ fontSize: 14, display: "block" }}><a href={chat.image} target="_blank"><img src={chat.image} style={{ height: 50 }} /></a></span>}
                                  <span style={{ fontSize: 14, display: "block" }}>{chat.text}</span>
                                </div>
                              </div>
                            </div>;
                          }
                        })
                      }
                    </div>
                    <div style={{ height: "11vh", borderTop: "1px solid #e2e2e2", padding: 10 }}>
                      <div style={{ position: "relative" }}>
                        <input onChange={(e) => this.setState({ content: e.target.value })} value={this.state.content} placeholder="Type message here..." type="text" className="chat-textbox" />
                        <span onClick={() => this.setState({ showPicker: !this.state.showPicker })} style={{ position: "absolute", right: 70, top: 8, fontSize: 24, paddingLeft: 10, paddingRight: 10, color: "#a2a2a2", cursor: "pointer" }}><i className="far fa-smile-beam"></i></span>
                        <span onClick={this.triggerInputFile} style={{ position: "absolute", right: 35, top: 8, fontSize: 24, paddingLeft: 10, paddingRight: 10, color: "#a2a2a2", cursor: "pointer" }}><i className="fas fa-paperclip"></i></span>
                        <span onClick={this.sendMessage} style={{ position: "absolute", right: 0, top: 8, fontSize: 24, paddingLeft: 10, paddingRight: 10, color: "#5495fd", cursor: "pointer" }}><i className="fas fa-paper-plane"></i></span>
                        {
                          this.state.showPicker && <Picker
                            style={{ position: 'absolute', bottom: '50px', right: '20px' }}
                            title="Pick your emoji…"
                            emoji="point_up"
                            onSelect={emoji => this.setState({ content: this.state.content + emoji.native })}
                          />
                        }
                        {
                          this.state.fileUploaded && <div className="file-upload-container">
                            <img src={this.state.fileUploaded} style={{ height: 50 }} />
                            <span style={{ marginLeft: 20 }}>{this.state.fileUploadLoad ? <i style={{ color: "green" }} className="fas fa-check-circle"></i> : <i className="fas fa-spinner fa-spin fa-pulse"></i>}</span>
                            <span onClick={() => this.setState({ fileUploaded: null })} style={{ color: "#a2a2a2", cursor: "pointer", marginLeft: 20 }}>Clear</span>
                          </div>
                        }
                      </div>
                      <input
                        ref={fileInput => this.fileInput = fileInput}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        className="d-none"
                        onChange={(event) => {
                          this.uploadFile(event)
                          event.target.value = null
                        }}
                      />
                      {/*<div className="row">
                        <div className="col-md-9">
                          <input onChange={(e) => this.setState({ content: e.target.value }) } value={this.state.content} type="text" placeholder="Type your message..." style={{width: "100%",height: "7vh",border: "none",padding: 10}} />
                        </div>
                        <div className="col-md-3" style={{padding: 5}}>
                          <Picker
                            style={{ position: 'absolute', bottom: '50px', right: '20px' }}
                            title="Pick your emoji…"
                            emoji="point_up"
                            onSelect={emoji => this.setState({emoji: emoji.native}) }
                          />
                          <span style={{fontSize: 24,paddingLeft: 10,paddingRight: 10,color: "#e2e2e2",cursor: "pointer"}}><i className="far fa-smile-beam"></i></span>
                          <span style={{fontSize: 24,paddingLeft: 10,paddingRight: 10,color: "#e2e2e2",cursor: "pointer"}}><i className="fas fa-paperclip"></i></span>
                          <span onClick={this.sendMessage} style={{fontSize: 24,paddingLeft: 10,paddingRight: 10,color: "#5495fd",cursor: "pointer"}}><i className="fas fa-paper-plane"></i></span>
                        </div>
                      </div>*/}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Messages
