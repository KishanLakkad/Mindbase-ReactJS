import React from "react";
import { PieChart } from 'react-minimal-pie-chart';

class TopIncidents extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = this.getInitState();
    this.getInitState = this.getInitState.bind(this);
  }
  getInitState(){
    return {
      page: "Login Page",
      pieDataTop: [
        { title: 'Traffic', value: 30, color: '#4C63D8' },
        { title: 'Disturbance', value: 20, color: '#F14070' },
        { title: 'Check Well Being', value: 20, color: '#34EC90' },
        { title: 'Domestic Voilence', value: 5, color: '#52C9F1' },
        { title: 'Burglary', value: 25, color: '#E9C148' }
      ]
    }
  }
  componentDidMount(){

  }
  render(){
    return (
      <div style={{backgroundColor: "#FFFFFF",padding: 20,borderRadius: 20}}>
        <div>
          <span>Top Incidents</span>
        </div>
        <div className="text-center" style={{marginTop: 15}}>
          <span style={{textAlign: "center",marginBottom: 5,fontSize: 10,color: "#7648ff",backgroundColor: "#7648ff29",padding: "6px 12px",borderRadius: 5,marginLeft: 5,marginRight: 5}}>7 days</span>
          <span style={{textAlign: "center",marginBottom: 5,fontSize: 10,color: "#FFFFFF",backgroundColor: "#7648ff",padding: "6px 12px",borderRadius: 5,marginLeft: 5,marginRight: 5}}>14 days</span>
          <span style={{textAlign: "center",marginBottom: 5,fontSize: 10,color: "#7648ff",backgroundColor: "#7648ff29",padding: "6px 12px",borderRadius: 5,marginLeft: 5,marginRight: 5}}>1 month</span>
        </div>
        <div style={{marginTop: 15}}>
          <div className="row">
            <div className="col-md-4" style={{padding: 0}}>
              <div className="circle-traffic"></div> <span style={{display: "inline-block",marginLeft: 5,fontSize: 12}}>Traffic</span>
            </div>
            <div className="col-md-3" style={{padding: 0}}>
              <div className="circle-burglary"></div> <span style={{display: "inline-block",marginLeft: 5,fontSize: 12}}>Burglary</span>
            </div>
            <div className="col-md-5" style={{padding: 0}}>
              <div className="circle-domestic"></div> <span style={{display: "inline-block",marginLeft: 5,fontSize: 12}}>Domestic Violence</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4" style={{padding: 0}}>
              <div className="circle-disturbance"></div> <span style={{display: "inline-block",marginLeft: 5,fontSize: 12}}>Disturbance</span>
            </div>
            <div className="col-md-8" style={{padding: 0}}>
              <div className="circle-checkwell"></div> <span style={{display: "inline-block",marginLeft: 5,fontSize: 12}}>Check Well Being</span>
            </div>
          </div>
        </div>
        <div style={{marginTop: 15}}>
          <div style={{width: "52%",margin: "0 auto"}}>
          <PieChart
            data={this.state.pieDataTop}
            label={({ dataEntry }) => `${dataEntry.value}%`}
            labelStyle={(index) => ({
              fill: "#FFFFFF",
              fontSize: '5px',
              fontFamily: 'sans-serif',
            })}
          />
          </div>
        </div>
        <div style={{marginTop: 15}}>
          <div className="custom-grid-mood">
            <div style={{ padding: 5, cursor: "pointer", width: 80,margin: "0 auto" }}>
              <div className="card">
                <div className="card-body text-center" style={{padding: 5}}>
                  <img src="/assets/img/Good Emoji.png" style={{height: 44}} />
                  <span style={{color: "#f78872",display: "block",fontSize: 12,textAlign: "center"}}>Good</span>
                </div>
              </div>
            </div>
            <div style={{ padding: 5, cursor: "pointer", width: 80,margin: "0 auto" }}>
              <div className="card">
                <div className="card-body text-center" style={{padding: 5}}>
                  <img src="/assets/img/VeryGood Emoji.png" style={{height: 44}} />
                  <span style={{color: "#c2b1ff",display: "block",fontSize: 12,textAlign: "center"}}>Very Good</span>
                </div>
              </div>
            </div>
            <div style={{ padding: 5, cursor: "pointer", width: 80,margin: "0 auto" }}>
              <div className="card">
                <div className="card-body text-center" style={{padding: 5}}>
                  <img src="/assets/img/Mood Emoji.png" style={{height: 44}} />
                  <span style={{color: "#faba6b",display: "block",fontSize: 12,textAlign: "center"}}>Okay</span>
                </div>
              </div>
            </div>
            <div style={{ padding: 5, cursor: "pointer", width: 80,margin: "0 auto" }}>
              <div className="card">
                <div className="card-body text-center" style={{padding: 5}}>
                  <img src="/assets/img/Very Bad Emoji.png" style={{height: 44}} />
                  <span style={{color: "#f78872",display: "block",fontSize: 12,textAlign: "center"}}>Bad</span>
                </div>
              </div>
            </div>
          </div>
          {/*<div className="row" style={{textAlign:"-webkit-center"}}>
            <div className="col-md-3" style={{padding: 5}}>
              <div className="card">
                <div className="card-body text-center" style={{padding: 5}}>
                  <img src="/assets/img/Good Emoji.png" style={{height: 44}} />
                  <span style={{color: "#f78872",display: "block",fontSize: 12,textAlign: "center"}}>Good</span>
                </div>
              </div>
            </div>
            <div className="col-md-3" style={{padding: 5}}>
              <div className="card">
                <div className="card-body text-center" style={{padding: 5}}>
                  <img src="/assets/img/VeryGood Emoji.png" style={{height: 44}} />
                  <span style={{color: "#c2b1ff",display: "block",fontSize: 12,textAlign: "center"}}>Very Good</span>
                </div>
              </div>
            </div>
            <div className="col-md-3" style={{padding: 5}}>
              <div className="card">
                <div className="card-body text-center" style={{padding: 5}}>
                  <img src="/assets/img/Mood Emoji.png" style={{height: 44}} />
                  <span style={{color: "#faba6b",display: "block",fontSize: 12,textAlign: "center"}}>Okay</span>
                </div>
              </div>
            </div>
            <div className="col-md-3" style={{padding: 5}}>
              <div className="card">
                <div className="card-body text-center" style={{padding: 5}}>
                  <img src="/assets/img/Very Bad Emoji.png" style={{height: 44}} />
                  <span style={{color: "#f78872",display: "block",fontSize: 12,textAlign: "center"}}>Bad</span>
                </div>
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    )
  }
}

export default TopIncidents
